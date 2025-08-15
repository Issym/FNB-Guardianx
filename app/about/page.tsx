export const dynamic = "force-static";
export default function About() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>About GuardianX</h1>
      <p><strong>Status:</strong> This app is <em>under active development</em>. Core features are stubbed for demo and will evolve to a production-grade build.</p>
      <p>
        GuardianX is a crime-first safety companion designed to help you screen strangers before meeting, avoid dangerous places, and get help fast.
        It uses a mobile-first, privacy-respecting approach with clear guidance and control in your hands.
      </p>
      <h2>Design Language</h2>
      <ul>
        <li>Dark slate background for eye comfort in night use</li>
        <li>Indigo primary for actions, Emerald (safe), Amber (caution), Rose (danger)</li>
        <li>Rounded 16–20 px corners, soft shadows, strong focus states</li>
      </ul>
      <h2>Privacy</h2>
      <p>No public watchlists. Client-first evidence locker. Clear consent flows.</p>
    </div>
  );
}
