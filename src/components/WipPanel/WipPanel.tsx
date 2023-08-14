import image from './chicken_work.png';

export function WIPPanel() {
  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <img className="max-h-[50%] max-w-[50%]" src={image} />
    </div>
  );
}
