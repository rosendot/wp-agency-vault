import Link from "next/link";
import type { GuideData } from "../lib/data";
import { renderMarkdown } from "../lib/markdown";

export default function GuideDetail({ guide }: { guide: GuideData }) {
  const html = renderMarkdown(guide.content);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/guides"
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← All guides
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--card-border)]">
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">Guide</p>
          <h1 className="text-3xl font-semibold text-[var(--foreground)]">{guide.title}</h1>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)] bg-[var(--card-bg)] px-2 py-1 rounded">
          guides/{guide.slug}.md
        </span>
      </div>

      <article
        className="guide-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
