import { MutableRefObject } from 'react';

const rocketSize = 44; // Rocket size in pixels
const buffer = 20; // Buffer zone in pixels

const isValidPosition = (
  newPos: { left: number; top: number },
  unavailable: boolean[][],
  gridWidth: number,
  gridHeight: number
) => {
  const startX = Math.max(0, Math.floor((newPos.left - buffer) / gridWidth));
  const endX = Math.min(
    Math.floor((newPos.left + rocketSize + buffer) / gridWidth),
    unavailable.length - 1
  );
  const startY = Math.max(0, Math.floor((newPos.top - buffer) / gridHeight));
  const endY = Math.min(
    Math.floor((newPos.top + rocketSize + buffer) / gridHeight),
    unavailable[0].length - 1
  );

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      if (unavailable[x][y]) {
        return false;
      }
    }
  }
  return true;
};

const markUnavailableArea = (
  pos: { left: number; top: number },
  unavailable: boolean[][],
  gridWidth: number,
  gridHeight: number
) => {
  const startX = Math.max(0, Math.floor((pos.left - buffer) / gridWidth));
  const endX = Math.min(
    Math.floor((pos.left + rocketSize + buffer) / gridWidth),
    unavailable.length - 1
  );
  const startY = Math.max(0, Math.floor((pos.top - buffer) / gridHeight));
  const endY = Math.min(
    Math.floor((pos.top + rocketSize + buffer) / gridHeight),
    unavailable[0].length - 1
  );

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      unavailable[x][y] = true;
    }
  }
};

export const generatePositions = (
  gameRef: MutableRefObject<HTMLDivElement | null>,
  setRocketPositions: (
    pc: {
      left: number;
      top: number;
    }[]
  ) => void
) => {
  if (gameRef.current) {
    const { offsetWidth: width, offsetHeight: height } = gameRef.current;

    const gridWidth = rocketSize + buffer * 2;
    const gridHeight = rocketSize + buffer * 2;

    const cols = Math.ceil(width / gridWidth);
    const rows = Math.ceil(height / gridHeight);

    const unavailable = Array.from({ length: cols }, () =>
      Array(rows).fill(false)
    );

    const positions: { left: number; top: number }[] = [];

    for (let i = 0; i < 3; i++) {
      let attempts = 0;
      let newPosition;

      do {
        newPosition = {
          left: Math.random() * (width - rocketSize),
          top: Math.random() * (height - rocketSize),
        };
        attempts++;
      } while (
        attempts < 20 &&
        !isValidPosition(newPosition, unavailable, gridWidth, gridHeight)
      );

      if (attempts < 20) {
        positions.push(newPosition);
        markUnavailableArea(newPosition, unavailable, gridWidth, gridHeight);
      } else {
        console.warn('Could not place all rockets without overlap');
      }
    }

    setRocketPositions(positions);
  }
};
