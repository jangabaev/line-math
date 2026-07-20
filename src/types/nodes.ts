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

export interface Line {
  id: string;
  type: "line";
  x: number;
  y: number;
  endX: number;
  endY: number;
  pointCenter: {
    x: number;
    y: number;
  }[];
}

export type Node = Rectangle | Element | Line;
