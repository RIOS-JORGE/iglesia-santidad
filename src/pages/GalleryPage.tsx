import GalleryCard from '../components/GalleryCard.tsx';

const galleryItems = [
  { bgColor: '#3B82F6', caption: 'Culto Dominical' },
  { bgColor: '#10B981', caption: 'Jóvenes en Acción' },
  { bgColor: '#F59E0B', caption: 'Campamento Juvenil' },
  { bgColor: '#EF4444', caption: 'Navidad en la Iglesia' },
  { bgColor: '#8B5CF6', caption: 'Bautizos' },
  { bgColor: '#EC4899', caption: 'Concierto de Alabanza' },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-primary h-50 flex items-center justify-center">
        <h1 className="text-white text-[40px] font-bold">Galería</h1>
      </section>
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <GalleryCard key={item.caption} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}
