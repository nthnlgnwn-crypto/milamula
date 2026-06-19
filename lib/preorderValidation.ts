import type { MilamulaPreorderInsert } from "@/lib/supabase";

export const kitInterest = "Mori and the Lost Moonlight" as const;
export const preorderSource = "talemori_website" as const;

const allowedChildAges = new Set(["3-4", "5-6", "7-8", "Mixed ages"]);
const maxNotesLength = 800;
const minSubmissionMs = 2500;

type ValidationSuccess = {
  ok: true;
  preorder: MilamulaPreorderInsert;
};

type ValidationFailure = {
  ok: false;
  message: string;
  status: number;
};

export type PreorderValidationResult = ValidationSuccess | ValidationFailure;

export function validatePreorderPayload(payload: unknown, receivedAtMs: number): PreorderValidationResult {
  if (!isRecord(payload)) {
    return validationError("Please check the form and try again.");
  }

  const honeypot = readString(payload, "website");
  if (honeypot) {
    return validationError("Please check the form and try again.");
  }

  const startedAtMs = Number(readString(payload, "started_at_ms"));
  if (!Number.isFinite(startedAtMs) || receivedAtMs - startedAtMs < minSubmissionMs) {
    return validationError("Please wait a moment, then try sending again.");
  }

  const parentName = readString(payload, "parent_name");
  if (!parentName) {
    return validationError("Please add your name so we know who to follow up with.");
  }

  if (parentName.length > 80) {
    return validationError("Please use a shorter parent name.");
  }

  const whatsapp = readString(payload, "whatsapp");
  if (!whatsapp) {
    return validationError("Please add a WhatsApp number so we can follow up.");
  }

  if (!isReasonableWhatsAppNumber(whatsapp)) {
    return validationError("Please use a valid WhatsApp number, such as +628123456789.");
  }

  const email = readString(payload, "email");
  if (email && !isReasonableEmail(email)) {
    return validationError("Please use a valid email address, or leave it empty.");
  }

  const childAge = readString(payload, "child_age");
  if (childAge && !allowedChildAges.has(childAge)) {
    return validationError("Please choose one of the available child age options.");
  }

  const notes = readString(payload, "notes");
  if (notes.length > maxNotesLength) {
    return validationError(`Please keep notes under ${maxNotesLength} characters.`);
  }

  return {
    ok: true,
    preorder: {
      parent_name: parentName,
      whatsapp,
      email: email || null,
      child_age: childAge || null,
      kit_interest: kitInterest,
      notes: notes || null,
      source: preorderSource
    }
  };
}

function validationError(message: string): ValidationFailure {
  return {
    ok: false,
    message,
    status: 400
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}

function isReasonableWhatsAppNumber(value: string): boolean {
  const allowedCharacters = /^\+?[0-9][0-9\s().-]*$/;
  const digits = value.replace(/\D/g, "");

  return allowedCharacters.test(value) && digits.length >= 8 && digits.length <= 15;
}

function isReasonableEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}
