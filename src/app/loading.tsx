export default function Loading() {
  return (
    <main aria-busy="true" className="flex-1">
      <div
        className="h-3.5 w-45 bg-(--rule) rounded-[3px] mb-5.5 opacity-60"
      />
      <div
        className="h-7 w-55 bg-(--rule) rounded-md mb-5.5 opacity-60"
      />
      <div
        className="h-3.5 w-full bg-(--rule) rounded-[3px] mb-2 opacity-50"
      />
      <div
        className="h-3.5 w-4/5 bg-(--rule) rounded-[3px] opacity-50"
      />
    </main>
  );
}
