import { MutableRefObject } from 'react';
import { RocketPosition } from '../types/RocketPosition';

const rocketSize = 44;
const buffer = 20; // Buffer zone in pixels
const edgeSpacing = 20; // Minimum spacing from edges in pixels

let unavailable = new Set<number>(); // Hash set for instant lookups
let gridWidth = 0;
let gridHeight = 0;
let cols = 0;
let rows = 0;

const hashPosition = (x: number, y: number) => (x << 16) | y; // Unique hash for each grid cell

const isValidPosition = (newPos: RocketPosition): boolean => {
  const startX = Math.max(0, Math.floor((newPos.left - buffer) / gridWidth));
  const startY = Math.max(0, Math.floor((newPos.top - buffer) / gridHeight));
  const endX = Math.min(
    Math.floor((newPos.left + rocketSize + buffer) / gridWidth),
    cols - 1
  );
  const endY = Math.min(
    Math.floor((newPos.top + rocketSize + buffer) / gridHeight),
    rows - 1
  );

  return (
    !unavailable.has(hashPosition(startX, startY)) &&
    !unavailable.has(hashPosition(endX, endY))
  );
};

export const markArea = (pos: RocketPosition, isUnavailable: boolean): void => {
  const startX = Math.max(0, Math.floor((pos.left - buffer) / gridWidth));
  const startY = Math.max(0, Math.floor((pos.top - buffer) / gridHeight));
  const hash = hashPosition(startX, startY);
  if (isUnavailable) {
    unavailable.add(hash);
  } else {
    unavailable.delete(hash);
  }
};

export const computeGrid = (
  gameRef: MutableRefObject<HTMLDivElement | null>
) => {
  if (!gameRef.current) return;

  const { offsetWidth: width, offsetHeight: height } = gameRef.current;
  gridWidth = rocketSize + buffer * 2;
  gridHeight = rocketSize + buffer * 2;

  cols = Math.ceil(width / gridWidth);
  rows = Math.ceil(height / gridHeight);

  unavailable.clear();
};

export const generatePosition = (
  gameRef: MutableRefObject<HTMLDivElement | null>
): RocketPosition => {
  if (!gameRef.current) throw new Error('gameRef is not available');

  const { offsetWidth: width, offsetHeight: height } = gameRef.current;
  let newPosition: RocketPosition;
  let attempts = 0;
  const maxAttempts = Math.min(10, cols * rows);

  do {
    newPosition = {
      left:
        edgeSpacing + Math.random() * (width - rocketSize - edgeSpacing * 2),
      top:
        edgeSpacing + Math.random() * (height - rocketSize - edgeSpacing * 2),
    };
    attempts++;
  } while (attempts < maxAttempts && !isValidPosition(newPosition));

  markArea(newPosition, true);
  return newPosition;
};
