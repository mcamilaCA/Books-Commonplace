"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from "d3-force";
import type { GraphData, GraphNode } from "@/lib/graph";

type SimNode = GraphNode & SimulationNodeDatum;
type SimLink = SimulationLinkDatum<SimNode> & { weight: number };

const WIDTH = 900;
const HEIGHT = 620;

function radiusFor(count: number): number {
  return 10 + Math.min(24, Math.sqrt(count) * 8);
}

export function GraphView({
  data,
  initialTagId,
}: {
  data: GraphData;
  initialTagId?: string;
}) {
  const [nodes, setNodes] = useState<SimNode[]>(() =>
    data.nodes.map((n) => ({ ...n })),
  );
  const [selected, setSelected] = useState<string | null>(initialTagId ?? null);
  const dragId = useRef<string | null>(null);
  const linksRef = useRef<SimLink[]>([]);

  useEffect(() => {
    const simNodes: SimNode[] = data.nodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = data.edges.map((e) => ({ ...e }));
    linksRef.current = simLinks;

    const simulation = forceSimulation(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => 200 - Math.min(150, (d as SimLink).weight * 25))
          .strength(0.5),
      )
      .force("charge", forceManyBody().strength(-260))
      .force("center", forceCenter(WIDTH / 2, HEIGHT / 2))
      .force(
        "collide",
        forceCollide<SimNode>((d) => radiusFor(d.count) + 14),
      )
      .on("tick", () => setNodes([...simNodes]));

    return () => {
      simulation.stop();
    };
  }, [data]);

  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const connectedIds = useMemo(() => {
    if (!selected) return null;
    const set = new Set<string>([selected]);
    for (const edge of data.edges) {
      const source = typeof edge.source === "string" ? edge.source : (edge.source as SimNode).id;
      const target = typeof edge.target === "string" ? edge.target : (edge.target as SimNode).id;
      if (source === selected) set.add(target);
      if (target === selected) set.add(source);
    }
    return set;
  }, [selected, data.edges]);

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragId.current) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    setNodes((prev) =>
      prev.map((n) => (n.id === dragId.current ? { ...n, x, y, fx: x, fy: y } : n)),
    );
  }

  const selectedNode = selected ? nodeById.get(selected) : undefined;
  const selectedEntries = selected ? (data.entriesByTag[selected] ?? []) : [];
  const connectedTags = selected
    ? data.edges
        .filter((e) => {
          const s = typeof e.source === "string" ? e.source : (e.source as SimNode).id;
          const t = typeof e.target === "string" ? e.target : (e.target as SimNode).id;
          return s === selected || t === selected;
        })
        .map((e) => {
          const s = typeof e.source === "string" ? e.source : (e.source as SimNode).id;
          const t = typeof e.target === "string" ? e.target : (e.target as SimNode).id;
          const otherId = s === selected ? t : s;
          return { node: nodeById.get(otherId), weight: e.weight };
        })
        .filter((x) => x.node)
        .sort((a, b) => b.weight - a.weight)
    : [];

  if (data.nodes.length === 0) {
    return (
      <p className="text-center italic text-parchment-dim">
        No ideas tagged yet. Add tags to your quotes and reflections to grow the map.
      </p>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="overflow-hidden border border-gold-dim/60 bg-ink-soft/60">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full touch-none select-none"
          onPointerMove={handlePointerMove}
          onPointerUp={() => (dragId.current = null)}
          onPointerLeave={() => (dragId.current = null)}
        >
          <g>
            {data.edges.map((edge, i) => {
              const source = nodeById.get(
                typeof edge.source === "string" ? edge.source : (edge.source as SimNode).id,
              );
              const target = nodeById.get(
                typeof edge.target === "string" ? edge.target : (edge.target as SimNode).id,
              );
              if (!source || !target) return null;
              const dimmed = connectedIds && (!connectedIds.has(source.id) || !connectedIds.has(target.id));
              return (
                <line
                  key={i}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#b28a3f"
                  strokeOpacity={dimmed ? 0.06 : 0.35}
                  strokeWidth={Math.min(4, 0.6 + edge.weight * 0.6)}
                />
              );
            })}
          </g>
          <g>
            {nodes.map((node) => {
              const dimmed = connectedIds && !connectedIds.has(node.id);
              const r = radiusFor(node.count);
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x ?? WIDTH / 2}, ${node.y ?? HEIGHT / 2})`}
                  className="cursor-pointer"
                  onPointerDown={() => (dragId.current = node.id)}
                  onClick={() => setSelected((prev) => (prev === node.id ? null : node.id))}
                >
                  <circle
                    r={r}
                    fill={node.color ?? "#b28a3f"}
                    fillOpacity={dimmed ? 0.15 : 0.85}
                    stroke={selected === node.id ? "#dcb769" : "#16110d"}
                    strokeWidth={selected === node.id ? 2.5 : 1}
                  />
                  <text
                    y={r + 14}
                    textAnchor="middle"
                    className="font-serif"
                    fill={dimmed ? "#e3d1a866" : "#f1e4c8"}
                    fontSize={13}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <aside className="border border-gold-dim/60 bg-ink-soft/60 p-5">
        {selectedNode ? (
          <div>
            <p className="small-caps-tracked text-sm text-gold-dim">idea</p>
            <h3 className="font-display text-xl text-gold-bright">{selectedNode.name}</h3>
            <p className="mt-1 text-xs text-parchment-dim">
              {selectedNode.count} {selectedNode.count === 1 ? "entry" : "entries"}
            </p>

            {connectedTags.length > 0 && (
              <div className="mt-4">
                <p className="small-caps-tracked text-xs text-parchment-dim/70">connected ideas</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {connectedTags.map(({ node, weight }) => (
                    <button
                      key={node!.id}
                      onClick={() => setSelected(node!.id)}
                      className="rounded-full border border-gold-dim/60 px-2 py-0.5 text-xs text-parchment-dim hover:border-gold hover:text-gold-bright"
                    >
                      {node!.name} · {weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 space-y-3">
              <p className="small-caps-tracked text-xs text-parchment-dim/70">where it appears</p>
              {selectedEntries.map((entry) => (
                <Link
                  key={`${entry.kind}-${entry.id}`}
                  href={`/books/${entry.bookId}`}
                  className="block border-l-2 border-gold-dim/60 pl-3 hover:border-gold"
                >
                  <p className="text-xs text-gold-dim">{entry.bookTitle}</p>
                  <p className="text-sm italic text-parchment-dim">{entry.snippet}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-parchment-dim">
            Click any idea in the map to see where it appears and what it connects to. Drag
            nodes to rearrange the constellation.
          </p>
        )}
      </aside>
    </div>
  );
}
