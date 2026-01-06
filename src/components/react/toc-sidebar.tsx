import { useTocPosition } from "@/hooks/use-toc-position";
import { TableOfContents } from "@/components/react/table-of-contents";

interface Heading {
  slug: string;
  text: string;
  depth: number;
}

interface TocSidebarProps {
  headings: Heading[];
  contentId: string;
}

export function TocSidebar({ headings, contentId }: TocSidebarProps) {
  const { left, width, isReady } = useTocPosition(contentId);

  if (headings.length === 0) return null;

  // CSS handles visibility: hidden on screens < 1200px (see parent)
  // Fade in after position is calculated to prevent layout shift
  return (
    <div
      className="fixed z-10 transition-opacity duration-200"
      style={{
        top: 120,
        left,
        width,
        maxHeight: "calc(100vh - 180px)",
        overflowY: "auto",
        opacity: isReady ? 1 : 0,
      }}
    >
      <TableOfContents headings={headings} />
    </div>
  );
}
