import { getPalettes } from "../lib/data";
import PaletteBrowser from "../components/PaletteBrowser";

export default async function PalettesPage() {
  const palettes = await getPalettes();
  return <PaletteBrowser palettes={palettes} />;
}
