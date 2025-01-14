import { MutableRefObject } from 'react';
import { RocketPosition } from '../types/RocketPosition';

const buffer = 20; // Buffer zone in pixels
const edgeSpacing = 20; // Minimum spacing from edges in pixels
let unavailable: boolean[][];

const isValidPosition = (
  newPos: RocketPosition,
  gridWidth: number,
  gridHeight: number,
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

const markUnavailableArea = (
  pos: RocketPosition,
  gridWidth: number,
  gridHeight: number,
  rocketSize: number
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
      unavailable[x][y] = true;
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

  const gridWidth = rocketSize + buffer * 2;
  const gridHeight = rocketSize + buffer * 2;

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
  } while (
    attempts < 100 &&
    !isValidPosition(
      newPosition,
      rocketSize + buffer * 2,
      rocketSize + buffer * 2,
      rocketSize
    )
  );

  if (attempts < 100) {
    markUnavailableArea(
      newPosition,
      rocketSize + buffer * 2,
      rocketSize + buffer * 2,
      rocketSize
    );
    return newPosition;
  } else {
    throw new Error(
      'Could not generate a valid rocket position without overlap'
    );
  }
};

export const removeRocketPosition = (
  pos: RocketPosition,
  rocketSize: number
) => {
  const gridWidth = rocketSize + buffer * 2;
  const gridHeight = rocketSize + buffer * 2;

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
      unavailable[x][y] = false;
    }
  }
};
