import { VideoCameraSlashIcon } from '@heroicons/react/24/outline';

// for the aspect ratio trick see https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
type VideoPlayerProps = {
  url?: string;
};
export function VideoPlayer({ url }: VideoPlayerProps) {
  const imgur = isImgur(url);
  return (
    <div className="relative w-full overflow-hidden pt-[56.25%]">
      {url &&
        (imgur ? (
          <video
            className="absolute inset-0 h-full w-full rounded-lg"
            title="Map clip"
            preload="auto"
            autoPlay={false}
            loop={false}
            controls
          >
            <source src={`https://i.imgur.com/${imgur}.mp4`} />
          </video>
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full rounded-lg"
            title="Map clip"
            src={transformUrl(url)}
            allowFullScreen
          />
        ))}
      {!url && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-theme-8">
          <VideoCameraSlashIcon className="h-1/4 text-theme-2" />
        </div>
      )}
    </div>
  );
}

function isImgur(str?: string) {
  if (!str) {
    return false;
  }

  // imgur direct link
  // IN https://i.imgur.com/123412341234.mp4
  // OUT 123412341234
  let matchArray = str.match(/(https:\/\/i.imgur.com\/)(.+?)\.(.+?)/);
  if (matchArray) {
    return matchArray[2];
  }

  // imgur full page
  // IN https://imgur.com/123412341234
  // OUT 123412341234
  matchArray = str.match(/(https:\/\/imgur.com\/)(.+?)/);
  if (matchArray) {
    return matchArray[2];
  }

  return false;
}

function transformUrl(str: string) {
  // twitch clips
  // IN https://clips.twitch.tv/123412341234
  // OUT https://clips.twitch.tv/embed?clip=123412341234&parent=www.example.com
  let matchArray = str.match(/(https:\/\/clips\.twitch\.tv)\/(.+?)(?:";|$)/);
  if (matchArray) {
    return `${matchArray[1]}/embed?autoplay=false&clip=${
      matchArray[2]
    }&parent=${import.meta.env.VITE_DEPLOYMENT_URL}`;
  }

  // twitch clips
  // IN https://www.twitch.tv/clips/123412341234
  // OUT https://clips.twitch.tv/embed?clip=123412341234&parent=www.example.com
  matchArray = str.match(
    /(https:\/\/www.twitch.tv\/)(.+?)(\/clip)\/(.+?)(?:";|$)/,
  );
  if (matchArray) {
    return `https://clips.twitch.tv/embed?autoplay=false&clip=${
      matchArray[4]
    }&parent=${import.meta.env.VITE_DEPLOYMENT_URL}`;
  }

  // twitch highlights
  // IN https://www.twitch.tv/videos/123412341234
  // OUT https://player.twitch.tv/?video=123412341234&parent=www.example.com
  matchArray = str.match(/(https:\/\/www.twitch.tv\/videos)\/(.+?)(?:";|$)/);
  if (matchArray) {
    return `https://player.twitch.tv/?autoplay=false&video=${
      matchArray[2]
    }&parent=${import.meta.env.VITE_DEPLOYMENT_URL}`;
  }

  // streamable
  // IN https://streamable.com/23412341234
  // OUT https://streamable.com/o/23412341234
  matchArray = str.match(/(https:\/\/streamable\.com)\/(.+?)(?:";|$)/);
  if (matchArray) {
    return `${matchArray[1]}/o/${matchArray[2]}`;
  }

  // youtube short link
  // IN https://youtu.be/123412341234
  // OUT https://www.youtube-nocookie.com/embed/123412341234
  matchArray = str.match(/(https:\/\/youtu.be\/)(.+?)(?:";|$)/);
  if (matchArray) {
    return `https://www.youtube-nocookie.com/embed/${matchArray[2]}`;
  }

  // youtube long link
  // IN https://www.youtube.com/watch?v=123412341234
  // OUT https://www.youtube-nocookie.com/embed/123412341234
  matchArray = str.match(/(https:\/\/www.youtube.com\/watch\?v=)(.+?)(?:";|$)/);
  if (matchArray) {
    return `https://www.youtube-nocookie.com/embed/${matchArray[2]}`;
  }

  return str;
}
