import { MusicNote, Play } from "@/components/landing_page/icons";

type SongCardProps = {
  title: string;
  artist: string;
};

export function SongCard({ title, artist }: SongCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-background/40 p-3">
      <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-foreground/5 text-muted">
        <MusicNote className="size-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        <p className="truncate text-xs text-muted">{artist}</p>
      </div>
      <button
        type="button"
        aria-label={`Play ${title} by ${artist}`}
        className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-foreground"
      >
        <Play className="size-4" />
      </button>
    </div>
  );
}
