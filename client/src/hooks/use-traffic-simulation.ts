import { useState, useEffect, useRef, useCallback } from 'react';
import { useSettings } from './use-settings';

export type LightState = 'Green' | 'Yellow' | 'Red';
export type DensityLevel = 'Low' | 'Medium' | 'High';

export interface LaneState {
  id: number;
  name: string;
  count: number;
  density: DensityLevel;
  light: LightState;
  timer: number;
  history: number[]; // For charts
}

const INITIAL_LANES: LaneState[] = [
  { id: 0, name: 'Northbound (Main St)', count: 12, density: 'Low', light: 'Green', timer: 15, history: [] },
  { id: 1, name: 'Southbound (Main St)', count: 45, density: 'High', light: 'Red', timer: 15, history: [] },
  { id: 2, name: 'Eastbound (Cross Ave)', count: 28, density: 'Medium', light: 'Red', timer: 15, history: [] },
  { id: 3, name: 'Westbound (Cross Ave)', count: 8, density: 'Low', light: 'Red', timer: 15, history: [] },
];

const YELLOW_DURATION = 3;

export function useTrafficSimulation() {
  const { data: settings } = useSettings();
  const [lanes, setLanes] = useState<LaneState[]>(INITIAL_LANES);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [aiEfficiency, setAiEfficiency] = useState(15); // Percentage saved

  // Calculate density based on count
  const getDensity = (count: number): DensityLevel => {
    if (count < 20) return 'Low';
    if (count < 50) return 'Medium';
    return 'High';
  };

  // Determine green light duration based on density
  const getGreenDuration = (density: DensityLevel): number => {
    switch (density) {
      case 'Low': return 10;
      case 'Medium': return 20;
      case 'High': return 35;
      default: return 15;
    }
  };

  // Simulation Tick (Every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      setLanes((prevLanes) => {
        let newLanes = [...prevLanes];
        let needsLightSwitch = false;
        let activeGreenIdx = newLanes.findIndex(l => l.light === 'Green' || l.light === 'Yellow');
        
        if (activeGreenIdx === -1) activeGreenIdx = 0; // Fallback

        // 1. Process Timers & Light States
        const activeLane = newLanes[activeGreenIdx];
        if (activeLane.timer > 0) {
          activeLane.timer -= 1;
        } else {
          needsLightSwitch = true;
        }

        // Handle light transitions
        if (needsLightSwitch) {
          if (activeLane.light === 'Green') {
            // Green -> Yellow
            activeLane.light = 'Yellow';
            activeLane.timer = YELLOW_DURATION;
          } else if (activeLane.light === 'Yellow') {
            // Yellow -> Red, pick next Green
            activeLane.light = 'Red';
            
            let nextIdx = (activeGreenIdx + 1) % 4;

            // AI Logic: Find lane with highest density if in auto mode
            if (settings?.mode === 'auto') {
               let maxCount = -1;
               for (let i = 0; i < 4; i++) {
                 if (i !== activeGreenIdx && newLanes[i].count > maxCount) {
                   maxCount = newLanes[i].count;
                   nextIdx = i;
                 }
               }
               // Simulate AI learning/efficiency gains occasionally
               if (Math.random() > 0.7) {
                 setAiEfficiency(prev => Math.min(prev + (Math.random() * 2), 45));
               }
            } else if (settings?.mode === 'manual') {
               // In manual mode, the light just stays green on the manualActiveLane
               // If it was yellow, it shouldn't have changed, but this handles overrides
               nextIdx = settings.manualActiveLane || 0;
            }

            newLanes[nextIdx].light = 'Green';
            newLanes[nextIdx].timer = getGreenDuration(newLanes[nextIdx].density);
          }
        }

        // Manual Override Enforcement
        if (settings?.mode === 'manual' && settings.manualActiveLane !== undefined) {
          const targetLane = settings.manualActiveLane;
          // Force state if not matching
          if (newLanes[targetLane].light === 'Red') {
            newLanes.forEach(l => l.light = 'Red');
            newLanes[targetLane].light = 'Green';
            newLanes[targetLane].timer = 99; // Keep green indefinitely
          } else if (newLanes[targetLane].light === 'Green') {
            newLanes[targetLane].timer = 99; // Reset timer to keep it green
          }
        }

        // 2. Simulate Traffic Flow (Cars arriving and leaving)
        let processedThisTick = 0;
        
        newLanes = newLanes.map(lane => {
          let newCount = lane.count;
          
          // Cars leaving (only if Green)
          if (lane.light === 'Green') {
            const leaveRate = Math.floor(Math.random() * 3) + 1; // 1-3 cars per sec
            const actualLeft = Math.min(newCount, leaveRate);
            newCount -= actualLeft;
            processedThisTick += actualLeft;
          }

          // Cars arriving (based on simulation level)
          let arrivalMultiplier = 1;
          if (settings?.simulationLevel === 'low') arrivalMultiplier = 0.5;
          if (settings?.simulationLevel === 'high') arrivalMultiplier = 2.5;
          
          // Random arrivals
          if (Math.random() > 0.4) {
             newCount += Math.floor(Math.random() * 3 * arrivalMultiplier);
          }

          // Update history every 5 ticks for the chart
          let newHistory = [...lane.history];
          if (activeLane.timer % 5 === 0) {
            newHistory.push(newCount);
            if (newHistory.length > 20) newHistory.shift(); // Keep last 20 data points
          }

          return {
            ...lane,
            count: Math.max(0, newCount), // Prevent negative
            density: getDensity(Math.max(0, newCount)),
            history: newHistory
          };
        });

        if (processedThisTick > 0) {
          setTotalProcessed(prev => prev + processedThisTick);
        }

        return newLanes;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings?.mode, settings?.simulationLevel, settings?.manualActiveLane]);

  return {
    lanes,
    totalProcessed,
    aiEfficiency: aiEfficiency.toFixed(1)
  };
}
