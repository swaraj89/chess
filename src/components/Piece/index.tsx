/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css } from "@emotion/react";
import king from "../../assets/king.png";
import pawn from "../../assets/pawn.png";

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

type PieceProps = {
  image: string;
  alt: string;
};

const Piece = ({ image, alt }: PieceProps) => {
  return <img css={imageStyles} src={image} draggable="false" alt={alt} />;
};

export const King = () => {
  return <Piece image={king} alt="king" />;
};

export const Pawn = () => {
  return <Piece image={pawn} alt="king" />;
};
