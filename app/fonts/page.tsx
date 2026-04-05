import { getFonts } from "../lib/data";
import FontBrowser from "../components/FontBrowser";

export default async function FontsPage() {
  const fonts = await getFonts();
  return <FontBrowser fonts={fonts} />;
}
