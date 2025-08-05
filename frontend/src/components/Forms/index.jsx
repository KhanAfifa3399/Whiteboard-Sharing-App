import CreateRoomForm from './CreateRoomForm';
import JoinRoomFrom from './JoinRoomFrom';

import './index.css';

const  Forms = ({uuid, socket, setUser}) => {
    return (

        <div className="row h-100 pt-5">
            <div className="col-md-5 p-5 form-box m-auto callout callout-info d-flex flex-column align-item-center">
                <h3 className='fw-bold'>Create Room</h3>
                <p>You can create a new room here.</p>
                <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
            </div>

            <div className="col-md-5 p-5 form-box m-auto callout callout-info d-flex flex-column align-item-center">
                <h3 className='fw-bold' >Join Room</h3>
                <p>Enter the room code to join.</p>
                <JoinRoomFrom uuid={uuid} socket={socket} setUser={setUser} />
            </div>
        </div>

    );
};

export default Forms;