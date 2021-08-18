export default function VideoPlayer({ url }) {
  return (
    <div className="w-100 h-100">
      {url &&
        <iframe
          title="Map clip"
          src={url}
          width="100%" height="100%" allowFullScreen
        ></iframe>}
    </div>
  );
}
