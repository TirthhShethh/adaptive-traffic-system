import { Activity, Timer } from 'lucide-react';

export default function MetricsPanel({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 shadow-xl">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Activity className="text-rose-400 w-5 h-5" />
        Live Metrics
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Active Vehicles */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Activity className="w-12 h-12 text-slate-100" />
          </div>
          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 relative z-10">Active Vehicles</div>
          <div className="text-3xl font-extrabold text-slate-100 relative z-10">{metrics.active_vehicles}</div>
        </div>

        {/* Congestion */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-12 h-12 text-rose-400" />
          </div>
          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 relative z-10">Grid Congestion</div>
          <div className="text-3xl font-extrabold text-rose-400 relative z-10">{metrics.congestion_index}</div>
        </div>

        {/* Wait Time */}
        <div className="col-span-2 bg-slate-900/50 p-5 rounded-xl border border-slate-700/30 flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Avg Wait Time</div>
            <div className="text-4xl font-extrabold text-emerald-400">{metrics.avg_wait_time}<span className="text-sm font-medium text-emerald-500/50 ml-1.5">ticks</span></div>
          </div>
          <div className="w-14 h-14 rounded-full border-[6px] border-emerald-500/10 flex items-center justify-center">
            <Timer className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-5 border-t border-slate-700/50 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Current Algorithm</span>
          <span className="text-sm font-semibold text-slate-300">{metrics.algorithm}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Tick Rate</span>
          <span className="text-sm font-semibold text-slate-300">{metrics.tick_rate}s / tick</span>
        </div>
      </div>
    </div>
  );
}
