interface Props {
  size?: number;
  color?: string;
}

export default function YoutubeIcon({ size = 24, color = '#1E3A5F' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="4" width="20" height="16" rx="4" stroke={color} strokeWidth="2" />
      <polygon points="10,8 16,12 10,16" fill={color} />
    </svg>
  );
}
