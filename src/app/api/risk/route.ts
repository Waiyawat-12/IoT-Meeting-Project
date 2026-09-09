import { DISTRICTS } from "@/data/districtsData";
import { evaluateCity, summarizeCity } from "@/lib/floodEngine";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const rainChance = Number(request.nextUrl.searchParams.get("rainChance") ?? 42);
  const rainIntensity = Number(
    request.nextUrl.searchParams.get("rainIntensity") ?? 18,
  );

  if (!Number.isFinite(rainChance) || !Number.isFinite(rainIntensity)) {
    return NextResponse.json(
      { error: "rainChance and rainIntensity must be numbers" },
      { status: 400 },
    );
  }

  const districts = evaluateCity(DISTRICTS, { rainChance, rainIntensity });
  return NextResponse.json({
    weather: { rainChance, rainIntensity },
    summary: summarizeCity(districts),
    districts,
  });
}
