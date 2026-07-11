export interface Line {
  userId: number;
  cordinate: { x: number; y: number }[];
  color: string;
  id: number;
}

export type LineWithoutId = Omit<Line, "id">;
