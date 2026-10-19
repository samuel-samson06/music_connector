"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, GoogleG } from "@/components/auth/icons";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-8">
      <button
        type="button"
        className="grid h-14 w-full place-items-center rounded-full border border-border text-base font-semibold text-foreground"
      >
        <span className="flex items-center gap-3">
          <GoogleG className="size-5" />
          Continue with Google
        </span>
      </button>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          OR
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
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
            className="h-14 w-full rounded-2xl border border-border bg-surface px-4 text-base text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-14 w-full rounded-2xl border border-border bg-surface px-4 pr-12 text-base text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-muted"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-accent"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="grid h-14 w-full place-items-center rounded-full bg-accent text-base font-semibold text-accent-foreground"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="font-medium text-accent">
          Create an account
        </Link>
      </p>
    </div>
  );
}
