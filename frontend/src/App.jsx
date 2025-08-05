import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // ✅ Combine
import Forms from './components/Forms/index.jsx';
import Home from './pages/Home/index.jsx';
import About from './pages/About/index.jsx';
import RoomPage from './pages/Room/index.jsx';
import { v4 as uuidv4 } from 'uuid';
import io from "socket.io-client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // ✅ Keep this for styles

const server = "http://localhost:5000/";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {
  const location = useLocation(); // ✅ To track current route

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        setUsers(data.users);
      }
    });

    socket.on("allUsers", (data) => {
      setUsers(data);
    });

    socket.on("userJoinedMessageBroadcasted", (data) => {
      toast.info(`${data} joined the room`);
    });

    socket.on("userLeftMessageBroadcasted", (data) => {
      toast.info(`${data} left the room`);
    });
  }, []);

  useEffect(() => {
  const path = location.pathname;

  // ✅ Add black background only for Home and About pages
  if (path === "/" || path === "/about") {
    document.body.classList.add("black-body");
  } else {
    document.body.classList.remove("black-body");
  }
}, [location]);


  return (
    <div className="container">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form/:forms" element={<Forms uuid={uuidv4} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users} />} />
      </Routes>
    </div>
  );
};

export default App;
