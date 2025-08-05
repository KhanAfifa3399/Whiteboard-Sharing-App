import { useRef, useState, useEffect } from 'react';
import './index.css';
import Whiteboard from '../../components/Whiteboard';

const RoomPage = ({ user, socket, users }) => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [openedUserTab, setOpenedUserTab] = useState(false);

    useEffect(()=>{
       return  () => {
        socket.emit("userLeft", user);
        }
    })
    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillRect = "white";
        ctx.clearRect(
            0, 0,
            canvasRef.current.width,
            canvasRef.current.height
        );
        setElements([]);
    }

    const undo = () => {
        setHistory((prevHistory) => [...prevHistory,
        elements[elements.length - 1]]);
        setElements(
            (prevElements) =>
                prevElements.slice(0, prevElements.length - 1)
        )
    }

    const redo = () => {

        setElements((prevHistory) => [
            ...prevHistory,
            history[history.length - 1],
        ]);
        setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
    };

    return (
        <div className="container-fluid px-4">
            {/* Sticky Header */}
            <div className="sticky-top bg-white border-bottom py-2 px-3">
                <div className="d-flex align-items-start gap-3">

                    {/* Left - Users Button */}
                    <button type="button" className="btn btn-dark fw-bold"
                    onClick={() => setOpenedUserTab(true)}
                    >
                        Users
                    </button>
                    {
                        openedUserTab && (
                            <div className="position-fixed top-0  h-100 text-white bg-dark p-3"
                                style={
                                    {
                                        width: "270px",
                                        left: "0%"
                                    }
                                }>
                                <button type='button' 
                                onClick={() => setOpenedUserTab(false)} className='btn fbtn btn-block w-100 mt-4'>
                                    Close
                                </button>

                                {
                                    users.map((usr, ind) => (
                                        <p className="mt-3 text-start ms-2" key={ind * 999}>
                                            {usr.name}
                                            {user && user.userId === usr.userId && " ( You )"}
                                            </p>

                                    ))
                                }

                            </div>
                        )
                    }

                    {/* Right - Heading + Subheading vertically stacked */}
                    <div>
                        <div className="heading fs-3 fw-bold" style={{ fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
                            SlateHub
                        </div>
                        <div className="text-muted" style={{ fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
                            Whiteboard Sharing App <span className="heading">[Users Online: {users.length}]</span>
                        </div>
                    </div>

                </div>
            </div>



            {
                //user && user.presenter
                user?.presenter && (

                    <div className="row justify-content-center my-1">
                        <div className="col-md-11 whiteboard-toolbar d-flex flex-wrap justify-content-between align-items-center py-2 px-3 shadow-sm bg-light rounded">

                            {/* Left Side: Tools and Color */}
                            <div className="d-flex align-items-center gap-4 flex-wrap">
                                {/* Tool Selection */}
                                <div className="d-flex gap-2 align-items-center">
                                    <input type="radio" name="tool" id="pencil" value="pencil" checked={tool === "pencil"} onChange={(e) => setTool(e.target.value)} />
                                    <label htmlFor="pencil">Pencil</label>

                                    <input type="radio" name="tool" id="line" value="line" checked={tool === "line"} onChange={(e) => setTool(e.target.value)} />
                                    <label htmlFor="line">Line</label>

                                    <input type="radio" name="tool" id="rect" value="rect" checked={tool === "rect"} onChange={(e) => setTool(e.target.value)} />
                                    <label htmlFor="rect">Rectangle</label>
                                </div>

                                {/* Color Picker */}
                                <div className="d-flex align-items-center gap-1">
                                    <label htmlFor="color" className="mb-0">Color:</label>
                                    <input
                                        type="color"
                                        id="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="form-control form-control-color"
                                        title="Choose your color"
                                    />
                                </div>
                            </div>

                            {/* Right Side: Buttons */}
                            <div className="d-flex gap-2 flex-wrap">
                                <button className="btn fbtn text-white fw-bold px-3"
                                    disabled={elements.length === 0}
                                    onClick={() => undo()}
                                >Undo</button>
                                <button className="btn redo fw-bold px-3"
                                    disabled={history.length < 1}
                                    onClick={() => redo()}
                                >Redo</button>
                                <button className="btn btn-danger fw-bold px-3" onClick={handleClearCanvas}>Clear Canvas</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Toolbar */}

            {/* Whiteboard Canvas */}
            <div className="row justify-content-center">
                <div className="col-md-11 canvas-box ">
                    <Whiteboard
                        canvasRef={canvasRef}
                        ctxRef={ctxRef}
                        elements={elements}
                        setElements={setElements}
                        color={color}
                        tool={tool}
                        user={user}
                        socket={socket}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
