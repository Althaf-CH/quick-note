const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/notes", (req, res) => {
    try {
        const notes = db.getNotes();

        notes.sort((a, b) => b.id - a.id);

        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch notes"
        });
    }
});

app.post("/notes", (req, res) => {
    const { title, content } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
        return res.status(400).json({
            error: "Title and content are required"
        });
    }

    try {
        const notes = db.getNotes();

        const newNote = {
            id: notes.length > 0
                ? Math.max(...notes.map(note => note.id)) + 1
                : 1,
            title: title.trim(),
            content: content.trim(),
            created_at: new Date().toISOString()
        };

        notes.push(newNote);
        db.saveNotes(notes);

        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create note"
        });
    }
});

app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            error: "Invalid note ID"
        });
    }

    try {
        const notes = db.getNotes();

        const updatedNotes = notes.filter(note => note.id !== id);

        if (updatedNotes.length === notes.length) {
            return res.status(404).json({
                error: "Note not found"
            });
        }

        db.saveNotes(updatedNotes);

        res.json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to delete note"
        });
    }
});

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
    console.log(`Quick Note server running on http://localhost:${PORT}`);
});