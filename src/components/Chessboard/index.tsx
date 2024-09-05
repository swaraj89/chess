/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css } from "@emotion/react";
import { isEqualCoord, pieceLookup } from "../../utils/helper";
import Square from "./Square";

export type Coord = [number, number];

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export type PieceType = "king" | "pawn";

const chessboardStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "repeat(8, 1fr)",
  width: "500px",
  height: "500px",
  border: "3px solid lightgrey",
});

function renderSquares(pieces: PieceRecord[]) {
  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCorod: Coord = [row, col];

      const piece = pieces.find((piece) =>
        isEqualCoord(piece.location, squareCorod)
      );

      squares.push(
        <Square pieces={pieces} location={squareCorod} key={`${row}-${col}`}>
          {piece && pieceLookup[piece.type](squareCorod)}
        </Square>
      );
    }
  }

  return squares;
}

const Chessboard = () => {
  const pieces: PieceRecord[] = [
    { type: "king", location: [3, 2] },
    { type: "pawn", location: [1, 6] },
  ];

  console.log(renderSquares(pieces));

  return <div css={chessboardStyles}>{renderSquares(pieces)}</div>;
};

export default Chessboard;
