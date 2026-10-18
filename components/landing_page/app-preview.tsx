import { Comment, Heart, MusicNote, Search } from "@/components/landing_page/icons";
import { SongCard } from "@/components/landing_page/song-card";

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground/5 text-xs font-semibold text-muted">
      {initials}
    </div>
  );
}

function PostPreview({
  initials,
  name,
  handle,
  time,
  body,
  song,
  likes,
  comments,
}: {
  initials: string;
  name: string;
  handle: string;
  time: string;
  body: string;
  song: { title: string; artist: string };
  likes: number;
  comments: number;
}) {
  return (
    <div className="flex gap-3 px-4 py-4">
      <Avatar initials={initials} />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-baseline gap-1.5 text-sm">
          <span className="font-semibold text-foreground">{name}</span>
          <span className="truncate text-xs text-muted">
            @{handle} &middot; {time}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">{body}</p>
        <SongCard title={song.title} artist={song.artist} />
        <div className="flex items-center gap-6 text-muted">
          <span className="flex items-center gap-1.5 text-xs">
            <Heart className="size-4" />
            {likes}
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Comment className="size-4" />
            {comments}
          </span>
        </div>
      </div>
    </div>
  );
}

function FeedPreview({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-border bg-surface ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3.5">
        <span className="flex items-center gap-2 font-semibold text-foreground">
          <MusicNote className="size-4" />
          Music Connector
        </span>
        <Search className="size-4 text-muted" />
      </div>
      <div className="border-t border-border">
        <PostPreview
          initials="AO"
          name="Ada O."
          handle="ada"
          time="2h"
          body="The synth texture in this track feels like walking through empty city streets at 2 AM."
          song={{ title: "Midnight Drive", artist: "Nova Lane" }}
          likes={24}
          comments={5}
        />
      </div>
      <div className="border-t border-border">
        <PostPreview
          initials="TK"
          name="Tunde K."
          handle="tundek"
          time="4h"
          body="Found this tape reissue at the weekend market. The ungrounded room hum is pure gold."
          song={{ title: "Ghost Frequencies", artist: "Solara Club" }}
          likes={18}
          comments={3}
        />
      </div>
    </div>
  );
}

function SongOfWeekPreview({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-border bg-surface p-4 shadow-xl shadow-black/10 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
          Song of the Week
        </span>
        <span className="rounded-full border border-accent px-3 py-1 text-[11px] font-semibold text-accent">
          4-week streak
        </span>
      </div>
      <p className="mt-3 text-xs text-muted">Marked for the week by Ada O.</p>
      <SongCard title="Analog Drift" artist="Kiran Sounds" />
    </div>
  );
}

export function AppPreview() {
  return (
    <div className="relative w-full max-w-[440px] lg:max-w-[460px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden overflow-hidden rounded-3xl lg:block"
      >
        <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl" />
      </div>
      <div className="relative flex flex-col gap-4 lg:block lg:pt-6">
        <SongOfWeekPreview className="lg:absolute lg:-bottom-6 lg:-left-10 lg:z-10 lg:w-[320px]" />
        <FeedPreview className="lg:ml-auto lg:w-[370px]" />
      </div>
    </div>
  );
}
