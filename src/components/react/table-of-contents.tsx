import { useCallback } from "react";
import { useActiveHeading } from "@/hooks/use-active-heading";

interface Heading {
  slug: string;
  text: string;
  depth: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const filteredHeadings = headings.filter(
    (heading) => heading.depth >= 2 && heading.depth <= 3
  );

  const activeId = useActiveHeading(filteredHeadings);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();

      const target = document.getElementById(slug);
      if (!target) return;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      history.pushState(null, "", `#${slug}`);
    },
    []
  );

  if (filteredHeadings.length === 0) return null;

  return (
    <nav className="p-4">
      <h2 className="text-sm font-light mb-4 tracking-widest text-text-secondary">
        TABLE OF CONTENTS
      </h2>
      <ul className="list-none p-0 m-0 space-y-2">
        {filteredHeadings.map((heading) => (
          <li key={heading.slug} className={heading.depth === 3 ? "ml-4" : ""}>
            <a
              href={`#${heading.slug}`}
              onClick={(e) => handleClick(e, heading.slug)}
              title={heading.text}
              className={`
                block text-sm py-1 px-2
                border-l-2 transition-all duration-200
                overflow-hidden whitespace-nowrap text-ellipsis
                ${
                  activeId === heading.slug
                    ? "text-text-primary border-border-hover bg-bg-elevated"
                    : "text-text-secondary border-transparent hover:text-text-primary hover:translate-x-0.5"
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
