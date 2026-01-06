import { useCallback } from "react";
import { useScrollPosition } from "@/hooks/use-scroll-position";

const SCROLL_THRESHOLD = 300;

export function ScrollToTop() {
  const { isScrolled } = useScrollPosition(SCROLL_THRESHOLD);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50 p-3
        border border-white/20 bg-black/80 backdrop-blur-sm
        transition-all duration-300
        hover:border-white/60 cursor-pointer
        ${isScrolled ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white/80"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
