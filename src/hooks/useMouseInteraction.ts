import { useEffect } from 'react';
import { MotionValue } from 'motion';
import { Animator } from '../three/Animator';

interface UseMouseInteractionProps {
  animator: Animator | undefined;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function useMouseInteraction({ animator, mouseX, mouseY }: UseMouseInteractionProps) {
  useEffect(() => {
    if (!animator) return undefined;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const unsubscribeX = mouseX.on('change', (x) => {
      animator.setMouse(x, mouseY.get());
    });

    const unsubscribeY = mouseY.on('change', (y) => {
      animator.setMouse(mouseX.get(), y);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      unsubscribeX();
      unsubscribeY();
    };
  }, [animator, mouseX, mouseY]);
}
