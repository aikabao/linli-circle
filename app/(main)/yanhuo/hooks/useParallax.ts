import { useMemo } from 'react';

interface ParallaxLayer {
  speed: number;
  width: number;
  viewportWidth: number;
  viewStart: number;
}

export function useParallax(layers: ParallaxLayer[]) {
  return useMemo(() => {
    return layers.map(layer => ({
      ...layer,
      offset: layer.viewStart * layer.speed,
    }));
  }, [layers]);
}