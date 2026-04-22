import Link from "next/link";
import type { WebsiteData } from "../lib/data";

const STATUS_LABELS: Record<string, string> = {
  mock: "Mock",
  "in-progress": "In progress",
  live: "Live",
  archived: "Archived",
};

const STATUS_STYLES: Record<string, string> = {
  mock: "text-[var(--muted)] bg-[var(--background)]",
  "in-progress": "text-[var(--gold)] bg-[var(--gold)]/10",
  live: "text-emerald-400 bg-emerald-400/10",
  archived: "text-[var(--muted)] bg-[var(--card-bg)]",
};

export default function WebsiteDetail({ website }: { website: WebsiteData }) {
  const liveUrl = website.url;
  const previewFile = website.preview;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/websites"
          className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← All websites
        </Link>
      </div>

      <div className="mb-8 pb-6 border-b border-[var(--card-border)]">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
              Website
            </p>
            <h1 className="text-3xl font-semibold text-[var(--foreground)]">
              {website.name}
            </h1>
          </div>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0 ${
              STATUS_STYLES[website.status] ?? STATUS_STYLES.mock
            }`}
          >
            {STATUS_LABELS[website.status] ?? website.status}
          </span>
        </div>
        <p className="text-[var(--muted)] leading-relaxed">
          {website.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
            Category
          </p>
          <p className="text-[var(--foreground)] capitalize">{website.category}</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
            Client
          </p>
          <p className="text-[var(--foreground)]">
            {website.client ?? <span className="text-[var(--muted)]">—</span>}
          </p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
            Launched
          </p>
          <p className="text-[var(--foreground)]">
            {website.launched ?? <span className="text-[var(--muted)]">—</span>}
          </p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
            Live URL
          </p>
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline break-all"
            >
              {liveUrl}
            </a>
          ) : (
            <span className="text-[var(--muted)]">Not deployed</span>
          )}
        </div>
      </div>

      {previewFile && (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-5">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
            Local preview
          </p>
          <p className="text-sm text-[var(--foreground)] mb-3">
            A standalone mock of this website lives at{" "}
            <code className="text-xs bg-[var(--background)] px-1.5 py-0.5 rounded font-mono text-[var(--gold)]">
              websites/{website.slug}/{previewFile}
            </code>
            . Open it directly in your editor or browser — it is not served
            through the dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
