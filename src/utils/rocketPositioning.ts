import { MutableRefObject } from 'react';
import { RocketPosition } from '../types';

const rocketSize = 44;
const buffer = 12; // Buffer zone in pixels
const edgeSpacing = 20; // Minimum spacing from edges in pixels

let unavailable = new Set<number>(); // Hash set for instant lookups
let gridWidth = 0;
let gridHeight = 0;
let cols = 0;
let rows = 0;

const hashPosition = (x: number, y: number) => (x << 16) | y;

/**
 * Computes the grid cell indices (via four corners) that the rocket's
 * area (including its buffer) covers.
 * Returns up to four distinct hash keys without using a loop.
 */
const getDistinctHashes = (pos: RocketPosition): number[] => {
  // Calculate the grid cell coordinates for each corner.
  const x1 = Math.floor((pos.left - buffer) / gridWidth);
  const y1 = Math.floor((pos.top - buffer) / gridHeight);
  const x2 = Math.floor((pos.left + rocketSize + buffer) / gridWidth);
  const y2 = Math.floor((pos.top + rocketSize + buffer) / gridHeight);

  const key1 = hashPosition(x1, y1);
  const key2 = hashPosition(x2, y1);
  const key3 = hashPosition(x1, y2);
  const key4 = hashPosition(x2, y2);

  // Manually build an array of distinct keys using conditionals.
  // (Since there are only four values, this is still O(1).)
  if (key1 === key2 && key1 === key3 && key1 === key4) {
    return [key1];
  }
  if (key1 === key2 && key3 === key4 && key1 !== key3) {
    return [key1, key3];
  }
  if (key1 === key3 && key2 === key4 && key1 !== key2) {
    return [key1, key2];
  }
  if (key1 === key4 && key2 === key3 && key1 !== key2) {
    return [key1, key2];
  }
  // In the general case, build the distinct list with explicit conditionals:
  let keys: number[] = [];
  // Always include key1.
  keys.push(key1);
  if (key2 !== key1) {
    keys.push(key2);
  }
  if (key3 !== key1 && key3 !== key2) {
    keys.push(key3);
  }
  if (key4 !== key1 && key4 !== key2 && key4 !== key3) {
    keys.push(key4);
  }
  return keys;
};

/**
 * Checks whether the candidate position overlaps any already-occupied grid.
 * This is done by checking each distinct hash key individually.
 */
export const isValidPosition = (newPos: RocketPosition): boolean => {
  const keys = getDistinctHashes(newPos);
  // There are at most 4 keys—each check is O(1)
  if (keys.length === 1) {
    return !unavailable.has(keys[0]);
  }
  if (keys.length === 2) {
    return !unavailable.has(keys[0]) && !unavailable.has(keys[1]);
  }
  if (keys.length === 3) {
    return (
      !unavailable.has(keys[0]) &&
      !unavailable.has(keys[1]) &&
      !unavailable.has(keys[2])
    );
  }
  // keys.length === 4
  return (
    !unavailable.has(keys[0]) &&
    !unavailable.has(keys[1]) &&
    !unavailable.has(keys[2]) &&
    !unavailable.has(keys[3])
  );
};

/**
 * Marks (or unmarks) the grid cells that the rocket occupies by updating
 * the hash set using the computed distinct keys.
 */
export const markArea = (
  pos: RocketPosition,
  makeUnavailable: boolean
): void => {
  const keys = getDistinctHashes(pos);
  if (keys.length === 1) {
    makeUnavailable ? unavailable.add(keys[0]) : unavailable.delete(keys[0]);
  } else if (keys.length === 2) {
    makeUnavailable
      ? (unavailable.add(keys[0]), unavailable.add(keys[1]))
      : (unavailable.delete(keys[0]), unavailable.delete(keys[1]));
  } else if (keys.length === 3) {
    makeUnavailable
      ? (unavailable.add(keys[0]),
        unavailable.add(keys[1]),
        unavailable.add(keys[2]))
      : (unavailable.delete(keys[0]),
        unavailable.delete(keys[1]),
        unavailable.delete(keys[2]));
  } else if (keys.length === 4) {
    makeUnavailable
      ? (unavailable.add(keys[0]),
        unavailable.add(keys[1]),
        unavailable.add(keys[2]),
        unavailable.add(keys[3]))
      : (unavailable.delete(keys[0]),
        unavailable.delete(keys[1]),
        unavailable.delete(keys[2]),
        unavailable.delete(keys[3]));
  }
};

/**
 * Computes the grid dimensions from the game container.
 * The grid cell size is based on the rocket’s size plus its buffer.
 */
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

/**
 * Generates a new valid rocket position by randomly picking a candidate
 * and verifying via an O(1) hashset lookup that none of its corner cells
 * are already occupied.
 */
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
