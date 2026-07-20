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
      className="w-60 h-45 bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 flex flex-col items-center justify-center gap-3 no-underline transition-shadow hover:shadow-lg dark:hover:shadow-black/30"
    >
      <Icon size={40} color={iconColor} />
      <p className="text-[18px] font-semibold text-primary dark:text-white">{platform}</p>
      <p className="text-[13px] text-text-light dark:text-slate-400">{handle}</p>
    </a>
  );
}
