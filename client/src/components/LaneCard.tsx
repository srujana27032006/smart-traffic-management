import React from 'react';
import { LaneState } from '@/hooks/use-traffic-simulation';
import { TrafficLight } from './TrafficLight';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Users, Car, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function LaneCard({ lane }: { lane: LaneState }) {
  // Generate random animation durations for cars based on density
  const getCarSpeed = () => {
    if (lane.density === 'Low') return '4s';
    if (lane.density === 'Medium') return '6s';
    return '10s'; // High density = slow traffic
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Background ambient glow based on light state */}
      <div className={cn(
        "absolute -inset-24 opacity-[0.03] rounded-full blur-3xl transition-colors duration-1000",
        lane.light === 'Green' ? "bg-green-500" : lane.light === 'Red' ? "bg-red-500" : "bg-yellow-500"
      )} />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-2">{lane.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant={
              lane.density === 'Low' ? 'success' : 
              lane.density === 'Medium' ? 'warning' : 'destructive'
            }>
              {lane.density} Density
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Car className="w-3 h-3" /> {lane.count} vehicles
            </span>
          </div>
        </div>
        
        <TrafficLight state={lane.light} timer={lane.timer} />
      </div>

      {/* Visual Road Simulation */}
      <div className="mt-8 relative z-10">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Arriving</span>
          <span>Departing</span>
        </div>
        
        <div className="bg-slate-900 rounded-lg p-2 border border-slate-800">
          <div className="car-track">
            {/* Render moving cars based on count (visual approximation) */}
            {Array.from({ length: Math.min(lane.count, 15) }).map((_, i) => (
              <div 
                key={i} 
                className="car-particle" 
                style={{ 
                  animationDuration: getCarSpeed(),
                  animationDelay: `${Math.random() * 5}s`,
                  background: lane.light === 'Green' ? '#39ff14' : '#64748b',
                  boxShadow: lane.light === 'Green' ? '0 0 8px #39ff14' : 'none'
                }}
              />
            ))}
          </div>
          <div className="border-t border-dashed border-slate-700 my-1" />
          <div className="car-track">
            {Array.from({ length: Math.min(Math.floor(lane.count / 2), 10) }).map((_, i) => (
               <div 
               key={`b-${i}`} 
               className="car-particle" 
               style={{ 
                 animationDuration: getCarSpeed(),
                 animationDelay: `${Math.random() * 5}s`,
                 background: lane.light === 'Green' ? '#39ff14' : '#64748b',
                 boxShadow: lane.light === 'Green' ? '0 0 8px #39ff14' : 'none'
               }}
             />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
