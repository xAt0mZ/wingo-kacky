import {
  IconDefinition,
  faTwitch,
  faTwitter,
  faDiscord,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function newItem(label: string, icon: IconDefinition, href: string): ItemProps {
  return {
    label,
    icon,
    href,
  };
}

const items: ItemProps[] = [
  newItem('Twitch', faTwitch, 'https://twitch.tv/wingo'),
  newItem(
    'Youtube',
    faYoutube,
    'https://www.youtube.com/channel/UCKP8GldL0xEz_-snbfeFaGg',
  ),
  newItem('Instagram', faInstagram, 'https://www.instagram.com/wingobear'),
  newItem('Twitter', faTwitter, 'https://twitter.com/Wingo_Bear'),
  newItem('Discord', faDiscord, 'https://discord.com/invite/wingobear'),
];

export function Footer() {
  return (
    <div className="flex flex-col items-start justify-center gap-6 xl:flex-row xl:justify-start xl:gap-6">
      <span className="text-lg font-bold text-theme-2 md:text-xl xl:text-3xl">
        Retrouvez-moi sur
      </span>
      <div className="flex flex-wrap gap-4">
        {items.map(({ label, icon, href }, idx) => (
          <Item key={idx} label={label} icon={icon} href={href} />
        ))}
      </div>
    </div>
  );
}

type ItemProps = {
  label: string;
  icon: IconDefinition;
  href: string;
};

function Item({ href, label, icon }: ItemProps) {
  return (
    <div className="rounded-2xl bg-theme-5 px-4 py-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 text-theme-2"
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        <span className="text-base font-medium">{label}</span>
      </a>
    </div>
  );
}
