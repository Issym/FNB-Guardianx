"use client";
import maplibregl, { Map as MLMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

export default function MapClient() {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap|null>(null);

  useEffect(()=>{
    if (!ref.current) return;
    const map = new maplibregl.Map({
      container: ref.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [28.0473, -26.2041], // Johannesburg
      zoom: 11
    });
    mapRef.current = map;

    async function loadTiles() {
      const r = await fetch("/api/tiles?since=7d");
      const data = await r.json();
      const fc = {
        type: "FeatureCollection",
        features: data.tiles.map((t:any)=> ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [t.lng, t.lat] },
          properties: { score: t.score }
        }))
      };
      map.addSource("incidents", { type: "geojson", data: fc as any });
      map.addLayer({
        id: "heat",
        type: "heatmap",
        source: "incidents",
        paint: {
          "heatmap-radius": 30,
          "heatmap-intensity": 1.0,
          "heatmap-weight": ["interpolate", ["linear"], ["get","score"], 0, 0, 10, 1],
          "heatmap-color": [
            "interpolate", ["linear"], ["heatmap-density"],
            0, "rgba(99,102,241,0)",
            0.3, "rgba(99,102,241,0.6)",
            0.6, "rgba(245,158,11,0.8)",
            1, "rgba(244,63,94,0.9)"
          ]
        }
      });
    }

    map.on("load", loadTiles);
    return ()=>{ map.remove(); };
  }, []);

  return <div ref={ref} className="w-full h-full rounded-2xl overflow-hidden"/>;
}
