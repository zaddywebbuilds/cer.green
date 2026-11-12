/**
 * A minimal line mark per partner organisation.
 *
 * These are NOT logos and must never be mistaken for them: each one depicts the
 * field the collaboration sits in, drawn on a shared 24px grid with a single
 * stroke weight so the thirteen read as one family. Partner logos require that
 * partner's written approval and a licensed asset, so until CER supplies those,
 * a neutral mark plus the organisation's name in type is the honest treatment.
 *
 * Purely decorative: every card states the organisation's name in text beside
 * the mark, so the SVG itself is hidden from assistive technology.
 */

const PATHS: Record<string, React.ReactNode> = {
  // Compliance, certification, standards
  'TÜV SÜD Singapore': (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9.4 9 1.8 1.8L15 7" />
      <path d="M8.4 14.4 7 22l5-2.6L17 22l-1.4-7.6" />
    </>
  ),
  // Assurance, inspection, technical certification
  'TÜV NORD': (
    <>
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h6" />
      <path d="M14 3l4 4v3" />
      <path d="M8 8h4M8 12h3" />
      <circle cx="16.5" cy="16.5" r="3.5" />
      <path d="m19.2 19.2 2.3 2.3" />
    </>
  ),
  // Engineering, precision, industrial technology
  SPETA: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
    </>
  ),
  // Strategy, implementation, business collaboration
  'SW Group': (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="m14.4 9.6 5.4-5.4" />
      <path d="M17.2 4.2h2.6v2.6" />
    </>
  ),
  // Sustainable finance, banking, green investment
  'BSM Bank Indonesia': (
    <>
      <path d="M3.5 10 12 5.2 20.5 10" />
      <path d="M6 10.6v7M10 10.6v7M14 10.6v7M18 10.6v7" />
      <path d="M3.5 20.5h17" />
      <path d="M12 5.2c0-1.6 1.3-2.7 2.9-2.7-.2 1.7-1.3 2.7-2.9 2.7Z" />
    </>
  ),
  // Cybersecurity, digital assurance, technology
  softScheck: (
    <>
      <path d="M12 3 5.2 5.9v5.4c0 4.2 2.8 7.5 6.8 9.3 4-1.8 6.8-5.1 6.8-9.3V5.9L12 3Z" />
      <path d="m9.6 12.2 1.7 1.7 3.5-3.6" />
    </>
  ),
  // Consulting, innovation, collaboration
  Merandi: (
    <>
      <path d="M12 3a6 6 0 0 0-3.4 10.9c.5.4.8 1 .8 1.6v.4h5.2v-.4c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
      <path d="M9.6 18.6h4.8" />
      <path d="M10.6 21.2h2.8" />
    </>
  ),
  // University, research, education, sustainability
  "King Mongkut's University of Technology Thonburi (KMUTT)": (
    <>
      <path d="M12 4 2.5 8.6 12 13.2l9.5-4.6L12 4Z" />
      <path d="M6.2 10.8v4.4c0 1.7 2.6 3 5.8 3s5.8-1.3 5.8-3v-4.4" />
      <path d="M21.5 8.6v5.2" />
    </>
  ),
  // Executive learning, professional development
  'Aventis Singapore': (
    <>
      <circle cx="9" cy="7.2" r="3.2" />
      <path d="M3.2 19.4a5.8 5.8 0 0 1 11.6 0" />
      <path d="m16.4 11.4 2.4-2.4 2.4 2.4" />
      <path d="M18.8 9.4v8.4" />
    </>
  ),
  // Education, qualifications, learning
  'NCC Education': (
    <>
      <path d="M3 5.6s2.4-1.4 4.4-1.4S12 6.1 12 6.1s2-1.9 4.6-1.9S21 5.6 21 5.6v13.2s-2.4-1.4-4.4-1.4-4.6 1.9-4.6 1.9-2-1.9-4.6-1.9S3 18.8 3 18.8V5.6Z" />
      <path d="M12 6.1v12.7" />
    </>
  ),
  // Training, leadership, organisational development
  Momenta: (
    <>
      <circle cx="9.2" cy="7.6" r="3.2" />
      <path d="M3.2 19.6a6 6 0 0 1 12 0" />
      <path d="M16.2 5.2a3.2 3.2 0 0 1 0 5.6" />
      <path d="M17.6 19.6a6 6 0 0 0-1.8-4.3" />
    </>
  ),
  // Renewable energy, decarbonisation, clean technology
  'Verde Kinetics': (
    <>
      <circle cx="12" cy="9" r="1.4" />
      <path d="M12 7.6V2.6M13.2 9.7l4.3 2.5M10.8 9.7l-4.3 2.5" />
      <path d="M12 10.4V21" />
      <path d="M9.4 21h5.2" />
    </>
  ),
  // Technology, data, digital transformation
  'Cygnus Technology Asia': (
    <>
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <circle cx="12" cy="17.4" r="2.2" />
      <path d="M8.2 7h7.6M7.6 8.9l3 6.6M16.4 8.9l-3 6.6" />
    </>
  ),
};

export function PartnerIcon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const paths = PATHS[name];
  if (!paths) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths}
    </svg>
  );
}
