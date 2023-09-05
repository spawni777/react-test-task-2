import { useCallback, useRef } from 'react';

const useInfinityScroll = (isLoading: boolean, hasMoreElements: boolean, cb: () => void) => {
  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback((item: HTMLElement | null) => {
    if (isLoading) return;

    if (observer.current) {
      observer.current!.disconnect()
    }
    if (!hasMoreElements) {
      return;
    }

    observer.current = new IntersectionObserver(items => {
      if (items[0].isIntersecting && hasMoreElements) {
        console.log('Last Item intersection detected!');
        cb();
      }
    })

    if (item) observer.current!.observe(item);
  }, [isLoading, hasMoreElements, cb]);

  return {lastItemRef}
}

export default useInfinityScroll;
