export default function SettingsPage() {
  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="card p-4 grid gap-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Reduced Motion</div>
            <div className="text-sm text-muted">Respect system preference for motion.</div>
          </div>
          <input type="checkbox" checked readOnly className="opacity-60"/>
        </div>
      </div>
    </div>
  );
}
