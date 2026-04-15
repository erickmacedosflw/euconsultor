import { NextResponse } from "next/server";

const PRE_INSCRICAO_URL = "https://1f54c71f0e2ee9afa25db153e31b08.e2.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/f11f097ae642427cbd50f8f2c7365d66/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qotm0YLKhpZ9ETblL9uzQhC7BETywQ4HYnn-tSPq_E0";

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
    const response = await fetch(PRE_INSCRICAO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Falha ao enviar pré-inscrição." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Falha ao enviar pré-inscrição." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
