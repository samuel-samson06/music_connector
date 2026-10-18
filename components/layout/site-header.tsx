import Link from "next/link";
import { MusicNote } from "@/components/landing_page/icons";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <MusicNote className="size-6" />
          <span className="text-lg font-semibold tracking-tight">
            Music Connector
          </span>
        </Link>
        <nav className=" hidden sm:flex items-center gap-1 sm:gap-3">
          <Link
            href="/login"
            className="grid min-h-11 place-items-center px-3 text-sm font-medium text-muted"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="grid h-10 place-items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
