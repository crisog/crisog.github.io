import { TableOfContents } from "@/components/react/table-of-contents";

interface Heading {
  slug: string;
  text: string;
  depth: number;
}

interface TocMobileProps {
  headings: Heading[];
}

export function TocMobile({ headings }: TocMobileProps) {
  if (headings.length === 0) return null;

  // CSS handles visibility: hidden on screens >= 1200px (see parent)
  return (
    <div className="border border-white/20 mb-8">
      <TableOfContents headings={headings} />
    </div>
  );
}
