import { useState, useRef } from "react";

function App() {
  const [nodes, setNodes] = useState([
    {
      x: 700,
      y: 500,
      id: 1,
      count: 0,
    },
  ]);
  const [lines, setLines] = useState([]);
  const draggingNodeId = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

  const radius = 200;
  const clickCircle = (node) => {
    const random = Math.floor(Math.random() * radius);
    const randmx = Math.floor(Math.random() * 100);
    const randmy = Math.floor(Math.random() * 100);
    const radus = 25;
    
    setNodes((el) => [
      ...el.map((e) => {
        if (e.id === node.id) {
          return { ...e, count: e.count + 1 };
        }
        return e;
      }),
      {
        x: randmx % 2 == 0 ? node.x - random : node.x + random,
        y:
          randmy % 2 == 0
            ? node.y - Math.sqrt(radius ** 2 - random ** 2)
            : node.y + Math.sqrt(radius ** 2 - random ** 2),
        id: nodes[nodes.length - 1].id + 1,
        count: 0,
      },
    ]);

    setLines((el) => {
      return [
        ...el,
        {
          x1: node.x + radus,
          y1: node.y + radus,
          x2:
            randmx % 2 == 0 ? node.x - random + radus : node.x + random + radus,
          y2:
            randmy % 2 == 0
              ? node.y - Math.sqrt(radius ** 2 - random ** 2) + radus
              : node.y + Math.sqrt(radius ** 2 - random ** 2) + radus,
        },
      ];
    });
  };

  const handleMouseDown = (node, e) => {
    console.log(e)
    // e.stopPropagation(); // Hodisa boshqa elementlarga o'tib ketmasligi uchun
    // draggingNodeId.current = node.id;

    // // Sichqoncha nodening aynan qayeridan bosilganini aniqlash
    // offset.current = {
    //   x: e.clientX - node.x,
    //   y: e.clientY - node.y,
    // };
  };
  const handleMouseMove = (e) => {
    console.log(e)
    // if (draggingNodeId.current === null) return;

    // const updatedX = e.clientX - offset.current.x;
    // const updatedY = e.clientY - offset.current.y;

    // setNodes((prevNodes) =>
    //   prevNodes.map((node) => {
    //     if (node.id === draggingNodeId.current) {
    //       return { ...node, x: updatedX, y: updatedY };
    //     }
    //     return node;
    //   }),
    // );
  };
  return (
    <main>
      {nodes.map((el) => {
        return (
          <div
            className="circle"
            style={{ left: `${el.x}px`, top: `${el.y}px` }}
            key={el.id}
            onClick={() => clickCircle(el)}
            onMouseDown={(e) => handleMouseDown(el, e)}
          >
            {el.count}
          </div>
        );
      })}
      <svg className="svg" xmlns="http://www.w3.org/2000/svg">
        {lines.map((el) => {
          return (
            <line
              x1={el.x1}
              y1={el.y1}
              x2={el.x2}
              y2={el.y2}
              className="stroke"
            />
          );
        })}
      </svg>
    </main>
  );
}

export default App;
