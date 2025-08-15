export function nanoid(n=10) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let s = ""; for (let i=0;i<n;i++) s += chars[Math.floor(Math.random()*chars.length)];
  return s;
}

export function decayScore(ageMs: number, tauDays=7) {
  const tau = tauDays*24*60*60*1000;
  return Math.exp(-ageMs / tau);
}
