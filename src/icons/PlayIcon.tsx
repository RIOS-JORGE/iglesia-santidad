interface Props {
  size?: number;
  color?: string;
}

export default function PlayIcon({ size = 24, color = '#FFFFFF' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="6,3 20,12 6,21" fill={color} />
    </svg>
  );
}
