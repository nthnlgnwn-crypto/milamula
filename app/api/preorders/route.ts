import { NextResponse } from "next/server";
import { validatePreorderPayload } from "@/lib/preorderValidation";
import { createSupabaseAnonClient } from "@/lib/supabase";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  const validation = validatePreorderPayload(payload, Date.now());
  if (!validation.ok) {
    return NextResponse.json({ message: validation.message }, { status: validation.status });
  }

  const supabase = createSupabaseAnonClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Preorder capture is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("milamula_preorders").insert(validation.preorder);

  if (error) {
    console.error("Milamula preorder insert failed", {
      code: error.code,
      message: error.message
    });

    return NextResponse.json(
      { message: "We could not save your interest yet. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
