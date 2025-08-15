import { NextResponse } from "next/server";
import store from "@/lib/store";
import { nanoid } from "@/lib/utils";

export async function POST() {
  const id = nanoid(8);
  store.sessions.set(id, { id, active: true, points: [] });
  return NextResponse.json({ sessionId: id, shareUrl: `/track/${id}` });
}
