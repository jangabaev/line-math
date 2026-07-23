import { create } from "zustand";
import {
  type Node,
  type Edge,
  type Pencil,
  type Camera,
  type LineStart,
  type Tool,
} from "../types/index.js";

interface CanvasStore {
  nodes: Node[];
  edges: Edge[];
  cursor: Tool;
  lines: Pencil[];
  camera: Camera;
  designAll: LineStart;
  selected: boolean;
  isDrawing: boolean;
  selectedEl: Node | Pencil | Edge | null;

  createNode: (node: Node) => void;
  moveNodes: (node: Node) => void;
  pencilMove: (e: { id: string; x: number; y: number }) => void;
  createPen: (e: Pencil) => void;
  moveCamera: (e: Camera) => void;
  changeCursor: (e: Tool) => void;
  setLineStyle: (e: LineStart) => void;
  setSelected: (e: boolean) => void;
  setDrawing: (e: boolean) => void;
  setLineCreate: (e: Node) => void;
  setLine: (e: any) => void;
  setSelectedEl: (e: any) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  nodes: [],
  isDrawing: false,
  edges: [],
  lines: [],
  cursor: "hand",
  designAll: {
    width: 1,
    color: "#000000",
    fill: "pattern",
    pressure: "constant",
    opacity: 1,
    background: "#000000",
    borderRadius: 20,
  },
  camera: {
    x: 0,
    y: 0,
    zoom: 1,
  },
  selected: false,
  selectedEl: null,
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
      designAll: { ...state.designAll, ...e },
    })),
  setSelected: (e: boolean) =>
    set(() => ({
      selected: e,
    })),
  setDrawing: (e: boolean) =>
    set(() => ({
      isDrawing: e,
    })),
  setLineCreate: (e: Node) => {
    set((state) => ({
      nodes: [...state.nodes, e],
    }));
  },
  setLine: (e: Node) => {
    set((state) => ({
      nodes: state.nodes.map((el) => {
        if (el.id === e.id) {
          return { ...el, ...e };
        }
        return el;
      }),
    }));
  },
  setSelectedEl: (e: Node | Pencil | Edge | null) => {
    set(() => ({
      selectedEl: e,
    }));
  },
}));
