import { prisma } from "@/lib/db";

export interface GraphNode {
  id: string;
  name: string;
  color: string | null;
  count: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphEntry {
  id: string;
  kind: "quote" | "reflection";
  bookId: string;
  bookTitle: string;
  snippet: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  entriesByTag: Record<string, GraphEntry[]>;
}

function snippetOf(text: string, max = 140): string {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

export async function buildGraph(): Promise<GraphData> {
  const [tags, quotes, reflections] = await Promise.all([
    prisma.tag.findMany(),
    prisma.quote.findMany({
      include: { book: true, tags: { select: { tagId: true } } },
    }),
    prisma.reflection.findMany({
      include: { book: true, tags: { select: { tagId: true } } },
    }),
  ]);

  const usage = new Map<string, number>();
  const entriesByTag: Record<string, GraphEntry[]> = {};
  const edgeWeights = new Map<string, number>();

  const record = (
    tagIds: string[],
    entry: GraphEntry,
  ) => {
    for (const tagId of tagIds) {
      usage.set(tagId, (usage.get(tagId) ?? 0) + 1);
      (entriesByTag[tagId] ??= []).push(entry);
    }
    for (let i = 0; i < tagIds.length; i++) {
      for (let j = i + 1; j < tagIds.length; j++) {
        const [a, b] = [tagIds[i], tagIds[j]].sort();
        const key = `${a}::${b}`;
        edgeWeights.set(key, (edgeWeights.get(key) ?? 0) + 1);
      }
    }
  };

  for (const quote of quotes) {
    const tagIds = quote.tags.map((t) => t.tagId);
    record(tagIds, {
      id: quote.id,
      kind: "quote",
      bookId: quote.bookId,
      bookTitle: quote.book.title,
      snippet: snippetOf(quote.text),
    });
  }

  for (const reflection of reflections) {
    const tagIds = reflection.tags.map((t) => t.tagId);
    record(tagIds, {
      id: reflection.id,
      kind: "reflection",
      bookId: reflection.bookId,
      bookTitle: reflection.book.title,
      snippet: snippetOf(reflection.title ? `${reflection.title} — ${reflection.body}` : reflection.body),
    });
  }

  const nodes: GraphNode[] = tags
    .map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
      count: usage.get(tag.id) ?? 0,
    }))
    .filter((node) => node.count > 0);

  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges: GraphEdge[] = [...edgeWeights.entries()]
    .map(([key, weight]) => {
      const [source, target] = key.split("::");
      return { source, target, weight };
    })
    .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));

  return { nodes, edges, entriesByTag };
}
