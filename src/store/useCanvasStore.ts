import { create } from "zustand";
import {
  type Node,
  type Edge,
  type Line,
  type LineWithoutId,
} from "../types/index.js";

export type Tool = "select" | "pencil" | "comment" | "hand" | "node";

interface CanvasStore {
  nodes: Node[];
  edges: Edge[];
  cursor: Tool;
  lines: Line[];

  createNode: (node: Node) => void;
  moveNodes: (node: Node) => void;
  pencilMove: (e: { id: number; x: number; y: number }) => void;
  createPen: (e: LineWithoutId) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  nodes: [
    {
      x: 700,
      y: 500,
      id: 1,
      count: 0,
      parentId: [],
    },
  ],
  edges: [],
  lines: [],
  cursor: "pencil",
  createNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
  moveNodes: (node) =>
    set((state) => ({
      nodes: state.nodes.map((el) => {
        if (el.id === node.id) {
          return { ...el, ...node };
        }
        return el;
      }),
    })),
  pencilMove: (e) =>
    set((state) => ({
      lines: state.lines.map((el) =>
        el.userId === e.id
          ? { ...el, cordinate: [...el.cordinate, { x: e.x, y: e.y }] }
          : el,
      ),
    })),
  createPen: (e) =>
    set((state) => ({
      lines: [...state.lines, { ...e, id: state.lines.length || 0 }],
    })),
}));
