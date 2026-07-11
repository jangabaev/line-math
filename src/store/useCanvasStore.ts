import {create} from "zustand"
import { type Node,type Edge } from "../types/index.js";


interface CanvasStore{
    nodes:Node[];
    edges:Edge[];

    createNode:(node:Node)=>void;
    moveNodes:(node:Node)=>void
}

export const useCanvasStore = create<CanvasStore>((set) => ({
    nodes:[
    {
      x: 700,
      y: 500,
      id: 1,
      count: 0,
      parentId: [],
    },
  ],
    edges:[],
    createNode:(node)=>set((state)=>({
        nodes:[...state.nodes,node]
    })),
    moveNodes:(node)=>set((state)=>({
        nodes:
    }))
}));