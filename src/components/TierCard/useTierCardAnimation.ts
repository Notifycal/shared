import { useEffect, useState } from 'react';

const animationTiming = {
  resetDuration: 75,
  burstDuration: 150,
  settleDuration: 300,
  burstDelay: 50,
  totalDuration: 400
} as const;

type AnimationState = 'idle' | 'reset' | 'burst';

const useCardAnimation = (shouldAnimate: boolean, trigger: number): AnimationState => {
  const [animationState, setAnimationState] = useState<AnimationState>('idle');

  useEffect(() => {
    if (!shouldAnimate || trigger === 0) return;

    setAnimationState('reset');

    const burstTimer = setTimeout(() => {
      setAnimationState('burst');
    }, animationTiming.burstDelay);

    const finishTimer = setTimeout(() => {
      setAnimationState('idle');
    }, animationTiming.totalDuration);

    return (): void => {
      clearTimeout(burstTimer);
      clearTimeout(finishTimer);
    };
  }, [shouldAnimate, trigger]);

  return animationState;
};

const getScaleClasses = (animationState: AnimationState, hasRecommendation: boolean): string => {
  const baseClasses = 'transition-transform';
  switch (animationState) {
    case 'reset':
      return `${baseClasses} scale-100 duration-${animationTiming.resetDuration}`;
    case 'burst':
      return `${baseClasses} scale-115 duration-${animationTiming.burstDuration}`;
    default:
      return `${baseClasses} ${hasRecommendation ? 'scale-105' : 'scale-100'} duration-${animationTiming.settleDuration}`;
  }
};

export const useTierCardAnimation = (
  shouldAnimate: boolean,
  trigger: number,
  hasRecommendation: boolean
): { animationClasses: string; isAnimating: boolean } => {
  const animationState = useCardAnimation(shouldAnimate, trigger);
  const animationClasses = getScaleClasses(animationState, hasRecommendation);

  return {
    animationClasses,
    isAnimating: animationState !== 'idle'
  };
};
