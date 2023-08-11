export function Select({ options }: { options: string[] }) {
  return (
    <select className="flex items-center justify-center self-stretch rounded-2xl border border-theme-8 bg-theme-7 px-4 py-3 text-theme-2 dark:bg-theme-6">
      {options.map((opt, idx) => (
        <option key={idx}>{opt}</option>
      ))}
    </select>
  );
}
