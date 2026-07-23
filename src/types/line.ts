export interface Pencil {
  userId: number;
  cordinate: { x: number; y: number }[];
  color: string;
  id: string;
  width: number;
  opacity: number;
  type:"pencil"
}

type ColorLine = "#1212e6" | "#000000" | "#ff0000" | "#ff9500" | "#008000";
type Fill = "pattern" | "transparent" | "solid";
type PressureMode = "constant" | "pressure";

export interface LineStart {
  width: number;
  color: ColorLine;
  fill: Fill;
  pressure: PressureMode;
  opacity: number;
  background: ColorLine;
  borderRadius: number;
}

export type PencilWithoutId = Omit<Pencil, "id">;
