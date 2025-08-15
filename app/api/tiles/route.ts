import { NextResponse } from "next/server";
import store from "@/lib/store";
import { decayScore } from "@/lib/utils";

export async function GET() {
  // Very simple aggregation: return incident points with decayed score
  const now = Date.now();
  const tiles = store.incidents.map(i => ({
    lat: i.lat, lng: i.lng, score: decayScore(now - i.t, 7) * (0.5 + i.severity)
  }));
  return NextResponse.json({ tiles });
}
