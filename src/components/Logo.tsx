// SaaSStreak brand mark — a ribbon "S" that resolves into an upward arrow,
// recreated as SVG (from the supplied logo artwork) so it stays crisp at
// any size and works as the header, footer, and favicon glyph.

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="saastreak-logo-gradient" x1="8" y1="10" x2="58" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <path
        d="M45 8L58 8L58 21"
        stroke="url(#saastreak-logo-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M56 10
           C 40 20, 30 8, 20 10
           C 10 12, 8 20, 16 24
           C 24 28, 34 22, 40 27
           C 47 32, 45 42, 34 46
           C 25 49, 16 46, 10 40"
        stroke="url(#saastreak-logo-gradient)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  size = 32,
  showTagline = false,
  className = "",
}: {
  size?: number;
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">
          SaaS
          <span
            className="italic"
            style={{
              background: "linear-gradient(90deg, #22d3ee, #14b8a6, #22c55e)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Streak
          </span>
        </span>
        {showTagline && (
          <span className="mt-0.5 text-[9px] font-semibold tracking-wide text-foreground-muted uppercase">
            Accelerating SaaS Growth
          </span>
        )}
      </span>
    </span>
  );
}
