# Whiteboard Sharing Web App 🎨🖊️

A real-time collaborative whiteboard web application built using React, Node.js, MySQL, and Socket.IO. This project allows multiple users to join a shared whiteboard room and draw together seamlessly, making it perfect for online teaching, brainstorming, and team collaboration.

---

## 🚀 Features

- ✍️ Real-time drawing and syncing across users using **Socket.IO**
- 🧑‍🤝‍🧑 Join/Leave room with instant notifications
- 📦 User authentication with **MySQL** backend
- 🎨 Tools: Pencil, Rectangle, Line, Color Picker
- ↩️ Undo / Redo drawing actions
- 🧰 Modular and reusable toolbar components
- 🛡️ Secure session management
- 📱 Responsive user interface (desktop/tablet/mobile)

---

## 🛠 Tech Stack

### 🔹 Frontend
- **React** (Functional Components + Hooks)
- **Socket.IO-client**
- **React-Router**
- **React-Toastify**
- **Tailwind CSS**

### 🔹 Backend
- **Node.js** + **Express.js**
- **Socket.IO**
- **MySQL** (for user data and room persistence)
- **JWT** (for user authentication)

---

## 📁 Project Structure
<img width="1165" height="318" alt="image" src="https://github.com/user-attachments/assets/efd24c52-eee9-4fee-a01c-fea04a78dcbd" />

**2. Setup backend (Node.js)**
cd server
npm install
# Create a .env file with DB credentials and JWT_SECRET
npm start

**3. Setup frontend (React)**cd client
npm install
npm start

**🔒 Environment Variables (Backend)
Create a .env file inside server/ with the following:**
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=whiteboard_app
JWT_SECRET=your_jwt_secret

**📸 Screenshots**
<img width="1794" height="875" alt="image" src="https://github.com/user-attachments/assets/15dc7d75-06c7-4d0a-86ce-bbbd199c5a23" />
<img width="1812" height="857" alt="image" src="https://github.com/user-attachments/assets/b6630dd1-0e60-4551-b5b7-54ad446fab05" />
<img width="1765" height="879" alt="image" src="https://github.com/user-attachments/assets/780cd7ce-0ad9-44e7-adad-b6bc194120a0" />

