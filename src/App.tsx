import { useState, useRef } from "react";
import {type Edge, type Node } from "./types/index.js";

function App() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      x: 700,
      y: 500,
      id: 1,
      count: 0,
      parentId: [],
    },
  ]);
  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [lines, setLines] = useState<Edge[]>([]);

const lastPoint = useRef({
    x:0,
    y:0
});
  const draggingNodeId = useRef<number | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  const radius = 400;
  const cirlceRaduis = 50;

  const clickCircle = (node:Node) => {
    const random = Math.floor(Math.random() * radius);
    const randmx = Math.floor(Math.random() * 100);
    const randmy = Math.floor(Math.random() * 100);
    const radus = 300;

    setNodes((el) => [
      ...el.map((e) => {
        if (e.id === node.id) {
          return { ...e, count: e.count??0 + 1 };
        }
        return e;
      }),
      {
        x: randmx % 2 == 0 ? node.x - random : node.x + random,
        y:
          randmy % 2 == 0
            ? node.y - Math.sqrt(radius ** 2 - random ** 2)
            : node.y + Math.sqrt(radius ** 2 - random ** 2),
        id: (nodes.length > 0 ? nodes[nodes.length - 1]!.id : 0) + 1,
        count: 0,
      },
    ]);

    setLines((el) => {
      return [
        ...el,
        {
          from: node.id,
          to: (nodes.length > 0 ? nodes[nodes.length - 1]!.id : 0) + 1,
        },
      ];
    });
  };

  const handleMouseDown = (node:Node, e:any) => {
    console.log(e);
     if(e.target!==e.currentTarget) return;

    setIsPanning(true);

    lastPoint.current={
        x:e.clientX,
        y:e.clientY
    }

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
  const handleMouseMove = (e:any) => {
    // console.log(e);
    if (draggingNodeId.current === null) return;

    const updatedX = e.clientX - offset.current.x;
    const updatedY = e.clientY - offset.current.y;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === draggingNodeId.current) {
          return { ...node, x: updatedX, y: updatedY };
        }
        return node;
      }),
    );
  };
  const handleMouseUp = () => {
    draggingNodeId.current = null;
  };

  console.log(lines);
  return (
    <main>
    <div
        className="canvas"
        style={{
            transform: `translate(${-camera.x}px, ${-camera.y}px) scale(${camera.zoom})`,
            transformOrigin: "0 0",
        }}
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
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseUp={() => handleMouseUp()}
          >
            {el.count}
          </div>
        );
      })}
      <svg className="svg" xmlns="http://www.w3.org/2000/svg">
        {lines.map((el) => {
          const from = nodes.find((n) => n.id === el.from)||{x:0,y:0};
          const to = nodes.find((n) => n.id === el.to)||{x:0,y:0};
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
      </svg>
      </div>
    </main>
  );
}

export default App;
