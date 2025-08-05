const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const http = require("http");
const { Server } = require("socket.io");
const { addUser, removeUser, getUser } = require("./utils/users");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "whiteboardusers"
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashed], (err) => {
    if (err) return res.status(400).json({ message: "User exists or error" });
    res.json({ success: true });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: "User not found" });
    const valid = await bcrypt.compare(password, results[0].password);
    if (valid) {
      res.json({ success: true, user: { name: results[0].name, email } });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);

    const users = addUser({ name, userId, roomId, host, presenter, socketId: socket.id });

    io.in(roomId).emit("userIsJoined", { success: true, users });
    socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted", name);
    socket.broadcast.to(roomId).emit("whiteboardDataResponse", { imgURL: imgURLGlobal });
  });

  socket.on("whiteboardData", (data) => {
    imgURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse", { imgURL: data });
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if (user) {
      removeUser(socket.id);
      socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted", user.name);
    }
  });
});

app.get("/", (req, res) => {
  res.send("This is mern realtime whiteboard sharing app official server");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
