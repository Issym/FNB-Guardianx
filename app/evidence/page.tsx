"use client";
import { useEffect, useRef, useState } from "react";

async function encryptData(data: Blob, passphrase: string): Promise<Blob> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey("raw", await crypto.subtle.digest("SHA-256", new TextEncoder().encode(passphrase)), "AES-GCM", false, ["encrypt"]);
  const buf = await data.arrayBuffer();
  const enc = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, buf);
  const out = new Blob([iv, new Uint8Array(enc)], { type: "application/octet-stream" });
  return out;
}

export default function Evidence() {
  const [rec, setRec] = useState<MediaRecorder|null>(null);
  const chunks = useRef<Blob[]>([]);
  const [status, setStatus] = useState("idle");
  const [encrypted, setEncrypted] = useState<Blob|null>(null);
  const [pass, setPass] = useState("guardianx");
  const [seconds, setSeconds] = useState(10);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const r = new MediaRecorder(stream);
    chunks.current = [];
    r.ondataavailable = (e)=>{ if(e.data.size) chunks.current.push(e.data); };
    r.onstop = async ()=>{
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const enc = await encryptData(blob, pass);
      setEncrypted(enc);
      setStatus("encrypted");
    };
    r.start();
    setRec(r); setStatus("recording");
    setTimeout(()=>{ r.stop(); }, seconds*1000);
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Evidence Locker (Demo)</h1>
      <p className="text-sm text-muted">Records a short audio clip, then encrypts it locally. You can export the encrypted blob file.</p>
      <div className="card p-4 grid gap-3">
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="label">Passphrase</label>
            <input className="input" value={pass} onChange={e=>setPass(e.target.value)} />
          </div>
          <div>
            <label className="label">Duration (seconds)</label>
            <input className="input" type="number" value={seconds} onChange={e=>setSeconds(parseInt(e.target.value||'10',10))}/>
          </div>
          <div className="flex items-end">
            <button className="btn btn-primary w-full" onClick={start} disabled={status==="recording"}>{status==="recording" ? "Recording..." : "Record & Encrypt"}</button>
          </div>
        </div>
        {encrypted && (
          <div className="text-sm">
            <p>Encrypted size: {(encrypted.size/1024).toFixed(1)} KB</p>
            <a
              className="btn btn-ghost mt-2"
              download={"evidence.enc"}
              href={URL.createObjectURL(encrypted)}
            >Download Encrypted File</a>
          </div>
        )}
      </div>
    </div>
  );
}
