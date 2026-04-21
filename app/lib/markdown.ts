// Minimal server-side markdown → HTML renderer.
// Supports: headings, paragraphs, fenced code, inline code, bold, italic,
// links, unordered/ordered lists (with nesting by indent), blockquotes,
// horizontal rules, and pipe tables. Output is escaped before formatting.

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applyInline(text: string): string {
  let out = escapeHtml(text);

  // Inline code: `code`
  out = out.replace(/`([^`]+)`/g, (_m, code) => `<code>${code}</code>`);

  // Links: [text](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_m, label, url, title) => {
      const isExternal = /^https?:\/\//i.test(url);
      const titleAttr = title ? ` title="${title}"` : "";
      const target = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
      return `<a href="${url}"${titleAttr}${target}>${label}</a>`;
    },
  );

  // Bold: **text** or __text__
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  // Italic: *text* or _text_
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/(^|[^_])_([^_\n]+)_/g, "$1<em>$2</em>");

  return out;
}

interface ListItem {
  indent: number;
  ordered: boolean;
  content: string;
}

function renderList(items: ListItem[]): string {
  // Build nested list HTML by walking items with increasing/decreasing indent
  let html = "";
  const stack: { ordered: boolean; indent: number }[] = [];

  const open = (ordered: boolean, indent: number) => {
    html += ordered ? "<ol>" : "<ul>";
    stack.push({ ordered, indent });
  };
  const close = () => {
    const top = stack.pop();
    if (!top) return;
    html += top.ordered ? "</ol>" : "</ul>";
  };

  for (const item of items) {
    while (stack.length && item.indent < stack[stack.length - 1].indent) close();
    if (!stack.length || item.indent > stack[stack.length - 1].indent) {
      open(item.ordered, item.indent);
    } else if (stack[stack.length - 1].ordered !== item.ordered) {
      close();
      open(item.ordered, item.indent);
    }
    html += `<li>${applyInline(item.content)}</li>`;
  }
  while (stack.length) close();
  return html;
}

function renderTable(rows: string[]): string {
  const parseRow = (row: string) =>
    row
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((cell) => cell.trim());

  if (rows.length < 2) return "";
  const header = parseRow(rows[0]);
  // rows[1] is the separator line (---|---)
  const body = rows.slice(2).map(parseRow);

  const thead = `<thead><tr>${header.map((h) => `<th>${applyInline(h)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${body
    .map((r) => `<tr>${r.map((c) => `<td>${applyInline(c)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<table>${thead}${tbody}</table>`;
}

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let out = "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Fenced code block: ```lang ... ```
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const lang = fence[1];
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      const langClass = lang ? ` class="language-${lang}"` : "";
      out += `<pre><code${langClass}>${escapeHtml(buf.join("\n"))}</code></pre>`;
      continue;
    }

    // Headings: # to ######
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      out += `<h${level}>${applyInline(heading[2].trim())}</h${level}>`;
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      out += "<hr />";
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out += `<blockquote>${applyInline(buf.join(" ")).trim()}</blockquote>`;
      continue;
    }

    // Table: next line must be separator
    if (/^\s*\|?.+\|.+\|?\s*$/.test(line) && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      const rows: string[] = [line, lines[i + 1]];
      i += 2;
      while (i < lines.length && /^\s*\|?.+\|.+\|?\s*$/.test(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      out += renderTable(rows);
      continue;
    }

    // Lists
    const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const items: ListItem[] = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
        if (!m) {
          // allow blank line to continue if next is a list item
          if (lines[i].trim() === "" && i + 1 < lines.length && /^(\s*)([-*+]|\d+\.)\s+/.test(lines[i + 1])) {
            i++;
            continue;
          }
          break;
        }
        items.push({
          indent: Math.floor(m[1].length / 2),
          ordered: /\d+\./.test(m[2]),
          content: m[3],
        });
        i++;
      }
      out += renderList(items);
      continue;
    }

    // Paragraph (collect consecutive non-empty, non-block lines)
    const buf: string[] = [line];
    i++;
    while (i < lines.length) {
      const next = lines[i];
      if (
        next.trim() === "" ||
        /^#{1,6}\s+/.test(next) ||
        /^```/.test(next) ||
        /^>\s?/.test(next) ||
        /^(\s*)([-*+]|\d+\.)\s+/.test(next) ||
        /^(-{3,}|\*{3,}|_{3,})\s*$/.test(next)
      ) {
        break;
      }
      buf.push(next);
      i++;
    }
    out += `<p>${applyInline(buf.join(" "))}</p>`;
  }

  return out;
}
