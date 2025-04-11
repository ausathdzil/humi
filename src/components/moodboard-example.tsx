import { TimelineChart } from '@/components/timeline-chart';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function MoodboardExample() {
  return (
    <div className="select-none border rounded-2xl p-5 bg-gradient-to-br from-purple-50/50 to-pink-50/50 shadow-lg">
      <div className="flex items-center gap-4 bg-white/80 rounded-2xl p-3 backdrop-blur-sm border border-purple-100/50">
        <div className="size-20 rounded-2xl shadow-lg relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000"
            alt="Album cover"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]" />
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Levitating
          </h3>
          <p className="text-gray-600 font-semibold">Dua Lipa</p>
        </div>
      </div>
      <Separator className="my-4 bg-gradient-to-r from-purple-200 to-pink-200" />

      <div className="bg-white/80 rounded-2xl space-y-4 p-4 backdrop-blur-sm border border-purple-100/50">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-200/50 hover:scale-105 transition-transform duration-200 shadow-sm">
            Disco
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-full text-sm font-semibold border border-pink-200/50 hover:scale-105 transition-transform duration-200 shadow-sm">
            Upbeat
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200/50 hover:scale-105 transition-transform duration-200 shadow-sm">
            Funky
          </span>
        </div>

        <div className="flex gap-2">
          <div className="size-10 rounded-2xl bg-[#FF69B4] shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="size-10 rounded-2xl bg-[#9370DB] shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="size-10 rounded-2xl bg-[#FFD700] shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="size-10 rounded-2xl bg-[#FFA07A] shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
        </div>

        <p className="font-serif text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text font-semibold leading-tight">
          If you wanna run away with me, I know a galaxy
        </p>

        <div className="space-y-2">
          <h4 className="font-bold text-base bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Mood Timeline
          </h4>
          <TimelineChart />
        </div>
      </div>
    </div>
  );
}
