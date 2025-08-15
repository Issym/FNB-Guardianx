"use client";
import { useEffect, useMemo, useState } from "react";

type SafeSpot = { name: string; type: string; lat: number; lng: number; open24h: boolean };

// Sample dataset (add your local trusted spots here)
const SAFE_SPOTS: SafeSpot[] = [
  { name: "Johannesburg Central SAPS", type: "Police Station", lat: -26.2058, lng: 28.0341, open24h: true },
  { name: "SAPS Hillbrow", type: "Police Station", lat: -26.194, lng: 28.0569, open24h: true },
  { name: "Sandton SAPS", type: "Police Station", lat: -26.1075, lng: 28.0563, open24h: true },
  { name: "Hillbrow Clinic (24/7)", type: "Clinic", lat: -26.1869, lng: 28.0469, open24h: true },
  { name: "Netcare Milpark Hospital", type: "Hospital", lat: -26.1789, lng: 28.0189, open24h: true },
  { name: "BP Garage Jan Smuts (24/7)", type: "Petrol Station", lat: -26.1408, lng: 28.0342, open24h: true },
  { name: "Engen Parktown North", type: "Petrol Station", lat: -26.1327, lng: 28.0354, open24h: true },
  { name: "Rosebank Mall (Security Desk)", type: "Mall", lat: -26.1455, lng: 28.0410, open24h: false }
];

// Haversine distance in km
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sa = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(sa));
}

export default function SafeModeNearby() {
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [only24, setOnly24] = useState(true);

  async function useMyLocation() {
    setErr(null);
    if (!navigator.geolocation) {
      setErr("Location not available on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setErr("Location denied or unavailable. Turn on GPS and try again."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );
  }

  const results = useMemo(() => {
    const base = only24 ? SAFE_SPOTS.filter(s => s.open24h) : SAFE_SPOTS;
    if (!pos) return base.map(s => ({ spot: s, km: NaN })).slice(0, 8);
    return base
      .map(s => ({ spot: s, km: distanceKm(pos, { lat: s.lat, lng: s.lng }) }))
      .sort((a, b) => a.km - b.km)
      .slice(0, 10);
  }, [pos, only24]);

  useEffect(() => {
    // Ask once automatically on first visit
    useMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Safe Mode Nearby</h1>
      <p className="text-sm text-muted">
        Find nearby staffed places (police, clinics, 24/7 petrol) where you can get help fast.
      </p>

      <div className="card p-4 grid gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary" onClick={useMyLocation}>Use my location</button>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-primary"
              checked={only24}
              onChange={e => setOnly24(e.target.checked)}
            />
            Show 24/7 only
          </label>
          <a className="btn btn-ghost" href="/safemode">Back to Safe Mode</a>
          <a className="btn btn-ghost" href="/sos">Open SOS</a>
          <a className="btn btn-ghost" href="tel:10111">Call 10111</a>
        </div>
        {err && <div className="text-danger text-sm">{err}</div>}
      </div>

      <div className="grid gap-3">
        {results.map(({ spot, km }) => (
          <div key={spot.name} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{spot.name}</div>
              <div className="text-sm text-muted">{spot.type}{spot.open24h ? " • 24/7" : ""}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                {Number.isFinite(km) ? `${km.toFixed(2)} km` : "—"}
              </div>
              <a
                className="btn btn-ghost"
                target="_blank"
                href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}
              >
                Navigate
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted">
        Data is a small sample for demo. Add your trusted safe spots later (DB or config) for your area.
      </p>
    </div>
  );
}
