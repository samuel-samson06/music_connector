import type { SVGProps } from "react";

export function NotFoundGraphic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      <circle
        cx="50"
        cy="52"
        r="44"
        fill="var(--surface)"
        stroke="var(--border)"
      />
      <g stroke="var(--border)" strokeWidth="1.5" opacity="0.8">
        <circle cx="50" cy="52" r="35" />
        <circle cx="50" cy="52" r="27" />
        <circle cx="50" cy="52" r="19" />
      </g>

      <path
        d="M18 16 50 52"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="14"
        r="7"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <circle cx="16" cy="14" r="2" fill="var(--accent)" />

      <circle cx="50" cy="52" r="12" fill="var(--accent)" />
      <path d="M46 46.5v11l9-5.5-9-5.5Z" fill="var(--accent-foreground)" />
      <circle cx="50" cy="52" r="1.6" fill="var(--background)" />
    </svg>
  );
}
