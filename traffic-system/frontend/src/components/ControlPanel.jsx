import { Zap, Clock, ShieldAlert, FastForward, Play } from 'lucide-react';

export default function ControlPanel() {
  const handleRushHour = async () => {
    await fetch('http://localhost:8000/api/control/rush-hour', { method: 'POST' });
  };

  const handleSpeed = async () => {
    await fetch('http://localhost:8000/api/control/speed', { method: 'POST' });
  };

  const handleEmergency = async () => {
    await fetch('http://localhost:8000/api/control/emergency', { method: 'POST' });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 shadow-xl">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Zap className="text-amber-400 w-5 h-5" />
        Simulation Controls
      </h2>
      <div className="flex flex-col gap-4">
        <button 
          onClick={handleRushHour}
          className="flex items-center gap-4 bg-slate-700/30 hover:bg-slate-700/60 p-4 rounded-xl transition-all border border-slate-600/30 hover:border-indigo-500/50 group"
        >
          <div className="p-2.5 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
            <Clock className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-slate-200">Toggle Rush Hour</div>
            <div className="text-xs text-slate-400 mt-0.5">Increases vehicle spawn density</div>
          </div>
        </button>

        <button 
          onClick={handleSpeed}
          className="flex items-center gap-4 bg-slate-700/30 hover:bg-slate-700/60 p-4 rounded-xl transition-all border border-slate-600/30 hover:border-emerald-500/50 group"
        >
          <div className="p-2.5 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
            <FastForward className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-slate-200">Toggle Sim Speed</div>
            <div className="text-xs text-slate-400 mt-0.5">Switch between 1x and 5x execution</div>
          </div>
        </button>

        <button 
          onClick={handleEmergency}
          className="flex items-center gap-4 bg-red-950/20 hover:bg-red-900/30 p-4 rounded-xl transition-all border border-red-900/30 hover:border-red-500/50 group"
        >
          <div className="p-2.5 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors animate-pulse">
            <ShieldAlert className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-red-200">Dispatch Emergency</div>
            <div className="text-xs text-red-400/80 mt-0.5">Forces green lights on vehicle path</div>
          </div>
        </button>
      </div>
    </div>
  );
}
