import { NextResponse } from "next/server";
import store from "@/lib/store";

export async function POST(req: Request) {
  const { id } = await req.json();
  const s = store.sessions.get(id);
  if (s) s.active = false;
  return NextResponse.json({ ok: true });
}
