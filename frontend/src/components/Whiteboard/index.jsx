// Whiteboard.jsx
import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const Whiteboard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
  user,
  socket
}) => {
  const [img, setImg] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    socket.on("whiteboardDataResponse", (data) => {
      setImg(data.imgURL);
    });
  }, [socket]);

  // viewer
  if (!user?.presenter) {
    return (
      <div className="border border-dark border-3 w-100 my-2 overflow-hidden" style={{ height: '70vh' }}>
        <img
          src={img}
          alt="Whiteboard Image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: "#fff"
          }}
        />
      </div>
    );
  }

  // presenter
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set correct size
    const width = canvas.parentElement.offsetWidth;
    const height = window.innerHeight * 0.7;

    canvas.width = width;
    canvas.height = height;

    // Style and clear
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = "#fff"; // white background
    ctx.fillRect(0, 0, width, height);

    ctxRef.current = ctx;
  }, [canvasRef, ctxRef]);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = ctxRef.current;
    const roughCanvas = rough.canvas(canvas);

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // White background again
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    elements.forEach((el) => {
      const options = {
        stroke: el.stroke,
        strokeWidth: 3,
        roughness: 0
      };

      if (el.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(el.offsetX, el.offsetY, el.width, el.height, options)
        );
      } else if (el.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(el.offsetX, el.offsetY, el.width, el.height, options)
        );
      } else if (el.type === "pencil") {
        roughCanvas.linearPath(el.path, options);
      }
    });

    const imgURL = canvas.toDataURL();
    socket.emit("whiteboardData", imgURL);
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prev) => [
        ...prev,
        { type: "pencil", offsetX, offsetY, path: [[offsetX, offsetY]], stroke: color }
      ]);
    } else if (tool === "line") {
      setElements((prev) => [
        ...prev,
        { type: "line", offsetX, offsetY, width: offsetX, height: offsetY, stroke: color }
      ]);
    } else if (tool === "rect") {
      setElements((prev) => [
        ...prev,
        { type: "rect", offsetX, offsetY, width: 0, height: 0, stroke: color }
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prev) =>
      prev.map((el, index) => {
        if (index !== prev.length - 1) return el;

        if (tool === "pencil") {
          return { ...el, path: [...el.path, [offsetX, offsetY]] };
        } else if (tool === "line") {
          return { ...el, width: offsetX, height: offsetY };
        } else if (tool === "rect") {
          return { ...el, width: offsetX - el.offsetX, height: offsetY - el.offsetY };
        }

        return el;
      })
    );
  };

  const handleMouseUp = () => setIsDrawing(false);

  return (
    <div
      className="border border-dark border-3 w-100 my-2"
      style={{ height: '70vh', position: 'relative' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: "#fff", // this ensures white background
          display: "block",
          cursor: tool ? "crosshair" : "default"
        }}
      />
    </div>
  );
};

export default Whiteboard;
