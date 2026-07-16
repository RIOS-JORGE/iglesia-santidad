interface Props {
  day: string;
  activity: string;
  time: string;
  desc: string;
}

export default function ActivityCard({ day, activity, time, desc }: Props) {
  return (
    <article className="w-full max-w-57.5 h-47.5 bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
      <div>
        <p className="text-[12px] font-semibold text-text-light uppercase tracking-wide">
          {day}
        </p>
        <h3 className="text-[17px] font-bold text-primary mt-1">{activity}</h3>
      </div>
      <div>
        <p className="text-[24px] font-semibold text-accent">{time}</p>
        <p className="text-[12px] text-text-body mt-1">{desc}</p>
      </div>
    </article>
  );
}
