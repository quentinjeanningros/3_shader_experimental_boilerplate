import { useCallback, useState, useLayoutEffect, RefObject } from 'react';

export function useElementSize<T extends HTMLElement | null = HTMLDivElement>(
  elementRef: RefObject<T>,
) {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setSize({
      width: elementRef.current?.offsetWidth || 0,
      height: elementRef.current?.offsetHeight || 0,
    });
  }, [elementRef]);

  useLayoutEffect(() => {
    if (!elementRef.current) return undefined;

    handleSize();
    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, [elementRef, handleSize]);

  return [size.width, size.height] as const;
}
