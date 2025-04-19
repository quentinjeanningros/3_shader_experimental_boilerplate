import { useEffect, useState } from 'react';
import { ThreeBaseScene } from '../three/Scene';
import { Animator } from '../three/Animator';

interface UseThreeSceneProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  width: number;
  height: number;
}

interface UseThreeSceneResult {
  scene: ThreeBaseScene | undefined;
  animator: Animator | undefined;
}

export function useThreeScene({
  containerRef,
  width,
  height,
}: UseThreeSceneProps): UseThreeSceneResult {
  const [scene, setScene] = useState<ThreeBaseScene | undefined>(undefined);
  const [animator, setAnimator] = useState<Animator | undefined>(undefined);

  // Initialize scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const newScene = new ThreeBaseScene(container);
    setScene(newScene);

    return () => {
      newScene.clear();
    };
  }, [containerRef]);

  // Initialize animator
  useEffect(() => {
    if (!scene) return undefined;

    const newAnimator = new Animator(scene);
    setAnimator(newAnimator);

    return () => {
      newAnimator.clear();
    };
  }, [scene]);

  // Update resolution
  useEffect(() => {
    if (!animator) return undefined;

    animator.setResolution(width, height);
  }, [animator, width, height]);

  return { scene, animator };
}
