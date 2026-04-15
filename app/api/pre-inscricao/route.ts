import { NextResponse } from "next/server";

const WEBHOOK_TIMEOUT_MS = 10000;

type PreInscricaoPayload = {
  empresa: string;
  nomecompleto: string;
  email: string;
  area: string;
};

function isValidPayload(body: unknown): body is PreInscricaoPayload {
  if (!body || typeof body !== "object") return false;
  const payload = body as Record<string, unknown>;
  return (
    typeof payload.empresa === "string" &&
    typeof payload.nomecompleto === "string" &&
    typeof payload.email === "string" &&
    typeof payload.area === "string"
  );
}

export async function POST(request: Request) {
  const preInscricaoUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL;

  if (!preInscricaoUrl) {
    return NextResponse.json({ error: "Integração de pré-inscrição não configurada." }, { status: 500 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const payload: PreInscricaoPayload = {
    empresa: body.empresa.trim(),
    nomecompleto: body.nomecompleto.trim(),
    email: body.email.trim(),
    area: body.area.trim(),
  };

  if (!payload.empresa || !payload.nomecompleto || !payload.email || !payload.area) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
    try {
      const response = await fetch(preInscricaoUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Falha ao enviar pré-inscrição." }, { status: 502 });
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    console.error("Falha no webhook de pré-inscrição:", error);
    return NextResponse.json({ error: "Falha ao enviar pré-inscrição." }, { status: 504 });
  }

  return NextResponse.json({ ok: true });
}
