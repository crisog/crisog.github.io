import { useState, useEffect } from "react";
import { TableOfContents } from "@/components/react/table-of-contents";

interface Heading {
  slug: string;
  text: string;
  depth: number;
}

interface TocMobileProps {
  headings: Heading[];
  contentId: string;
}

const MIN_SCREEN_WIDTH = 1200;

export function TocMobile({ headings, contentId }: TocMobileProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    function checkVisibility() {
      // Show mobile TOC only when desktop TOC is hidden
      setIsVisible(window.innerWidth < MIN_SCREEN_WIDTH);
    }

    checkVisibility();

    window.addEventListener("resize", checkVisibility);
    return () => window.removeEventListener("resize", checkVisibility);
  }, []);

  if (!isVisible || headings.length === 0) return null;

  return (
    <div className="border border-white/20 mb-8">
      <TableOfContents headings={headings} />
    </div>
  );
}
