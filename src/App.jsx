import { useState } from "react";

function App() {
  const [nodes, setNodes] = useState([
    {
      x: 100,
      y: 100,
      id: 1,
      count: 0,
    },
  ]);

  const clickCircle = (node) => {
    const random = Math.floor(Math.random() * 100);
    console.log(random);
    setNodes((el) => [
      ...el.map((e) => {
        if (e.id === node.id) {
          return { ...e, count: e.count + 1 };
        }
        return e;
      }),
      {
        x:
          Math.floor(Math.random() * 100) % 2 == 0
            ? node.x - random
            : node.x + random,
        y:
          Math.floor(Math.random() * 100) % 2 == 0
            ? node.y - Math.sqrt(100 ** 2 - random ** 2)
            : node.y + Math.sqrt(100 ** 2 - random ** 2),
        id: nodes[nodes.length - 1].id + 1,
        count: 0,
      },
    ]);
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
          >
            {el.count}
          </div>
        );
      })}
    </main>
  );
}

export default App;
