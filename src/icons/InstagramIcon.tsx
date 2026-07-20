interface Props {
  size?: number;
  color?: string;
}

export default function InstagramIcon({ size = 24,   color = 'currentColor' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill={color} />
    </svg>
  );
}
