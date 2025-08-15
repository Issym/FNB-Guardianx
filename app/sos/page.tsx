"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SOSPage() {
  const [session, setSession] = useState<string|undefined>();
  const [error, setError] = useState<string|undefined>();

  async function start() {
    try {
      const r = await fetch("/api/panic/start", { method: "POST" });
      const data = await r.json();
      setSession(data.sessionId);
    } catch (e:any) {
      setError(e?.message ?? "Failed to start SOS");
    }
  }

  useEffect(()=>{ start(); }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">SOS</h1>
      {!session && !error && <p className="text-muted">Starting SOS...</p>}
      {error && <p className="text-danger">{error}</p>}
      {session && (
        <div className="card p-4 grid gap-2">
          <p>Share your live tracking link:</p>
          <code className="text-xs break-all bg-black/40 rounded-xl p-3 border border-white/10">
            {`${location.origin}/track/${session}`}
          </code>
          <div className="flex gap-2">
            <a className="btn btn-primary" href={`https://wa.me/?text=${encodeURIComponent("I need help. Track me live: " + location.origin + "/track/" + session)}`} target="_blank">Share on WhatsApp</a>
            <a className="btn btn-ghost" href={`sms:?&body=${encodeURIComponent("I need help. Track me live: " + location.origin + "/track/" + session)}`}>Send SMS</a>
            <a className="btn btn-ghost" href="tel:10111">Call 10111</a>
          </div>
          <p className="text-sm text-muted">Leave this page open for live updates. End SOS when safe.</p>
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={async()=>{ await fetch("/api/panic/stop", { method:"POST", body: JSON.stringify({ id: session })}); location.href="/";}}>End SOS</button>
            <Link className="btn btn-ghost" href={`/track/${session}`}>Open Track Page</Link>
          </div>
        </div>
      )}
    </div>
  );
}
