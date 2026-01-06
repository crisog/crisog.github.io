import { TableOfContents } from "@/components/react/table-of-contents";

interface Heading {
  slug: string;
  text: string;
  depth: number;
}

interface TocSidebarProps {
  headings: Heading[];
}

export function TocSidebar({ headings }: TocSidebarProps) {
  if (headings.length === 0) return null;

  // CSS handles both visibility and positioning - no JS needed
  // Position is set via className, responsive to screen width
  return (
    <div className="toc-sidebar fixed z-10 w-[250px] top-[120px] max-h-[calc(100vh-180px)] overflow-y-auto left-4 [@media(min-width:1500px)]:left-[calc(50vw-728px)]">
      <TableOfContents headings={headings} />
    </div>
  );
}
