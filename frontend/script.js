const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

async function loadNotes() {
    try {
        const response = await fetch("/notes");

        if (!response.ok) {
            throw new Error("Failed to load notes");
        }

        const notes = await response.json();

        displayNotes(notes);
    } catch (error) {
        console.error(error);
        notesContainer.innerHTML =
            '<p class="empty-message">Unable to load notes.</p>';
    }
}

function displayNotes(notes) {
    noteCount.textContent =
        `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;

    if (notes.length === 0) {
        notesContainer.innerHTML =
            '<p class="empty-message">No notes yet. Create your first note!</p>';
        return;
    }

    notesContainer.innerHTML = "";

    notes.forEach(note => {
        const noteCard = document.createElement("div");
        noteCard.className = "note-card";

        noteCard.innerHTML = `
            <h3>${escapeHtml(note.title)}</h3>
            <p>${escapeHtml(note.content)}</p>
            <div class="note-date">${formatDate(note.created_at)}</div>
            <button class="delete-button" onclick="deleteNote(${note.id})">
                Delete
            </button>
        `;

        notesContainer.appendChild(noteCard);
    });
}

noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        return;
    }

    try {
        const response = await fetch("/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to create note");
        }

        noteForm.reset();

        loadNotes();
    } catch (error) {
        console.error(error);
        alert("Unable to create note.");
    }
});

async function deleteNote(id) {
    const confirmed = confirm("Are you sure you want to delete this note?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/notes/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to delete note");
        }

        loadNotes();
    } catch (error) {
        console.error(error);
        alert("Unable to delete note.");
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

loadNotes();