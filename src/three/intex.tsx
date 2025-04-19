import { useRef } from 'react';
import { useElementSize } from '../hooks/useElementSize';
import { useSpring } from 'motion/react';
import { useThreeScene } from '../hooks/useThreeScene';
import { useMouseInteraction } from '../hooks/useMouseInteraction';

interface Props {
  className?: string;
}

const SPRING_CONFIG = { damping: 20, stiffness: 100 };

export default function ThreeScene(props: Props) {
  const { className } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, height] = useElementSize(containerRef);
  const mouseX = useSpring(0, SPRING_CONFIG);
  const mouseY = useSpring(0, SPRING_CONFIG);

  const { animator } = useThreeScene({
    containerRef,
    width,
    height,
  });

  useMouseInteraction({
    animator,
    mouseX,
    mouseY,
  });

  return <div ref={containerRef} className={className} />;
}
