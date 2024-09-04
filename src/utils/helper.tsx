import { type ReactElement } from "react";
import { PieceType, type Coord } from "../components/Chessboard";
import { King, Pawn } from "../components/Piece";

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

export const pieceLookup: {
  [Key in PieceType]: () => ReactElement;
} = {
  king: () => <King />,
  pawn: () => <Pawn />,
};
