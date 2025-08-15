"use client";
import Link from "next/link";
import { useState } from "react";
import Drawer from "@/components/Drawer";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between bg-bg/80 backdrop-blur border-b border-white/10 rounded-b-2xl">
        <Link href="/" className="font-semibold tracking-tight text-xl">GuardianX</Link>
        <button aria-label="Open menu" className="btn btn-ghost" onClick={()=>setOpen(true)}>
          <Menu className="size-5"/>
        </button>
      </div>
      <Drawer open={open} onClose={()=>setOpen(false)}/>
    </header>
  );
}
