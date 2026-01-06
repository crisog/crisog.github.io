import { useState, useEffect, useCallback } from "react";

interface TocPosition {
  left: number;
  width: number;
  isReady: boolean;
}

const TOC_WIDTH = 250;
const WIDE_SCREEN_WIDTH = 1500;

export function useTocPosition(contentId: string) {
  const [position, setPosition] = useState<TocPosition>({
    left: 16,
    width: TOC_WIDTH,
    isReady: false,
  });

  const calculatePosition = useCallback(() => {
    const content = document.getElementById(contentId);
    if (!content) return;

    const contentRect = content.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    if (screenWidth >= WIDE_SCREEN_WIDTH) {
      // Wide screen: position TOC to the left of content with gap
      setPosition({
        left: contentRect.left - TOC_WIDTH - 30,
        width: TOC_WIDTH,
        isReady: true,
      });
    } else {
      // Default: position at fixed left edge
      setPosition({
        left: 16,
        width: TOC_WIDTH,
        isReady: true,
      });
    }
  }, [contentId]);

  useEffect(() => {
    calculatePosition();

    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, [calculatePosition]);

  return position;
}
