import { getGuides } from "../lib/data";
import GuideBrowser from "../components/GuideBrowser";

export default async function GuidesPage() {
  const guides = await getGuides();
  return <GuideBrowser guides={guides} />;
}
