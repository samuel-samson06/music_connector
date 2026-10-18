import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-5 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="flex flex-wrap items-center gap-x-2 text-sm">
            <span className="font-semibold text-foreground">
              Music Connector
            </span>
            <span className="text-muted">&middot;</span>
            <span className="text-muted">Share the songs that move you.</span>
          </p>
          <p className="text-xs text-muted">&copy; 2026 Music Connector</p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
