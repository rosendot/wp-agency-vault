import { notFound } from "next/navigation";
import { getSection, getPalettes } from "../../lib/data";
import SectionDetail from "../../components/SectionDetail";

export default async function SectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [section, palettes] = await Promise.all([getSection(slug), getPalettes()]);

  if (!section) notFound();

  const defaultPalette = palettes.find((p) => p.slug === section.default_palette);

  return (
    <SectionDetail
      section={section}
      palettes={palettes}
      defaultPalette={defaultPalette}
    />
  );
}
