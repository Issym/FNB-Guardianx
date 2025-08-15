"use client";
import { useEffect, useRef, useState } from "react";

export default function SafeMode() {
  const [active, setActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(20 * 60); // 20 min
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const watchId = useRef<number | null>(null);

  function start() {
    if (active) return;
    setActive(true);
    setSecondsLeft(20 * 60);
    setLastPrompt(null);

    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { accuracy } = pos.coords;
          if (accuracy > 100 && !lastPrompt) {
            setLastPrompt("GPS is weak. Are you safe?");
          }
        },
        () => setLastPrompt("Location off/denied. Stay in public, share your plan."),
        { enableHighAccuracy: true, maximumAge: 10_000, timeout: 10_000 }
      );
    }

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setLastPrompt("Missed check-in. Share your location with a trusted contact.");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function iAmSafe() {
    setActive(false);
    setLastPrompt(null);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (watchId.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }

  function covertExit() {
    const html = `
      <html><head><title>Calculator</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <style>body{font-family:system-ui,Segoe UI,Arial;padding:20px}input{font-size:24px;width:100%;padding:10px}</style>
      </head><body>
      <input id="calc" placeholder="0" autofocus oninput="try{this.value=eval(this.value)}catch(e){}"/>
      </body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    window.location.href = url;
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (watchId.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const mm = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Meet Safe Mode</h1>
      <p className="text-sm text-muted">
        Start a timed check-in before a date/meeting. If you miss the timer, you’ll get a prompt to share your location and SOS.
      </p>

      {lastPrompt && (
        <div className="card p-4 border-amber-500/30">
          <div className="font-medium">Heads up</div>
          <div className="text-sm text-muted mt-1">{lastPrompt}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <a className="btn btn-primary" href="/sos">Open SOS</a>
            <a className="btn btn-ghost" href="tel:10111">Call 10111</a>
            <a
              className="btn btn-ghost"
              href={`https://wa.me/?text=${encodeURIComponent("Check on me please. " + location.origin + "/sos")}`}
              target="_blank"
            >
              WhatsApp Contact
            </a>
          </div>
        </div>
      )}

      <div className="card p-4 grid gap-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Check-in Timer</div>
            <div className="text-sm text-muted">Default 20 minutes</div>
          </div>
          <div className="text-3xl font-mono">{mm}:{ss}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {!active ? (
            <button className="btn btn-primary" onClick={start}>Start</button>
          ) : (
            <button className="btn btn-ghost" onClick={iAmSafe}>I’m Safe (Stop)</button>
          )}
          <button className="btn btn-ghost" onClick={covertExit}>Covert Exit</button>
          <a className="btn btn-ghost" href="/sos">Open SOS</a>
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold">Safer venue tips</div>
        <ul className="list-disc pl-6 text-sm text-muted mt-2">
          <li>Pick busy, staffed venues with CCTV.</li>
          <li>Sit near exits; tell a friend and share your live track link.</li>
          <li>Avoid isolated locations; keep your battery above 20%.</li>
        </ul>
      </div>
    </div>
  );
}
