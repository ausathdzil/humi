export default function MoodboardExample() {
  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center gap-4 p-4 bg-white/90 rounded-lg shadow-sm">
        <div className="size-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
        <div>
          <h3 className="text-xl font-bold">Midnight Memories</h3>
          <p className="text-gray-600 font-semibold">The Dreamers</p>
        </div>
      </div>

      <div className="p-4 bg-white/90 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-200/50 hover:scale-105 transition-transform duration-200">
            Dreamy
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200/50 hover:scale-105 transition-transform duration-200">
            Nostalgic
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-full text-sm font-semibold border border-pink-200/50 hover:scale-105 transition-transform duration-200">
            Romantic
          </span>
        </div>

        <div className="flex gap-2">
          <div className="size-12 rounded-lg bg-purple-500" />
          <div className="size-12 rounded-lg bg-pink-500" />
          <div className="size-12 rounded-lg bg-blue-500" />
          <div className="size-12 rounded-lg bg-indigo-500" />
        </div>

        <p className="font-serif text-xl bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text font-semibold">
          In the midnight hour, we dance like no one&apos;s watching
        </p>

        <div className="space-y-2">
          <h4 className="font-bold">Mood Timeline</h4>
          <div className="flex gap-1 h-12">
            <div className="w-1/5 h-full bg-purple-500 rounded-l-lg" />
            <div className="w-1/5 h-full bg-pink-500" />
            <div className="w-1/5 h-full bg-blue-500" />
            <div className="w-1/5 h-full bg-indigo-500" />
            <div className="w-1/5 h-full bg-purple-500 rounded-r-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
