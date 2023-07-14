import { IconDefinition, faTwitch, faTwitter, faDiscord, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
  return (
    <div className="flex flex-col items-start justify-center gap-6">
      <span className="text-lg font-bold text-purple-blue ">Retrouvez-moi sur</span>
      <div className="flex flex-wrap gap-4">
        <Item href="https://twitch.tv/wingobear" icon={faTwitch} label="Twitch" />
        <Item href="https://www.youtube.com/channel/UCKP8GldL0xEz_-snbfeFaGg" icon={faYoutube} label="Youtube" />
        <Item href="https://discord.com/invite/wingobear" icon={faDiscord} label="Discord" />
        <Item href="https://twitter.com/Wingo_Bear" icon={faTwitter} label="Twitter" />
        <Item href="https://www.instagram.com/wingobear" icon={faInstagram} label="Instagram" />
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
    <div className="rounded-2xl bg-gray-gold px-4 py-2">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-purple-blue">
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        <span className="text-base font-medium">{label}</span>
      </a>
    </div>
  );
}
