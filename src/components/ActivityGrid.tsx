const schedule = [
  { day: 'Martes', activity: 'Oración', time: '19:00' },
  { day: 'Miércoles', activity: 'Reunión', time: '19:00' },
  { day: 'Jueves', activity: 'Oración', time: '19:00' },
  { day: 'Viernes', activity: 'Oración', time: '19:00' },
  { day: 'Sábado', activity: 'Reunión', time: '19:00' },
  { day: 'Domingo', activity: 'Reunión', time: '18:00' },
];

export default function ActivityGrid() {
  return (
    <section id="actividades" className="px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-primary dark:text-white text-center mb-8">
          Actividades Semanales
        </h2>
        <div className="divide-y divide-primary/10 dark:divide-white/10">
          {schedule.map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between py-3 px-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-primary dark:text-slate-300 w-24">
                  {item.day}
                </span>
                <span className="text-base text-dark dark:text-slate-200">
                  {item.activity}
                </span>
              </div>
              <span className="text-sm font-semibold text-accent">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
