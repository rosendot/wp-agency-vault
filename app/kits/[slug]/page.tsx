import { notFound } from "next/navigation";
import { getKit } from "../../lib/data";
import KitDetail from "../../components/KitDetail";

export default async function KitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kit = await getKit(slug);

  if (!kit) notFound();

  return <KitDetail kit={kit} />;
}
