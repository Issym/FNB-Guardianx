"use client";
import { useState } from "react";
import RiskBadge from "@/components/RiskBadge";

type Result = { verdict: string; score: number; reasons: string[]; advice: string[] };

export default function CheckPage() {
  const [input, setInput] = useState("");
  const [res, setRes] = useState<Result|null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setRes(null);
    const r = await fetch("/api/stranger/check", { method: "POST", body: JSON.stringify({ text: input }) });
    const data = await r.json();
    setRes(data);
    setLoading(false);
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Stranger Check</h1>
      <form onSubmit={onSubmit} className="card p-4 grid gap-3">
        <label className="label">Paste a profile link, phone, email, or chat text</label>
        <textarea className="input h-32" value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g. +27 82 123 4567, jane@example.com, instagram.com/someone, 'Don't tell anyone, meet me alone now...'" />
        <div className="flex justify-end">
          <button className="btn btn-primary" disabled={loading}>{loading? "Checking..." : "Get Verdict"}</button>
        </div>
      </form>

      {res && (
        <div className="card p-4 grid gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Risk Verdict</h2>
            <RiskBadge score={res.score} verdict={res.verdict}/>
          </div>
          <div>
            <h3 className="font-semibold">Top Reasons</h3>
            <ul className="list-disc pl-6 text-sm text-muted">
              {res.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">What to do now</h3>
            <ul className="list-disc pl-6 text-sm text-muted">
              {res.advice.map((a,i)=>(<li key={i}>{a}</li>))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
