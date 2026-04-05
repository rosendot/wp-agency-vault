import { getKits } from "../lib/data";
import KitBrowser from "../components/KitBrowser";

export default async function KitsPage() {
  const kits = await getKits();
  return <KitBrowser kits={kits} />;
}
