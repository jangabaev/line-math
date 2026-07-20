export interface Element {
  x: number;
  y: number;
  id: number;
  count?: number;
  parentId?: number[];
  type: "circle";
}

export interface Rectangle {
  id: string;
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  context: any;
}

export type Node = Rectangle | Element;
