"use client";

import type { Route } from "next";
import Link from "next/link";
import { ShieldCheck, Map, Siren, Camera, BellRing } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const tiles: { href: Route; icon: any; title: string; desc: string }[] = [
    {
      href: "/check",
      icon: ShieldCheck,
      title: "Stranger Check",
      desc: "Paste a link, phone, email, or chat — get a risk verdict.",
    },
    {
      href: "/map",
      icon: Map,
      title: "Unsafe Map",
      desc: "Heatmap with time-decay. Safer routes & safe spots.",
    },
    {
      href: "/verify",
      icon: Camera,
      title: "Verify Me",
      desc: "Consent-based photo match. No templates stored.",
    },
    {
      href: "/alerts",
      icon: BellRing,
      title: "Community Alerts",
      desc: "Opt-in radius alerts for SOS & clustered incidents.",
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          GuardianX
        </motion.h1>
        <p className="mt-3 text-muted">
          Screen strangers. Avoid hotspots. Get help fast. Privacy-first.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link className="btn btn-primary" href={"/sos" as Route}>
            Start SOS
          </Link>
          <Link className="btn btn-ghost" href={"/about" as Route}>
            About
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tiles.map(({ href, icon: Icon, title, desc }) => (
          <Link key={href} href={href} className="card p-5 hover:translate-y-[-2px] transition">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/5 p-2">
                <Icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted">{desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
