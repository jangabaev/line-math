import { useState, useRef, useEffect } from "react";
import { type Edge, type Node } from "./types/index.js";
import { useCanvasStore } from "./store/useCanvasStore.js";
import Panel from "./components/panel/index.js";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const {
    nodes,
    edges,
    createNode,
    moveNodes,
    cursor,
    createPen,
    pencilMove,
    lines,
  } = useCanvasStore((state) => state);


  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const [isPanning, setIsPanning] = useState(false);

  const lastPoint = useRef({
    x: 0,
    y: 0,
  });
  const draggingNodeId = useRef<number | null>(null);
  const draggingLineId = useRef<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  console.log(lines)
  console.log(draggingLineId.current)
  const radius = 400;
  const cirlceRaduis = 50;

   
  const clickCircle = (node: Node) => {
    const random = Math.floor(Math.random() * radius);
    const randmx = Math.floor(Math.random() * 100);
    const randmy = Math.floor(Math.random() * 100);
    const radus = 300;

    createNode({
      x: randmx % 2 == 0 ? node.x - random : node.x + random,
      y:
        randmy % 2 == 0
          ? node.y - Math.sqrt(radius ** 2 - random ** 2)
          : node.y + Math.sqrt(radius ** 2 - random ** 2),
      id: (nodes.length > 0 ? nodes[nodes.length - 1]!.id : 0) + 1,
      count: 0,
    });

    // setLines((el) => {
    //   return [
    //     ...el,
    //     {
    //       from: node.id,
    //       to: (nodes.length > 0 ? nodes[nodes.length - 1]!.id : 0) + 1,
    //     },
    //   ];
    // });
  };

  const handleMouseDown = (node: Node, e: any) => {
    if (e.target !== e.currentTarget) return;

    if (cursor === "pencil") {
    }

    setIsPanning(true);

    lastPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };

    if (draggingNodeId.current) {
      return (draggingNodeId.current = null);
    }

    e.stopPropagation(); // Hodisa boshqa elementlarga o'tib ketmasligi uchun
    draggingNodeId.current = node.id;

    // Sichqoncha nodening aynan qayeridan bosilganini aniqlash
    offset.current = {
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    };
  };
  
  const handleMouseMove = (e: any) => {
    
    if (cursor === "pencil") {
      console.log(e);
    console.log(draggingLineId.current)
    console.log(lines)
      return pencilMove({
        id: draggingLineId.current,
        x: e.clientX,
        y: e.clientY,
      });
    }

    if (draggingNodeId.current === null) return;

    const updatedX = e.clientX - offset.current.x;
    const updatedY = e.clientY - offset.current.y;

    moveNodes({
      id: draggingNodeId.current,
      x: updatedX,
      y: updatedY,
    });
  };

  const handleMouseUp = () => {
    draggingNodeId.current = null;
  };


  const clickOutside=(e:any)=>{
    console.log(e)
    // draggingLineId.current=null
    if(draggingLineId.current){
      // draggingLineId.current=null
    }
  }

  const hendleMouseDownOutside = (e: any) => {
    console.log(e)
    if(draggingLineId.current){
      // return draggingLineId.current=null   
    }
    if (cursor === "pencil") {
      const newId = uuidv4();
      createPen({
        userId: 1,
        cordinate: [{ x: e.clientX, y: e.clientY }],
        color: "red",
        id:newId
      });
      draggingLineId.current = newId;
      
    }
  };

  useEffect(() => {
    
  }, [lines]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const line of lines) {
      if (line.cordinate.length < 2) continue;

      ctx.beginPath();

      ctx.strokeStyle = line.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.moveTo(line.cordinate[0].x, line.cordinate[0].y);

      for (let i = 1; i < line.cordinate.length; i++) {
        ctx.lineTo(line.cordinate[i].x, line.cordinate[i].y);
      }

      ctx.stroke();
    }
  };
  return (
    <main>
      <div
        className="canvas"
        style={{
          transform: `translate(${-camera.x}px, ${-camera.y}px) scale(${camera.zoom})`,
          transformOrigin: "0 0",
          cursor: cursor === "pencil" ? "crosshair" : "default",
        }}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseDown={(e) => hendleMouseDownOutside(e)}
        onClick={(e)=>clickOutside(e)}
      >
        {nodes.map((el) => {
          return (
            <div
              className="circle"
              style={{
                left: (el.x - camera.x) * camera.zoom,
                top: (el.y - camera.y) * camera.zoom,
              }}
              key={el.id}
              onClick={() => clickCircle(el)}
              onMouseDown={(e) => handleMouseDown(el, e)}
              onMouseUp={() => handleMouseUp()}
            >
              {el.count}
            </div>
          );
        })}
        <svg className="svg" xmlns="http://www.w3.org/2000/svg">
          {edges.map((el) => {
            const from = nodes.find((n) => n.id === el.from) || { x: 0, y: 0 };
            const to = nodes.find((n) => n.id === el.to) || { x: 0, y: 0 };
            return (
              <line
                x1={from.x + cirlceRaduis / 2}
                y1={from.y + cirlceRaduis / 2}
                x2={to.x + cirlceRaduis / 2}
                y2={to.y + cirlceRaduis / 2}
                className="stroke"
              />
            );
          })}
          {/* pencil's treactory with svg */}
          {/* {lines.map((el) => {
            const d = el.cordinate
              .map((point, index) =>
                index === 0
                  ? `M ${point.x} ${point.y}`
                  : `L ${point.x} ${point.y}`,
              )
              .join(" ");
            return <path d={d} stroke="black" strokeWidth={3} fill="none" />;
          })} */}
        </svg>

        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          className="canvas"
        />
      </div>
      <Panel />
    </main>
  );
}

export default App;
