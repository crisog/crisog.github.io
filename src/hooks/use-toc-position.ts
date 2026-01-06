import { useState, useEffect, useCallback } from "react";

interface TocPosition {
  isVisible: boolean;
  left: number;
  width: number;
}

const TOC_WIDTH = 250;
const MIN_SCREEN_WIDTH = 1200;
const WIDE_SCREEN_WIDTH = 1500;

export function useTocPosition(contentId: string) {
  const [position, setPosition] = useState<TocPosition>({
    isVisible: false,
    left: 16,
    width: TOC_WIDTH,
  });

  const calculatePosition = useCallback(() => {
    const content = document.getElementById(contentId);
    if (!content) return;

    const contentRect = content.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    if (screenWidth >= WIDE_SCREEN_WIDTH) {
      // Wide screen: position TOC to the left of content with gap
      setPosition({
        isVisible: true,
        left: contentRect.left - TOC_WIDTH - 30,
        width: TOC_WIDTH,
      });
    } else if (screenWidth >= MIN_SCREEN_WIDTH) {
      // Medium screen: position at fixed left edge
      setPosition({
        isVisible: true,
        left: 16,
        width: TOC_WIDTH,
      });
    } else {
      // Small screen: hide desktop TOC
      setPosition({
        isVisible: false,
        left: 16,
        width: TOC_WIDTH,
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
