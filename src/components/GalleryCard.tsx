interface Props {
  bgColor: string;
  caption: string;
}

export default function GalleryCard({ bgColor, caption }: Props) {
  return (
    <article
      className="rounded-2xl shadow-md flex flex-col items-center justify-center gap-4 h-64 text-white"
      style={{ backgroundColor: bgColor }}
    >
      <span className="text-5xl">📸</span>
      <p className="text-base font-medium">{caption}</p>
    </article>
  );
}
