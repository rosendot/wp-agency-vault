import { getSections, getPalettes } from "../lib/data";
import SectionBrowser from "../components/SectionBrowser";

export default async function SectionsPage() {
  const [sections, palettes] = await Promise.all([getSections(), getPalettes()]);
  return <SectionBrowser sections={sections} palettes={palettes} />;
}
