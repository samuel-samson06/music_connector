import Link from "next/link";
import { AppPreview } from "@/components/landing_page/app-preview";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 lg:py-24">
          <div className="flex flex-col gap-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h1 className="max-w-[18ch] text-[40px] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-7xl lg:leading-[1.02]">
                Don&apos;t just play it. Say why it matters.
              </h1>
              <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-muted lg:text-xl">
                Post about the songs you love, pick one Song of the Week, and
                keep your streak going.
              </p>
              <div className="mt-8 flex flex-col gap-5 md:gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/signup"
                  className="grid h-14 place-items-center rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground"
                >
                  Create account
                </Link>
                <Link
                  href="/login"
                  className="grid h-14 place-items-center rounded-full px-8 text-base font-medium text-accent border border-accent sm:text-foreground"
                >
                  Log in
                </Link>
              </div>
            </div>
            <AppPreview />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
