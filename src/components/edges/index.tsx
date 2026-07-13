import { useCanvasStore } from "../../store/useCanvasStore.js";
import { worldToScreen } from "../../utils/camera.js";

interface IEdges {
    cirlceRaduis: number
}

const Edges = ({ cirlceRaduis }: IEdges) => {
    const { edges, nodes, camera } = useCanvasStore(state => state)
    return <svg className="svg" xmlns="http://www.w3.org/2000/svg">
        {edges.map((el) => {
            const from = nodes.find((n) => n.id === el.from) || { x: 0, y: 0 };
            const to = nodes.find((n) => n.id === el.to) || { x: 0, y: 0 };

            const p1 = worldToScreen(from.x + cirlceRaduis / 2, from.y + cirlceRaduis / 2, camera);
            const p2 = worldToScreen(to.x + cirlceRaduis / 2, to.y + cirlceRaduis / 2, camera);
            return (
                <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    className="stroke"
                />
            );
        })}
    </svg>
}

export default Edges