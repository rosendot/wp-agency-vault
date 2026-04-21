import { notFound } from "next/navigation";
import { getGuide } from "../../lib/data";
import GuideDetail from "../../components/GuideDetail";

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) notFound();

  return <GuideDetail guide={guide} />;
}
