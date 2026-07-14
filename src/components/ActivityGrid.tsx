import ActivityCard from './ActivityCard.tsx';

const schedule = [
  { day: 'Lunes', activity: 'Grupo de Oración', time: '7 PM', desc: 'Oración y alabanza' },
  { day: 'Martes', activity: 'Estudio Bíblico', time: '7 PM', desc: 'Estudio de la Palabra' },
  { day: 'Miércoles', activity: 'Culto de Oración', time: '7 PM', desc: 'Oración intercesora' },
  { day: 'Jueves', activity: 'Ensayo Coral', time: '6 PM', desc: 'Coro y alabanza' },
  { day: 'Viernes', activity: 'Jóvenes en Acción', time: '7 PM', desc: 'Juventud y dinamismo' },
  { day: 'Sábado', activity: 'Visitas Evangelísticas', time: '9 AM', desc: 'Evangelismo y visitas' },
  { day: 'Domingo', activity: 'Culto Dominical', time: '10 AM', desc: 'Adoración y Palabra' },
];

export default function ActivityGrid() {
  return (
    <section id="actividades" className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Row 1 — first 4 cards */}
          {schedule.slice(0, 4).map((item) => (
            <ActivityCard key={item.day} {...item} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {/* Row 2 — last 3 cards */}
          {schedule.slice(4).map((item) => (
            <ActivityCard key={item.day} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
