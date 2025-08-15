import { NextResponse } from "next/server";
import store from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;
  const s = store.sessions.get(id);
  if (!s) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ active: s.active, points: s.points.slice(-100) });
}
