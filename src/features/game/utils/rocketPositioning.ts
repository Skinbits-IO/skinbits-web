import { MutableRefObject } from 'react';
import { RocketPosition } from '../types/RocketPosition';

const buffer = 20; // Buffer zone in pixels
const edgeSpacing = 20; // Minimum spacing from edges in pixels

let unavailable: boolean[][];
let gridWidth = 0;
let gridHeight = 0;

const isValidPosition = (
  newPos: RocketPosition,
  rocketSize: number
): boolean => {
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

export const markArea = (
  pos: RocketPosition,
  rocketSize: number,
  isUnavailable: boolean
): void => {
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
      unavailable[x][y] = isUnavailable;
    }
  }
};

export const computeGrid = (
  gameRef: MutableRefObject<HTMLDivElement | null>,
  rocketSize: number
) => {
  if (!gameRef.current) {
    throw new Error('gameRef is not available');
  }

  const { offsetWidth: width, offsetHeight: height } = gameRef.current;

  gridWidth = rocketSize + buffer * 2;
  gridHeight = rocketSize + buffer * 2;

  const cols = Math.ceil(width / gridWidth);
  const rows = Math.ceil(height / gridHeight);

  unavailable = Array.from({ length: cols }, () => Array(rows).fill(false));
};

export const generatePosition = (
  gameRef: MutableRefObject<HTMLDivElement | null>,
  rocketSize: number
): RocketPosition => {
  if (!gameRef.current) {
    throw new Error('gameRef is not available');
  }

  const { offsetWidth: width, offsetHeight: height } = gameRef.current;
  let attempts = 0;
  let newPosition: RocketPosition;

  do {
    newPosition = {
      left:
        edgeSpacing + Math.random() * (width - rocketSize - edgeSpacing * 2),
      top:
        edgeSpacing + Math.random() * (height - rocketSize - edgeSpacing * 2),
    };
    attempts++;
  } while (attempts < 5 && !isValidPosition(newPosition, rocketSize));

  if (attempts > 5) {
    newPosition = {
      left:
        edgeSpacing + Math.random() * (width - rocketSize - edgeSpacing * 2),
      top:
        edgeSpacing + Math.random() * (height - rocketSize - edgeSpacing * 2),
    };
  }

  markArea(newPosition, rocketSize, true);
  return newPosition;
};
