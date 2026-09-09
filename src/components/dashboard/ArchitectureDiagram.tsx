export function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 1100 640"
      role="img"
      aria-label="Bangkok flood system architecture from sensors to dashboard"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="panel" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#123047" />
          <stop offset="100%" stopColor="#0b1a2b" />
        </linearGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#67e8f9" />
        </marker>
      </defs>
      <rect width="1100" height="640" rx="24" fill="#07111c" />
      <text x="40" y="48" fill="#67e8f9" fontSize="14" letterSpacing="3">
        BANGKOK SMART FLOOD  ·  DATA PLANE
      </text>
      <text x="40" y="82" fill="#f8fafc" fontSize="28" fontWeight="700">
        Sensing → Edge → Cloud → Decision → Actuation
      </text>

      <Box x={40} y={120} title="Sensing" lines={["Rain gauge", "Ultrasonic level", "Pump current", "GPS / district ID"]} />
      <Box x={300} y={120} title="ESP32 Edge" lines={["Offline-first rules", "Local pump relay", "MQTT publish", "Self-diagnostic"]} />
      <Box x={560} y={120} title="Cloud ingest" lines={["Mosquitto / MQTT", "TimescaleDB", "Weather API", "GeoJSON districts"]} />
      <Box x={820} y={120} title="Flood engine" lines={["Rain chance 35%", "Intensity 45%", "Vulnerability 20%", "RiskScore 0–100"]} />

      <Arrow x1={248} x2={292} y={210} />
      <Arrow x1={508} x2={552} y={210} />
      <Arrow x1={768} x2={812} y={210} />

      <Box x={40} y={360} w={500} title="Actuation & alerts" lines={["Drainage pump relays", "Traffic / underpass gates", "LINE · SMS · Dashboard", "District war-room tickets"]} />
      <Box x={560} y={360} w={500} title="Operator dashboard" lines={["Leaflet 50-district heat map", "Simulation sliders & presets", "AI recommendations", "Pump health by khet"]} />

      <Arrow x1={300} y1={328} x2={180} y2={360} />
      <Arrow x1={900} y1={328} x2={780} y2={360} />

      <text x={40} y={560} fill="#94a3b8" fontSize="13">
        Prototype today: browser simulation + mock telemetry. Production path: ESP32 stations per pump house, MQTT, PostGIS.
      </text>
      <text x={40} y={588} fill="#64748b" fontSize="12">
        Feedback loop: pump runtime and canal gauges update vulnerability priors for the next rain event.
      </text>
    </svg>
  );
}

function Box({
  x,
  y,
  w = 208,
  title,
  lines,
}: {
  x: number;
  y: number;
  w?: number;
  title: string;
  lines: string[];
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={188} rx="18" fill="url(#panel)" stroke="#22d3ee55" />
      <text x={x + 18} y={y + 36} fill="#67e8f9" fontSize="16" fontWeight="700">
        {title}
      </text>
      {lines.map((line, index) => (
        <text key={line} x={x + 18} y={y + 68 + index * 26} fill="#e2e8f0" fontSize="14">
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  x1,
  x2,
  y,
  y1,
  y2,
}: {
  x1: number;
  x2?: number;
  y?: number;
  y1?: number;
  y2?: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1 ?? y}
      x2={x2 ?? x1}
      y2={y2 ?? y}
      stroke="#67e8f9"
      strokeWidth="2.5"
      markerEnd="url(#arrow)"
    />
  );
}
