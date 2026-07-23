export interface Element {
  x: number;
  y: number;
  id: number;
  count?: number;
  parentId?: number[];
  type: "circle";
  width?: number;
  opacity?: number;
  color?: string;
  borderRadius?: number;
  pressure?: string;
}

export interface Rectangle {
  id: string;
  type: "rectangle";
  x: number;
  y: number;
  endX: number;
  endY: number;
  context: any;
  width?: number;
  opacity?: number;
  color?: string;
  borderRadius?: number;
  pressure?: string;
}

export interface Line {
  id: string;
  type: "line";
  x: number;
  y: number;
  endX: number;
  endY: number;
  width?: number;
  opacity?: number;
  color?: string;
  pressure?: string;
  pointCenter: {
    x: number;
    y: number;
  }[];
}

export type Node = Rectangle | Element | Line;
