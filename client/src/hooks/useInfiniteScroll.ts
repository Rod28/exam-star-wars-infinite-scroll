import { useCallback, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
  root?: any;
  rootMargin?: string;
  threshold: number;
}

export interface UseInfiniteScrollArgs {
  enabled: boolean;
  target: any;
  options: UseInfiniteScrollOptions;
  callback: () => Promise<void>;
}

const useInfiniteScroll = ({
  enabled,
  target,
  options,
  callback
}: UseInfiniteScrollArgs) => {
  /**
   * Se ejecuta la funcion 'callback; cuando se cruza el 'threshold'.
   */
  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting) {
        callback();
      }
    },
    [callback]
  );

  /**
   * Funcion que ejecuta el IntersectionObserver, solo si existe 'target' y 'enabled'.
   */
  useEffect(() => {
    const targetRef = target && target.current;

    //
    if (!enabled || !targetRef) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, options);

    if (enabled && target.current) {
      observer.observe(targetRef);
    }

    return () => {
      observer.unobserve(targetRef);
    };
  }, [enabled, target, options, handleObserver]);

  return {};
};

export default useInfiniteScroll;
