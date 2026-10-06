# Quick Note

A simple and responsive full-stack note-taking web application that allows users to create, view, and delete notes. The application uses a Node.js and Express backend with a lightweight JSON-based data store and a clean HTML, CSS, and JavaScript frontend.

## 🚀 Live Demo

**Live Application:** https://quick-note-1-2zra.onrender.com/

## 📂 GitHub Repository

**Repository:** https://github.com/Althaf-CH/quick-note

---

## ✨ Features

* Create new notes
* View all saved notes
* Delete notes
* Notes are stored on the backend
* REST API for note operations
* Asynchronous communication using JavaScript Fetch API
* Responsive design for desktop and mobile devices
* Clean and simple user interface
* Input validation
* Deployed online using Render

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Backend

* Node.js
* Express.js
* CORS

### Data Storage

* JSON file storage

### Deployment

* Render
* GitHub

---

## 📁 Project Structure

```text
quick-note/
│
├── backend/
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

---

## 🔌 REST API

### Get all notes

```http
GET /notes
```

Returns all saved notes.

### Create a note

```http
POST /notes
```

Request body:

```json
{
  "title": "My Note",
  "content": "This is my note."
}
```

### Delete a note

```http
DELETE /notes/:id
```

Deletes the note with the specified ID.

---

## 💻 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Althaf-CH/quick-note.git
```

### 2. Open the project

```bash
cd quick-note
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Start the server

```bash
npm start
```

The application will run at:

```text
http://localhost:5000
```

Open the URL in a web browser to use the application.

---

## 🔄 How It Works

1. The user enters a note title and content.
2. The frontend sends the note to the Express backend using a `POST` request.
3. The backend stores the note.
4. The frontend retrieves notes using a `GET` request.
5. Notes are displayed as individual cards.
6. When the user deletes a note, the frontend sends a `DELETE` request.
7. The backend removes the note from storage.
8. The frontend refreshes the displayed notes.

---

## 📱 Responsive Design

The application is designed to work across:

* Desktop computers
* Laptops
* Tablets
* Mobile devices

---

## 🎯 Project Objective

The objective of this project is to demonstrate the development of a complete full-stack web application using a REST-based backend, asynchronous frontend communication, backend data storage, and cloud deployment.

---

## 👨‍💻 Developer

** Mohammed Althaf C H**

CSE Student & Aspiring Software Developer

GitHub: https://github.com/Althaf-CH

---

## 📄 License

This project was developed as part of an internship project.
