import React from 'react';
import { useSettings, useUpdateSettings } from '@/hooks/use-settings';
import { LaneState } from '@/hooks/use-traffic-simulation';
import { Settings2, Zap, Hand, BarChart3, AlertTriangle, Truck } from 'lucide-react';
import { cn } from './ui/Badge';

export function AdminPanel({ lanes }: { lanes: LaneState[] }) {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  if (isLoading || !settings) return <div className="animate-pulse h-32 bg-card rounded-xl"></div>;

  const handleModeToggle = (mode: 'auto' | 'manual') => {
    updateSettings.mutate({ mode });
  };

  const handleSimLevelChange = (level: 'low' | 'medium' | 'high') => {
    updateSettings.mutate({ simulationLevel: level });
  };

  const handleManualLaneSelect = (laneId: number) => {
    if (settings.mode !== 'manual') return;
    updateSettings.mutate({ manualActiveLane: laneId });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-primary/50">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Settings2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-display font-bold">System Controls</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Operating Mode */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" /> Operating Mode
          </h3>
          <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
            <button
              onClick={() => handleModeToggle('auto')}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg font-medium transition-all flex justify-center items-center gap-2",
                settings.mode === 'auto' 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <BarChart3 className="w-4 h-4" /> AI Auto
            </button>
            <button
              onClick={() => handleModeToggle('manual')}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg font-medium transition-all flex justify-center items-center gap-2",
                settings.mode === 'manual' 
                  ? "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <Hand className="w-4 h-4" /> Manual
            </button>
          </div>

          {settings.mode === 'manual' && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl animate-in fade-in slide-in-from-top-2">
              <p className="text-sm text-destructive-foreground flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" /> Select Active Green Lane:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {lanes.map((lane) => (
                  <button
                    key={lane.id}
                    onClick={() => handleManualLaneSelect(lane.id)}
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm font-medium transition-all text-left",
                      settings.manualActiveLane === lane.id
                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
                        : "bg-black/40 text-muted-foreground hover:bg-white/10 border border-transparent"
                    )}
                  >
                    {lane.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Traffic Simulation Load */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Truck className="w-4 h-4" /> Inject Traffic Load
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                onClick={() => handleSimLevelChange(level)}
                className={cn(
                  "py-4 px-2 rounded-xl text-sm font-medium transition-all border capitalize",
                  settings.simulationLevel === level
                    ? level === 'low' ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                      : level === 'medium' ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                      : "bg-red-500/20 text-red-400 border-red-500/50"
                    : "bg-black/40 text-muted-foreground border-transparent hover:bg-white/5"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
             Adjusts the incoming flow of vehicles to test the AI's adaptation capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
