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
  const { isVisible, left, width } = useTocPosition(contentId);

  if (!isVisible || headings.length === 0) return null;

  return (
    <div
      className="fixed z-10 transition-opacity duration-300"
      style={{
        top: 120,
        left,
        width,
        maxHeight: "calc(100vh - 180px)",
        overflowY: "auto",
      }}
    >
      <TableOfContents headings={headings} />
    </div>
  );
}
