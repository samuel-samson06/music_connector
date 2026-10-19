import { Ellipsis } from "@/components/auth/icons";
import { SongCard } from "@/components/landing_page/song-card";

export function SignupPreview() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground/5 text-xs font-semibold text-muted">
          AO
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            Ada O.
          </p>
          <p className="text-xs uppercase tracking-wide text-muted">2h ago</p>
        </div>
        <Ellipsis className="size-5 shrink-0 text-muted" />
      </div>

      <p className="mt-4 text-base leading-relaxed text-foreground">
        This intro feels like walking home at 2am through empty streets.
      </p>

      <div className="mt-4">
        <SongCard title="Midnight Drive" artist="Nova Lane" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
          Song of the Week
        </span>
        <span className="rounded-full border border-accent px-3 py-1 text-[11px] font-semibold text-accent">
          4-week streak
        </span>
      </div>
    </div>
  );
}
