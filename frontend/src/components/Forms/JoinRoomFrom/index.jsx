import { useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom';

const JoinRoomFrom = ({uuid, socket, setUser}) => {
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate(); 

    const handleRoomJoin = (e) => {
        e.preventDefault();

        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: false,
            presenter: false,
        };
        setUser(roomData);
        navigate(`/${roomId}`);
        socket.emit("userJoined", roomData);
    };

    return (
        <form className="form">
            <div className="form-group">
                <input type="text"
                    className="form control my-2 p-1 input-group"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />
            </div>
            <div className="form-group">
                <input type="text"
                    className="form control my-2 p-1 input-group"
                    placeholder="Enter room code"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                     />
            </div>
            <button type="submit " 
            onClick={handleRoomJoin}
            className="fbtn btn-primary btn-block form-control mt-4 p-2 fw-bold">
                Join Room
            </button>
        </form>
    )
}

export default JoinRoomFrom