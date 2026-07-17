import { create } from "zustand";
import {
  type Node,
  type Edge,
  type Line,
  type LineWithoutId,
  type Camera,
  type LineStart,
} from "../types/index.js";

export type Tool = "select" | "pencil" | "comment" | "hand" | "node";

interface CanvasStore {
  nodes: Node[];
  edges: Edge[];
  cursor: Tool;
  lines: Line[];
  camera: Camera;
  startLine: LineStart;
  selected: boolean;

  createNode: (node: Node) => void;
  moveNodes: (node: Node) => void;
  pencilMove: (e: { id: string; x: number; y: number }) => void;
  createPen: (e: Line) => void;
  moveCamera: (e: Camera) => void;
  changeCursor: (e: Tool) => void;
  setLineStyle: (e: LineStart) => void;
  setSelected: (e: boolean) => void;
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
  cursor: "hand",
  startLine: {
    width: 3,
    color: "#000000",
    fill: "pattern",
    pressure: "constant",
    opacity: 1,
    background: "#000000",
  },
  camera: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  selected: false,
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
  pencilMove: (e) => {
    set((state) => ({
      lines: state.lines.map((el) =>
        el.id == e.id
          ? { ...el, cordinate: [...el.cordinate, { x: e.x, y: e.y }] }
          : el,
      ),
    }));
  },
  createPen: (e) =>
    set((state) => ({
      lines: [...state.lines, e],
    })),

  moveCamera: (e: Camera) =>
    set((state) => ({
      camera: { ...state.camera, ...e },
    })),

  changeCursor: (e: Tool) => set(() => ({ cursor: e })),
  setLineStyle: (e: LineStart) =>
    set((state) => ({
      startLine: { ...state.startLine, ...e },
    })),
  setSelected: (e: boolean) =>
    set(() => ({
      selected: e,
    })),
}));
