export interface Line {
  userId: number;
  cordinate: { x: number; y: number }[];
  color: string;
  id: string;
}

export type LineWithoutId = Omit<Line, "id">;
