export function TaskListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="premium-card shimmer p-5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-4 w-2/3 rounded-md bg-white/[0.06]" />
          </div>
          <div className="mt-4 h-3.5 w-full rounded bg-white/[0.05]" />
          <div className="mt-2 h-3.5 w-4/5 rounded bg-white/[0.05]" />
          <div className="mt-5 flex gap-2">
            <div className="h-5 w-16 rounded-full bg-white/[0.05]" />
            <div className="h-5 w-16 rounded-full bg-white/[0.05]" />
          </div>
          <div className="mt-6 h-3 w-full rounded bg-white/[0.04]" />
        </div>
      ))}
    </div>
  )
}
