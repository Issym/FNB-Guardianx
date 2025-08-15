"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Point = { lat:number; lng:number; t:number; battery?:number };

export default function TrackView() {
  const { id } = useParams<{id: string}>();
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(()=>{
    const i = setInterval(async ()=>{
      const r = await fetch(`/api/panic/status?id=${id}`, { cache: "no-store" });
      const d = await r.json();
      setPoints(d.points ?? []);
    }, 2000);
    return ()=>clearInterval(i);
  }, [id]);

  const last = points.at(-1);
  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold">Live Tracking</h1>
      <p className="text-sm text-muted">Session: {id}</p>
      {last ? (
        <div className="card p-4">
          <p>Last location: <span className="font-mono">{last.lat.toFixed(5)}, {last.lng.toFixed(5)}</span> — {new Date(last.t).toLocaleTimeString()}</p>
          {typeof last.battery === "number" && <p>Battery: {last.battery}%</p>}
          <p className="text-xs text-muted mt-2">Map rendering can be added here; for now we list points (polling every 2s).</p>
          <div className="mt-2 max-h-64 overflow-auto text-xs font-mono bg-black/30 rounded-xl p-2 border border-white/10">
            {points.map(p=>(<div key={p.t}>{p.t}: {p.lat},{p.lng} {p.battery ? `(${p.battery}%)`:""}</div>))}
          </div>
        </div>
      ) : <p className="text-muted">Waiting for location updates...</p>}
    </div>
  );
}
