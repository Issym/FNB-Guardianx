"use client";
import { useRef, useState } from "react";

function mse(a: ImageData, b: ImageData) {
  if (a.width !== b.width || a.height !== b.height) return 1e9;
  let err = 0;
  for (let i=0; i<a.data.length; i+=4) {
    const dr = a.data[i]-b.data[i];
    const dg = a.data[i+1]-b.data[i+1];
    const db = a.data[i+2]-b.data[i+2];
    err += dr*dr + dg*dg + db*db;
  }
  return err / (a.width * a.height);
}

export default function VerifyPage() {
  const [status,setStatus] = useState<string|undefined>();
  const c1 = useRef<HTMLCanvasElement>(null);
  const c2 = useRef<HTMLCanvasElement>(null);
  const [selfie, setSelfie] = useState<string|undefined>();
  const [sent, setSent] = useState<string|undefined>();

  async function compare() {
    if (!c1.current || !c2.current) return;
    const ctx1 = c1.current.getContext("2d")!;
    const ctx2 = c2.current.getContext("2d")!;
    const a = ctx1.getImageData(0,0,128,128);
    const b = ctx2.getImageData(0,0,128,128);
    const v = mse(a,b);
    // crude threshold; demo only
    const passed = v < 2500;
    setStatus(passed ? "passed" : "inconclusive");
  }

  function drawToCanvas(file: File, canvas: HTMLCanvasElement) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d")!;
      canvas.width = 128; canvas.height = 128;
      ctx.drawImage(img, 0,0,128,128);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Verify Me (Demo)</h1>
      <p className="text-sm text-muted">Upload the selfie (liveness) and the same photo the person sent you. This demo runs a crude on-device similarity check — not production accuracy.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-4 grid gap-2">
          <label className="label">Selfie / Liveness</label>
          <input type="file" accept="image/*" onChange={e=>{
            const f=e.target.files?.[0]; if(!f||!c1.current) return; drawToCanvas(f, c1.current); setSelfie(URL.createObjectURL(f));
          }}/>
          <canvas ref={c1} className="rounded-xl border border-white/10"/>
        </div>
        <div className="card p-4 grid gap-2">
          <label className="label">Photo they sent</label>
          <input type="file" accept="image/*" onChange={e=>{
            const f=e.target.files?.[0]; if(!f||!c2.current) return; drawToCanvas(f, c2.current); setSent(URL.createObjectURL(f));
          }}/>
          <canvas ref={c2} className="rounded-xl border border-white/10"/>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="btn btn-primary" onClick={compare}>Compare</button>
        {status && <span className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">{status === "passed" ? "Match (demo)" : "Inconclusive (demo)"}</span>}
      </div>
    </div>
  );
}
