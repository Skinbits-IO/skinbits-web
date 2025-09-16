import { useEffect, useRef } from 'react';
import { useUser } from '../../../shared';
import { useGameContext } from '../context';

export const useProcessRockets = () => {
  const { tokens } = useUser();
  const { isRocketPending, hasTokenError, setHasTokenError } = useGameContext();

  const currentProcessedItemRef = useRef<{
    socketFunction: (tapToken: string) => void;
    stateUpdateFunction: () => void;
  } | null>(null);
  const processingQueueRef = useRef<
    {
      socketFunction: (tapToken: string) => void;
      stateUpdateFunction: () => void;
    }[]
  >([]);

  useEffect(() => {
    if (isRocketPending || !currentProcessedItemRef.current) return;
    const item = processingQueueRef.current.shift();
    if (item) {
      currentProcessedItemRef.current = item;

      item.stateUpdateFunction();
      item.socketFunction(tokens!.tapToken!);
    }
  }, [isRocketPending, tokens]);

  useEffect(() => {
    if (!hasTokenError || !currentProcessedItemRef.current) return;
    currentProcessedItemRef.current.socketFunction(tokens!.tapToken!);
    setHasTokenError(false);
  }, [hasTokenError, tokens]);

  return { currentProcessedItemRef, processingQueueRef };
};
