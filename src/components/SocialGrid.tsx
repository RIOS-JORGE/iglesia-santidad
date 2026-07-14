import FacebookIcon from '../icons/FacebookIcon.tsx';
import InstagramIcon from '../icons/InstagramIcon.tsx';
import YoutubeIcon from '../icons/YoutubeIcon.tsx';
import SocialCard from './SocialCard.tsx';

const socials = [
  { icon: FacebookIcon, platform: 'Facebook', handle: '@santidadajehovah', url: 'https://www.facebook.com/santidadajehovah', iconColor: '#1877F2' },
  { icon: InstagramIcon, platform: 'Instagram', handle: '@santidadajehovah', url: 'https://www.instagram.com/santidadajehovah/', iconColor: '#E4405F' },
  { icon: YoutubeIcon, platform: 'YouTube', handle: '@santidadajehovah0', url: 'https://www.youtube.com/@santidadajehovah0', iconColor: '#FF0000' },
];

export default function SocialGrid() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {socials.map((s) => (
            <SocialCard key={s.platform} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
