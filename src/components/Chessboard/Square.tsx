import { ReactElement, useEffect, useRef, useState } from "react";
import { Coord, PieceRecord } from ".";
import invariant from "tiny-invariant";
import { css } from "@emotion/react";
import {
  canMove,
  getColor,
  isCoord,
  isEqualCoord,
  isPieceType,
} from "../../utils/helper";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface SquareProps {
  pieces: PieceRecord[];
  location: Coord;
  children: ReactElement;
}

const squareStyles = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export type HoveredState = "idle" | "validMove" | "invalidMove";

const Square = ({ pieces, location, children }: SquareProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<HoveredState>("idle");

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ location }),
      canDrop: ({ source }) => {
        if (!isCoord(source.data.location)) {
          return false;
        }

        return !isEqualCoord(source.data.location, location);
      },
      onDragEnter: ({ source }) => {
        if (
          !isCoord(source.data.location) ||
          !isPieceType(source.data.pieceType)
        ) {
          return;
        }

        if (
          canMove(source.data.location, location, source.data.pieceType, pieces)
        ) {
          setState("validMove");
        } else {
          setState("invalidMove");
        }
      },
      onDragLeave: () => setState("idle"),
      onDrop: () => setState("idle"),
    });
  }, [location, pieces]);

  const isDark = (location[0] + location[1]) % 2 === 1;

  return (
    <div
      ref={ref}
      css={squareStyles}
      style={{ backgroundColor: getColor(state, isDark) }}
    >
      {children}
    </div>
  );
};

export default Square;
