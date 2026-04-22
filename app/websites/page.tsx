import { getWebsites } from "../lib/data";
import WebsiteBrowser from "../components/WebsiteBrowser";

export default async function WebsitesPage() {
  const websites = await getWebsites();
  return <WebsiteBrowser websites={websites} />;
}
