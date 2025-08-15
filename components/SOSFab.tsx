"use client";
import Link from "next/link";
import { Siren } from "lucide-react";

export default function SOSFab() {
  return (
    <Link href="/sos" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      <div className="rounded-full bg-danger text-white px-6 py-3 shadow-soft flex items-center gap-2">
        <Siren className="size-5"/> <span className="font-semibold">SOS</span>
      </div>
    </Link>
  );
}
