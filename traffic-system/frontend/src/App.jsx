import { useEffect, useState } from 'react';
import GridVisualizer from './components/GridVisualizer';
import ControlPanel from './components/ControlPanel';
import MetricsPanel from './components/MetricsPanel';

function App() {
  const [state, setState] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    let ws;
    const connectWs = () => {
      ws = new WebSocket('ws://localhost:8000/ws');
      ws.onopen = () => setWsConnected(true);
      ws.onclose = () => {
        setWsConnected(false);
        setTimeout(connectWs, 2000);
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setState(data);
      };
    };
    connectWs();
    return () => ws && ws.close();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-slate-900 text-slate-50 font-sans">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-indigo-400 to-emerald-400 mb-2">
          Adaptive Traffic Management System
        </h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${wsConnected ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
          <span className="text-sm font-medium text-slate-400 tracking-wide uppercase">
            {wsConnected ? 'Live Connection Active' : 'Connecting to Server...'}
          </span>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {state ? (
            <GridVisualizer grid={state.grid} />
          ) : (
            <div className="h-[600px] flex items-center justify-center bg-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-sm animate-pulse">
              <span className="text-slate-400 font-medium">Pending Simulation Stream...</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <MetricsPanel metrics={state?.metrics} />
          <ControlPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
