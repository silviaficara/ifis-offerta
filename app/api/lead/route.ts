import { NextResponse } from "next/server";

// Proxy server-side verso contract.kronos.tech/api/lead.php.
// Tiene il LEAD_WEBHOOK_TOKEN (Bearer) fuori dal bundle client.

const UPSTREAM =
  process.env.LEAD_WEBHOOK_URL ?? "http://localhost:8888/api/lead.php";
const TOKEN = process.env.LEAD_WEBHOOK_TOKEN ?? "";

export async function POST(req: Request) {
  if (!TOKEN) {
    return NextResponse.json(
      { ok: false, error: "missing_LEAD_WEBHOOK_TOKEN" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  try {
    const r = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = await r.text();
    return new NextResponse(text, {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: "upstream_unreachable",
        message: (e as Error).message,
      },
      { status: 502 }
    );
  }
}
