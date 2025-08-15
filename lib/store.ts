type PanicPoint = { lat:number; lng:number; t:number; battery?:number };
type PanicSession = { id:string; active:boolean; points:PanicPoint[] };

type Incident = { id:string; lat:number; lng:number; t:number; severity:number };

type Store = {
  sessions: Map<string,PanicSession>;
  incidents: Incident[];
};

const g = globalThis as any;
if (!g.__GUARDIANX_STORE__) {
  g.__GUARDIANX_STORE__ = {
    sessions: new Map(),
    incidents: []
  } satisfies Store;

  // seed a few incidents (Johannesburg inner city)
  const now = Date.now();
  g.__GUARDIANX_STORE__.incidents.push(
    { id: "i1", lat: -26.205, lng: 28.049, t: now-3600_000, severity: 2 },
    { id: "i2", lat: -26.208, lng: 28.035, t: now-7200_000, severity: 3 },
    { id: "i3", lat: -26.198, lng: 28.055, t: now-1800_000, severity: 1 },
    { id: "i4", lat: -26.188, lng: 28.075, t: now-5400_000, severity: 2 },
  );
}

export default g.__GUARDIANX_STORE__ as Store;
