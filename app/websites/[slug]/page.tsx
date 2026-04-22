import { notFound } from "next/navigation";
import { getWebsite } from "../../lib/data";
import WebsiteDetail from "../../components/WebsiteDetail";

export default async function WebsiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const website = await getWebsite(slug);

  if (!website) notFound();

  return <WebsiteDetail website={website} />;
}
