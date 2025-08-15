"use client";

export default function RiskBadge({ score, verdict }: { score:number; verdict:string }) {
  let color = "bg-safe/20 text-safe";
  if (score >= 3 && score <= 6) color = "bg-caution/20 text-caution";
  if (score > 6) color = "bg-danger/20 text-danger";
  return <span className={`rounded-xl px-3 py-1 text-sm ${color}`}>{verdict} • {score.toFixed(1)}</span>;
}
