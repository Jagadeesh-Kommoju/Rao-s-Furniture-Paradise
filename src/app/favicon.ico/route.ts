import { NextResponse } from "next/server";

export const dynamic = "force-static";

const SVG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#141414"/><path d="M12 28L32 13L52 28" stroke="#F59E0B" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 31V42C19 43.6569 20.3431 45 22 45H42C43.6569 45 45 43.6569 45 42V31" stroke="#FFFFFF" stroke-width="3.75" stroke-linecap="round"/><path d="M16 38H48" stroke="#EA580C" stroke-width="4.5" stroke-linecap="round"/><path d="M23 45V51M41 45V51" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/></svg>`;

export function GET() {
  return new NextResponse(SVG_ICON, {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
  });
}
