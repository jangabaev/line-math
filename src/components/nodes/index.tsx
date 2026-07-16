import { useRef } from "react";
import type { RefObject } from "react";
import { useCanvasStore } from "../../store/useCanvasStore.js";
import type { Node } from "../../types/index.js";
import { worldToScreen } from "../../utils/camera.js";

interface ChildProps {
  draggingNodeId: RefObject<number | null>;
}

const Nodes = ({ draggingNodeId }: ChildProps) => {
  const { nodes, camera, createNode, cursor } = useCanvasStore(
    (state) => state,
  );
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

  const handleMouseUp = () => {
    draggingNodeId.current = null;
  };

  const handleMouseDown = (node: Node, e: any) => {
    if (e.target !== e.currentTarget) return;

    if (draggingNodeId.current) {
      return (draggingNodeId.current = null);
    }

    e.stopPropagation();
    draggingNodeId.current = node.id;
  };
  return (
    <>
      {nodes.map((el) => {
        const cordinate = worldToScreen(el.x, el.y, camera);
        return (
          <div
            className="circle"
            style={{
              left: cordinate.x,
              top: cordinate.y,
              transform: `scale()`,
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
    </>
  );
};

export default Nodes;
