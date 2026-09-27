import { buildGraph } from "@/lib/graph";
import { GraphView } from "@/components/map/GraphView";

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const data = await buildGraph();

  return (
    <div className="space-y-8">
      <section className="text-center">
        <p className="small-caps-tracked text-sm text-gold-dim">the constellation</p>
        <h1 className="font-display text-3xl text-gold-bright">Idea Map</h1>
        <p className="mx-auto mt-3 max-w-xl font-serif italic text-parchment-dim">
          Every idea you have tagged, drawn together — closer where they echo the same
          quote or thought, further where they merely share a shelf.
        </p>
      </section>

      <GraphView data={data} initialTagId={tag} />
    </div>
  );
}
