export function Checkbox({ label }: { label: string }) {
  return (
    <div className="flex flex-row gap-1">
      <input
        type="checkbox"
        className="h-5 w-5 appearance-none rounded border border-theme-8 checked:text-theme-2"
      />
      <span className="text-base font-medium text-theme-2">{label}</span>
    </div>
  );
}
