import { notFound } from "next/navigation";
import { getPalette } from "../../lib/data";
import PaletteDetail from "../../components/PaletteDetail";

export default async function PaletteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const palette = await getPalette(slug);

  if (!palette) notFound();

  return <PaletteDetail palette={palette} />;
}
