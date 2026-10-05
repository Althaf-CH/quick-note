const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/notes", (req, res) => {
  db.all(
    "SELECT * FROM notes ORDER BY created_at DESC, id DESC",
    [],
    (err, rows) => {
      if (err) {
        console.error("Error fetching notes:", err.message);
        return res.status(500).json({ error: "Failed to fetch notes" });
      }

      res.json(rows);
    }
  );
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !title.trim() || !content || !content.trim()) {
    return res.status(400).json({
      error: "Title and content are required"
    });
  }

  db.run(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title.trim(), content.trim()],
    function (err) {
      if (err) {
        console.error("Error creating note:", err.message);
        return res.status(500).json({
          error: "Failed to create note"
        });
      }

      db.get(
        "SELECT * FROM notes WHERE id = ?",
        [this.lastID],
        (err, row) => {
          if (err) {
            return res.status(500).json({
              error: "Note created but could not be retrieved"
            });
          }

          res.status(201).json(row);
        }
      );
    }
  );
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid note ID"
    });
  }

  db.run(
    "DELETE FROM notes WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        console.error("Error deleting note:", err.message);
        return res.status(500).json({
          error: "Failed to delete note"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Note not found"
        });
      }

      res.json({
        message: "Note deleted successfully"
      });
    }
  );
});

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Quick Note server running on http://localhost:${PORT}`);
});