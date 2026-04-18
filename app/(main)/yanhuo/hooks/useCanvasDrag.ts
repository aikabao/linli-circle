import { useRef, RefObject } from 'react';

interface DragOptions {
  onDragMove?: (deltaX: number, deltaY: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function useCanvasDrag(
  canvasRef: RefObject<HTMLCanvasElement>,
  options: DragOptions = {}
) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);

  const startDrag = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    canvasRef.current?.classList.add('cursor-grabbing');
    options.onDragStart?.();
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    if (deltaX !== 0) {
      options.onDragMove?.(deltaX, 0);
      lastX.current = e.clientX;
    }
  };

  const endDrag = () => {
    isDragging.current = false;
    canvasRef.current?.classList.remove('cursor-grabbing');
    options.onDragEnd?.();
  };

  return { startDrag, onDrag, endDrag };
}