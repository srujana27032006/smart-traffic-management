import React from 'react';
import { LightState } from '@/hooks/use-traffic-simulation';
import { cn } from '@/components/ui/Badge';
import { motion } from 'framer-motion';

interface TrafficLightProps {
  state: LightState;
  timer: number;
}

export function TrafficLight({ state, timer }: TrafficLightProps) {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Traffic Light Housing */}
      <div className="bg-black border-2 border-slate-800 rounded-2xl p-3 shadow-2xl flex flex-col space-y-3 relative">
        {/* Top Visor */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-slate-800 rounded-t-lg"></div>
        
        {/* Red Light */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-900 rounded-full opacity-20"></div>
          <div className={cn(
            "w-12 h-12 rounded-full border-2 border-red-900/50 transition-all duration-300",
            state === 'Red' ? "bg-red-500 neon-glow-red opacity-100" : "bg-red-950 opacity-30"
          )} />
          {/* Internal reflection highlight */}
          <div className="absolute top-1 left-2 w-4 h-4 bg-white/20 rounded-full blur-[2px]"></div>
        </div>

        {/* Yellow Light */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-900 rounded-full opacity-20"></div>
          <div className={cn(
            "w-12 h-12 rounded-full border-2 border-yellow-900/50 transition-all duration-300",
            state === 'Yellow' ? "bg-yellow-400 neon-glow-yellow opacity-100" : "bg-yellow-950 opacity-30"
          )} />
          <div className="absolute top-1 left-2 w-4 h-4 bg-white/20 rounded-full blur-[2px]"></div>
        </div>

        {/* Green Light */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-900 rounded-full opacity-20"></div>
          <div className={cn(
            "w-12 h-12 rounded-full border-2 border-green-900/50 transition-all duration-300",
            state === 'Green' ? "bg-green-500 neon-glow-green opacity-100" : "bg-green-950 opacity-30"
          )} />
          <div className="absolute top-1 left-2 w-4 h-4 bg-white/20 rounded-full blur-[2px]"></div>
        </div>
      </div>

      {/* Timer Display */}
      <motion.div 
        key={timer}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "font-mono text-2xl font-bold px-4 py-1 rounded-lg backdrop-blur-md border border-white/5",
          state === 'Green' ? "text-green-400 bg-green-500/10" : 
          state === 'Yellow' ? "text-yellow-400 bg-yellow-500/10" : 
          "text-red-400 bg-red-500/10"
        )}
      >
        {timer < 10 ? `0${timer}` : timer > 90 ? '--' : timer}s
      </motion.div>
    </div>
  );
}
