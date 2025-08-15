"use client";
import Link from "next/link";
import {
  X,
  ShieldCheck,
  Map,
  HeartPulse,
  Mic,
  BellRing,
  Users,
  Settings,
  Info,
  MapPin
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function Drawer({ open, onClose }: Props) {
  return (
    <div className={`fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-[85%] sm:w-96 bg-surface border-l border-white/10 p-4 transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Main menu"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-4 grid gap-2">
          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/check">
            <ShieldCheck className="size-5" /> <span>Stranger Check</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/map">
            <Map className="size-5" /> <span>Map</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/safemode">
            <HeartPulse className="size-5" /> <span>Meet Safe Mode</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/safemode/nearby">
            <MapPin className="size-5" /> <span>Safe Mode Nearby</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/evidence">
            <Mic className="size-5" /> <span>Evidence</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/alerts">
            <BellRing className="size-5" /> <span>Alerts</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/contacts">
            <Users className="size-5" /> <span>Trusted Contacts</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/settings">
            <Settings className="size-5" /> <span>Settings</span>
          </Link>

          <Link onClick={onClose} className="card p-3 flex items-center gap-3 hover:bg-white/5" href="/about">
            <Info className="size-5" /> <span>Help & About</span>
          </Link>
        </nav>
      </aside>
    </div>
  );
}
