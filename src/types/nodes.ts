export interface Element {
  x: number;
  y: number;
  id: string;
  endX: number;
  endY: number;
  background?: string;
  count?: number;
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

type ColorLine =
  | "#1212e6"
  | "#000000"
  | "#ff0000"
  | "#ff9500"
  | "#008000"
  | "#1212e600";
type Fill = "pattern" | "transparent" | "solid";
type PressureMode = "constant" | "pressure";

export interface Pencil {
  userId: number;
  cordinate: { x: number; y: number }[];
  color: string;
  id: string;
  width: number;
  opacity: number;
  type: "pencil";
}

export interface LineStart {
  width: number;
  color: ColorLine;
  fill: Fill;
  pressure: PressureMode;
  opacity: number;
  background: ColorLine;
  borderRadius: number;
}

export type Node = Rectangle | Element | Line | Pencil;
