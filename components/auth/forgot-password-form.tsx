"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle } from "@/components/auth/icons";

type Status = "idle" | "loading" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Enter the email address for your account.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("loading");
    // No auth backend is wired yet; this simulates the request round-trip.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="mt-8 flex flex-col items-center text-center">
        <div className="grid size-14 place-items-center rounded-full border border-border text-accent">
          <CheckCircle className="size-7" />
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">
          Check your email
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We sent password reset instructions to{" "}
          <span className="font-medium text-foreground">{email.trim()}</span>.
        </p>
        <Link
          href="/login"
          className="mt-6 grid h-14 w-full place-items-center rounded-full bg-accent text-base font-semibold text-accent-foreground"
        >
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "email-error" : undefined}
          className={`h-14 w-full rounded-2xl border bg-surface px-4 text-base text-foreground placeholder:text-muted focus:outline-none ${
            error
              ? "border-foreground/50 focus:border-foreground/70"
              : "border-border focus:border-accent"
          }`}
        />
        {error ? (
          <p id="email-error" className="mt-2 text-sm text-foreground">
            {error}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="grid h-14 w-full place-items-center rounded-full bg-accent text-base font-semibold text-accent-foreground disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send reset link"}
      </button>

      <p className="pt-2 text-center text-sm text-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-accent">
          Back to log in
        </Link>
      </p>
    </form>
  );
}
