/**
 * Sample firmware-side risk helper (mirrors lib/floodEngine.ts).
 * Keep this in sync with the dashboard heuristic if you port the formula to ESP32.
 */
export function edgeRisk(rainChance: number, rainMmHr: number, vulnerability: number) {
  return Math.min(
    100,
    Math.round(
      rainChance * 0.35 + (rainMmHr / 120) * 100 * 0.45 + vulnerability * 0.2,
    ),
  );
}
