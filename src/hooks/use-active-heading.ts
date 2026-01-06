import { useState, useEffect, useRef } from "react";

interface Heading {
  slug: string;
  text: string;
  depth: number;
}

export function useActiveHeading(headings: Heading[], offset = 150) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.slug ?? null
  );
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    function updateActiveHeading() {
      const scrollPosition = window.scrollY;
      let newActiveId = headingElements[0]?.id ?? null;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        const elementTop = element.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition >= elementTop - offset) {
          newActiveId = element.id;
          break;
        }
      }

      setActiveId(newActiveId);
    }

    function handleScroll() {
      if (!isScrollingRef.current) {
        window.requestAnimationFrame(() => {
          updateActiveHeading();
          isScrollingRef.current = false;
        });
        isScrollingRef.current = true;
      }
    }

    // Set initial active heading
    updateActiveHeading();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, offset]);

  return activeId;
}
