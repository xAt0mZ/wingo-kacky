export function SizeDisplay() {
  return (
    <div className="text-center">
      <span className="sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden ">md</span>
      <span className="hidden lg:block xl:hidden ">lg</span>
      <span className="hidden xl:block 2xl:hidden ">XL</span>
      <span className="hidden 2xl:block ">2XL</span>
    </div>
  );
}
