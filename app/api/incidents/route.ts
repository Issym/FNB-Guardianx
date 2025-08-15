import { NextResponse } from "next/server";
import store from "@/lib/store";
import { nanoid } from "@/lib/utils";

export async function POST(req: Request) {
  const { lat, lng, severity = 1 } = await req.json();
  const id = nanoid(10);
  store.incidents.push({ id, lat: Number(lat), lng: Number(lng), t: Date.now(), severity: Number(severity) });
  return NextResponse.json({ id, status: "pending" });
}
