import { css } from "@emotion/react";
import king from "../../assets/king.png";
import pawn from "../../assets/pawn.png";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Coord, PieceType } from "../Chessboard";

const imageStyles = css({
  width: 45,
  height: 45,
  padding: 4,
  borderRadius: 6,
  boxShadow:
    "1px 3px 3px rgba(9, 30, 66, 0.25),0px 0px 1px rgba(9, 30, 66, 0.31)",
  "&:hover": {
    backgroundColor: "rgba(168, 168, 168, 0.25)",
  },
});

const hidePieceStyles = css({
  opacity: 0.5,
});

type PieceProps = {
  image: string;
  alt: string;
  location: Coord;
  pieceType: PieceType;
};

const Piece = ({ image, alt, location, pieceType }: PieceProps) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, pieceType }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  });

  return (
    <img
      css={[dragging && hidePieceStyles, imageStyles]}
      src={image}
      draggable="false"
      alt={alt}
      ref={ref}
    />
  );
};

export const King = ({ location }: { location: Coord }) => {
  return <Piece pieceType="king" location={location} image={king} alt="king" />;
};

export const Pawn = ({ location }: { location: Coord }) => {
  return <Piece image={pawn} alt="pawn" pieceType="pawn" location={location} />;
};
