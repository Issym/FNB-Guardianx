import { NextResponse } from "next/server";

const phishingWords = [
  "urgent","now","immediately","secret","private",
  "gift","lottery","investment","bitcoin","forex","sugar","allowance"
];

export async function POST(req: Request) {
  const { text = "" } = await req.json().catch(()=>({text:""}));
  const reasons: string[] = [];

  // Simple heuristics (demo only)
  const hasLink = /(https?:\/\/|www\.|instagram\.com|facebook\.com|t\.me|wa\.me)/i.test(text);
  if (hasLink) reasons.push("Contains external link/handle");

  const hasPhone = /(\+?\d{2,3}[ -]?)?\d{2}[ -]?\d{3}[ -]?\d{4}/.test(text);
  if (hasPhone) reasons.push("Phone number detected");

  const hasEmail = /[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/.test(text);
  if (hasEmail) reasons.push("Email address detected");

  const wordHits = phishingWords.filter(w=> new RegExp(`\\b${w}\\b`, "i").test(text));
  if (wordHits.length) reasons.push("Manipulation/pressure language: " + wordHits.join(", "));

  const secrecy = /don't tell|keep.*secret|alone|no one can know/i.test(text);
  if (secrecy) reasons.push("Secrecy or isolation cues");

  // scoring
  let score = 0;
  if (hasLink) score += 2.5;
  if (hasPhone || hasEmail) score += 1;
  score += wordHits.length * 0.8;
  if (secrecy) score += 2;

  let verdict = "CLEAR";
  if (score >= 3 && score <= 6) verdict = "CAUTION";
  if (score > 6) verdict = "HIGH";

  const advice = [
    "Insist on a public, staffed venue; bring a friend.",
    "Share live tracking with a trusted contact.",
    "Do not send money, IDs, or private photos.",
  ];

  return NextResponse.json({ verdict, score, reasons: reasons.slice(0,3), advice });
}
