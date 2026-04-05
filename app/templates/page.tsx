import { getTemplates, getPalettes } from "../lib/data";
import TemplateBrowser from "../components/TemplateBrowser";

export default async function TemplatesPage() {
  const [templates, palettes] = await Promise.all([getTemplates(), getPalettes()]);
  return <TemplateBrowser templates={templates} palettes={palettes} />;
}
