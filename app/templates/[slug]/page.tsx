import { notFound } from "next/navigation";
import { getTemplate, getPalettes } from "../../lib/data";
import TemplateDetail from "../../components/TemplateDetail";

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [template, palettes] = await Promise.all([getTemplate(slug), getPalettes()]);

  if (!template) notFound();

  const defaultPalette = palettes.find((p) => p.slug === template.default_palette);

  return (
    <TemplateDetail
      template={template}
      palettes={palettes}
      defaultPalette={defaultPalette}
    />
  );
}
