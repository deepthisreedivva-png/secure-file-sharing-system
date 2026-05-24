# Secure File Sharing System

A secure full-stack file sharing application built using MongoDB, Express.js, Node.js, JWT Authentication, and JavaScript. The system allows users to register, log in securely, upload files, download files, and manage their uploaded content.

---

## Features

- Secure User Registration
- User Login Authentication
- JWT-Based Authorization
- Password Hashing using bcrypt
- File Upload Functionality
- File Download Functionality
- File Delete Functionality
- Protected API Routes
- MongoDB Database Integration
- Responsive User Interface

---

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Security
- JWT (JSON Web Token)
- bcrypt

### File Handling
- Multer

---

## Project Structure

```text
secure-file-sharing-system/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│
├── server/
│   ├── config/
│   ├── models/
│   ├── uploads/
│   ├── index.js
│   ├── package.json
│
├── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/deepthisreedivva-png/secure-file-sharing-system.git
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the server folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Screenshots

### Login Page

![Login Page]("C:\Users\DEEPTHI\OneDrive\Pictures\Screenshots\Screenshot 2026-05-24 114305.png")

### Register Page

![Register Page]("C:\Users\DEEPTHI\OneDrive\Pictures\Screenshots\Screenshot 2026-05-24 112435.png")

### Dashboard

![Dashboard]("C:\Users\DEEPTHI\OneDrive\Pictures\Screenshots\Screenshot 2026-05-24 113654.png")

---

## Author

**Deepthi Sreedivva**

GitHub: https://github.com/deepthisreedivva-png

---

## License

This project is licensed under the MIT License.
