import type { FC, SVGProps } from 'react';

interface Props {
  icon: FC<SVGProps<SVGSVGElement> & { size?: number; color?: string }>;
  platform: string;
  handle: string;
  url: string;
  iconColor: string;
}

export default function SocialCard({ icon: Icon, platform, handle, url, iconColor }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[240px] h-[180px] bg-white rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 no-underline transition-shadow hover:shadow-lg"
    >
      <Icon size={40} color={iconColor} />
      <p className="text-[18px] font-semibold text-primary">{platform}</p>
      <p className="text-[13px] text-text-light">{handle}</p>
    </a>
  );
}
