"use client";

import { FormEvent, useState } from "react";
import { kitInterest } from "@/lib/preorderValidation";

const notesMaxLength = 800;

type FormStatus =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const initialStatus: FormStatus = {
  kind: "idle",
  message:
    "Join the early list and TaleMori will follow up by WhatsApp or email. No payment is charged today."
};

export function PreorderForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startedAtMs] = useState(() => Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const parentName = String(formData.get("parent_name") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const childAge = String(formData.get("child_age") || "").trim();
    const notes = String(formData.get("notes") || "").trim();
    const website = String(formData.get("website") || "").trim();
    const startedAtMs = String(formData.get("started_at_ms") || "");

    if (!parentName || !whatsapp) {
      setStatus({
        kind: "error",
        message: "Please add your name and WhatsApp number so we know how to follow up."
      });
      return;
    }

    if (notes.length > notesMaxLength) {
      setStatus({
        kind: "error",
        message: `Please keep notes under ${notesMaxLength} characters.`
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ kind: "idle", message: "Sending your TaleMori early-list request..." });

    let response: Response;
    let result: { message?: string } | null;

    try {
      response = await fetch("/api/preorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          parent_name: parentName,
          whatsapp,
          email,
          child_age: childAge,
          notes,
          website,
          started_at_ms: startedAtMs
        })
      });

      result = (await response.json().catch(() => null)) as { message?: string } | null;
    } catch {
      setIsSubmitting(false);
      setStatus({
        kind: "error",
        message: "We could not send your interest yet. Please check your connection and try again."
      });
      return;
    }

    setIsSubmitting(false);

    if (!response.ok) {
      setStatus({
        kind: "error",
        message: result?.message || "We could not send your interest yet. Please try again in a moment."
      });
      return;
    }

    form.reset();
    setStatus({
      kind: "success",
      message:
        "Thank you. Your interest was received. TaleMori will follow up by WhatsApp or email when the pilot kit is ready, with details, price, and format before you decide. No payment has been charged."
    });
  }

  return (
    <form className="interest-form" onSubmit={handleSubmit}>
      <input name="kit_interest" type="hidden" value={kitInterest} />
      <input name="started_at_ms" type="hidden" value={startedAtMs} />
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} type="text" autoComplete="off" />
      </label>
      <label>
        Parent name
        <input name="parent_name" type="text" placeholder="Your name" required />
      </label>
      <label>
        WhatsApp number
        <input name="whatsapp" type="tel" placeholder="+62..." required />
      </label>
      <label>
        Email optional
        <input name="email" type="email" placeholder="you@example.com" />
      </label>
      <label>
        Child age optional
        <select name="child_age" defaultValue="">
          <option value="">Choose if helpful</option>
          <option value="3-4">3-4</option>
          <option value="5-6">5-6</option>
          <option value="7-8">7-8</option>
          <option value="Mixed ages">Mixed ages</option>
        </select>
      </label>
      <label className="full">
        Notes optional
        <textarea
          name="notes"
          maxLength={notesMaxLength}
          placeholder="What would make a story activity kit useful for your family?"
        />
      </label>
      <p className={`form-status ${status.kind}`} role={status.kind === "error" ? "alert" : "status"}>
        {status.message}
      </p>
      <button className="button primary full-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Join the first adventure list"}
      </button>
    </form>
  );
}
