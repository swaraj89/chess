/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css } from "@emotion/react";
import { isEqualCoord, pieceLookup } from "../../utils/helper";

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

const squareStyles = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

function renderSquares(pieces: PieceRecord[]) {
  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCorod: Coord = [row, col];

      const piece = pieces.find((piece) =>
        isEqualCoord(piece.location, squareCorod)
      );

      const isDark = (row + col) % 2 === 1;

      squares.push(
        <div
          css={squareStyles}
          style={{ backgroundColor: isDark ? "lightgrey" : "white" }}
          key={`${row}-${col}`}
        >
          {piece && pieceLookup[piece.type]()}
        </div>
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

  return <div css={chessboardStyles}>{renderSquares(pieces)}</div>;
};

export default Chessboard;
