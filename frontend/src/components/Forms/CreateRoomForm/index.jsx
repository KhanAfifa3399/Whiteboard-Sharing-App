import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './index.css'
const CreateRoomForm = ({uuid, socket, setUser}) => {

    const [roomId, setRoomId] = useState(uuid());
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const  handleCreateRoom = (e) => {
        e.preventDefault();

        // {name, roomId, userId, host, presenter}

        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter: true
        }
        setUser(roomData);
        navigate(`/${roomId}`);
        console.log(roomData);        
        socket.emit("userJoined", roomData)
    }

    return (<form className="form">
        <div className="form-group">
            <input type="text"
                className="form control my-2 p-1 input-group"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
        </div>
        <div className="form-group border">
            <div className="input-group d-flex aligniten-center justify-content-center ">

                <input type="text"
                    value={roomId}
                    className="form control my-2 border-0"
                    disabled
                    placeholder="Generate room code" />

                <div className="input-group-append my-2">
                    <button className="btn fbtn btn-sm mx-2" 
                    onClick={() => setRoomId(uuid())} 
                    type="button">
                        Generate
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                        copy
                    </button>
                </div>
            </div>
        </div>
        <button type="submit" 
        onClick={handleCreateRoom}
        className=" fbtn btn-primary btn-block form-control mt-4 p-2 fw-bold">
            Generate Room
            </button>
    </form>
    )

}

export default CreateRoomForm