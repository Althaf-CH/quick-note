const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "notes.json");

if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, "[]");
}

function getNotes() {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
}

function saveNotes(notes) {
    fs.writeFileSync(dataFile, JSON.stringify(notes, null, 2));
}

module.exports = {
    getNotes,
    saveNotes
};