export default function GridVisualizer({ grid }) {
  if (!grid || !grid.intersections) return null;

  const items = grid.intersections.sort((a,b) => {
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });

  return (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
      <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <div className="w-4 h-4 rounded-[3px] bg-blue-400" />
        </div>
        Simulated 3x3 Grid
      </h2>
      <div className="relative">
        <div className="grid grid-cols-3 gap-6">
          {items.map((intersection) => (
            <div key={intersection.id} className="relative aspect-square flex items-center justify-center bg-slate-900 rounded-xl p-4 border border-slate-700/60 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:border-slate-600">
              
              {/* Roads visual representation */}
              <div className="absolute inset-x-0 h-10 top-1/2 -mt-5 bg-slate-800 border-y border-slate-700 pointer-events-none z-0"></div>
              <div className="absolute inset-y-0 w-10 left-1/2 -ml-5 bg-slate-800 border-x border-slate-700 pointer-events-none z-0"></div>

              {/* Signals */}
              <div className="z-10 p-2.5 rounded-xl bg-slate-950 flex flex-col gap-2 ring-1 ring-slate-800/80 transform shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest absolute -top-7 whitespace-nowrap -ml-2">INT {intersection.x}.{intersection.y}</span>
                
                {/* NS Light */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500 font-bold tracking-wider w-4">NS</span>
                  <div className={`w-3.5 h-3.5 rounded-full ${intersection.state.N_S === 'GREEN' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]' : intersection.state.N_S === 'YELLOW' ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]' : 'bg-slate-800'}`} />
                  <div className={`w-3.5 h-3.5 rounded-full ${intersection.state.N_S === 'RED' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]' : 'bg-slate-800'}`} />
                </div>
                {/* EW Light */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500 font-bold tracking-wider w-4">EW</span>
                  <div className={`w-3.5 h-3.5 rounded-full ${intersection.state.E_W === 'GREEN' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]' : intersection.state.E_W === 'YELLOW' ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]' : 'bg-slate-800'}`} />
                  <div className={`w-3.5 h-3.5 rounded-full ${intersection.state.E_W === 'RED' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]' : 'bg-slate-800'}`} />
                </div>
              </div>

              {/* Queues Badges */}
              {intersection.queue_lengths.NORTH > 0 && <div className="absolute top-2 left-1/2 -ml-3 bg-blue-500/20 ring-1 ring-blue-500/50 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm z-20">{intersection.queue_lengths.NORTH}</div>}
              {intersection.queue_lengths.SOUTH > 0 && <div className="absolute bottom-2 left-1/2 -ml-3 bg-blue-500/20 ring-1 ring-blue-500/50 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm z-20">{intersection.queue_lengths.SOUTH}</div>}
              {intersection.queue_lengths.EAST > 0 && <div className="absolute right-2 top-1/2 -mt-3 bg-blue-500/20 ring-1 ring-blue-500/50 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm z-20">{intersection.queue_lengths.EAST}</div>}
              {intersection.queue_lengths.WEST > 0 && <div className="absolute left-2 top-1/2 -mt-3 bg-blue-500/20 ring-1 ring-blue-500/50 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm z-20">{intersection.queue_lengths.WEST}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
