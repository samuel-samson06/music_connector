import type { ReactNode } from "react";
import Link from "next/link";
import { MusicNote } from "@/components/landing_page/icons";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="px-5 pt-8 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground"
        >
          <MusicNote className="size-6" />
          <span className="text-lg font-semibold tracking-tight">
            Music Connector
          </span>
        </Link>
      </header>
      <main className="flex flex-1 justify-center px-5 py-8 md:px-8">
        <div className="w-full max-w-[400px]">{children}</div>
      </main>
      <footer className="px-5 pb-8 md:px-8">
        <p className="text-center text-xs text-muted">
          By continuing you agree to the{" "}
          <Link href="/terms" className="text-foreground">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
