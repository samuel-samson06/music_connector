import Link from "next/link";
import { NotFoundGraphic } from "@/components/landing_page/not-found-graphic";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-5 py-16 md:px-8">
        <div className="flex w-full max-w-[560px] flex-col items-center text-center">
          <div
            role="img"
            aria-label="404"
            className="flex items-center justify-center gap-1 sm:gap-2"
          >
            <span className="text-8xl font-extrabold leading-none tracking-tight text-foreground sm:text-9xl">
              4
            </span>
            <NotFoundGraphic className="size-24 shrink-0 sm:size-28" />
            <span className="text-8xl font-extrabold leading-none tracking-tight text-foreground sm:text-9xl">
              4
            </span>
          </div>
          <h1 className="mt-8 text-[32px] font-extrabold leading-tight tracking-tight text-foreground sm:text-[40px]">
            This track doesn&apos;t exist.
          </h1>
          <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-muted sm:text-lg">
            Looks like the record skipped. The page you wanted isn&apos;t here.
          </p>
          <div className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/"
              className="grid h-14 w-full place-items-center rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground sm:w-auto"
            >
              Back to the feed
            </Link>
            <Link
              href="/"
              className="grid h-14 place-items-center px-6 text-base font-semibold text-foreground"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
