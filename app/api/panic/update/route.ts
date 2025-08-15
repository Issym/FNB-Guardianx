import { NextResponse } from "next/server";
import store from "@/lib/store";

export async function POST(req: Request) {
  const { id, lat, lng, battery } = await req.json();
  const s = store.sessions.get(id);
  if (!s) return NextResponse.json({ error: "not_found" }, { status: 404 });
  s.points.push({ lat: Number(lat), lng: Number(lng), t: Date.now(), battery: typeof battery==="number"?battery:undefined });
  return NextResponse.json({ ok: true });
}
