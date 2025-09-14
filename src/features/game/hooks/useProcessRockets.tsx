import { useEffect, useRef } from 'react';
import { useUser } from '../../../shared';
import { useGameContext } from '../context';

export const useProcessRockets = () => {
  const { tokens } = useUser();
  const { isRocketPending, hasError, setHasError } = useGameContext();

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
    currentProcessedItemRef.current.stateUpdateFunction();

    const item = processingQueueRef.current.shift();
    if (item) {
      currentProcessedItemRef.current = item;
      item.socketFunction(tokens!.tapToken!);
    }
  }, [isRocketPending, tokens]);

  useEffect(() => {
    if (!hasError || !currentProcessedItemRef.current) return;
    currentProcessedItemRef.current.socketFunction(tokens!.tapToken!);
    setHasError(false);
  }, [hasError, tokens]);

  return { currentProcessedItemRef, processingQueueRef };
};
