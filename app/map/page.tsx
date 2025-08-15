"use client";
import dynamic from "next/dynamic";
const MapClient = dynamic(()=>import("@/components/MapClient"), { ssr: false });

export default function MapPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Unsafe Places Map</h1>
      <p className="text-sm text-muted">Time-decayed crowd reports. Location is approximate for privacy.</p>
      <div className="card p-1 h-[70dvh]">
        <MapClient/>
      </div>
    </div>
  );
}
