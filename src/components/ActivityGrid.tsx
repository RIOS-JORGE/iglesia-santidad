import FacebookIcon from '../icons/FacebookIcon.tsx';
import YoutubeIcon from '../icons/YoutubeIcon.tsx';

type ScheduleItem = {
  day: string;
  activity: string;
  time: string;
  online?: boolean;
};

const YOUTUBE_URL = 'https://www.youtube.com/@santidadajehovahAR';
const FACEBOOK_URL = 'https://www.facebook.com/santidadajehovah';

const schedule: ScheduleItem[] = [
  { day: 'Lunes', activity: 'La Final Trompeta (online)', time: '20:00', online: true },
  { day: 'Martes', activity: 'Oración', time: '19:00' },
  { day: 'Miércoles', activity: 'Reunión', time: '19:00' },
  { day: 'Jueves', activity: 'Oración', time: '19:00' },
  { day: 'Viernes', activity: 'Oración', time: '19:00' },
  { day: 'Viernes', activity: 'Vigilia (online)', time: '23:00', online: true },
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
              key={`${item.day}-${item.activity}`}
              className="flex items-center justify-between py-3 px-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-primary dark:text-slate-300 w-24">
                  {item.day}
                </span>
                <span className="flex items-center gap-2 text-base text-dark dark:text-slate-200">
                  {item.activity}
                  {item.online && (
                    <span className="flex shrink-0 items-center gap-1.5">
                      <a
                        href={YOUTUBE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.activity} en YouTube`}
                        className="opacity-70 transition-opacity hover:opacity-100"
                      >
                        <YoutubeIcon size={15} color="#FF0000" />
                      </a>
                      <a
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.activity} en Facebook`}
                        className="opacity-70 transition-opacity hover:opacity-100"
                      >
                        <FacebookIcon size={15} color="#1877F2" />
                      </a>
                    </span>
                  )}
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
