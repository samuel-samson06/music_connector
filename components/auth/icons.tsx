import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function GoogleG(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.35Z" />
      <path d="M12 22c2.7 0 4.96-.9 6.61-2.42l-3.23-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.08v2.58A10 10 0 0 0 12 22Z" />
      <path d="M6.41 13.92A6 6 0 0 1 6.1 12c0-.67.11-1.32.31-1.92V7.5H3.08A10 10 0 0 0 2 12c0 1.61.39 3.14 1.08 4.5l3.33-2.58Z" />
      <path d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.86-2.86A10 10 0 0 0 12 2 10 10 0 0 0 3.08 7.5l3.33 2.58C7.2 7.72 9.4 5.96 12 5.96Z" />
    </svg>
  );
}

export function Ellipsis(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

export function CheckCircle(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function Eye(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOff(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 4l16 16" />
      <path d="M9.9 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17.4 17.4 0 0 1-3.4 4.4" />
      <path d="M6.3 6.3A17.6 17.6 0 0 0 2 12s3.5 7 10 7a10.5 10.5 0 0 0 4.2-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}
