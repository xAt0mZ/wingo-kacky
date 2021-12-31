interface Props {
  url: string
}

export function VideoPlayer({ url }: Props) {
  return (
    <div className="w-100 h-100">
      {url &&
        <iframe
          title="Map clip"
          src={url}
          width="100%" height="100%" allowFullScreen
         />}
    </div>
  );
}
