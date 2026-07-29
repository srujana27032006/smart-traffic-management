import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LaneState } from '@/hooks/use-traffic-simulation';
import { BrainCircuit, TrendingDown } from 'lucide-react';

export function AnalyticsChart({ lanes, aiEfficiency }: { lanes: LaneState[], aiEfficiency: string }) {
  // Transform lane history into Recharts format
  // Assuming all lanes have same history length (they should based on our hook)
  const dataLength = lanes[0]?.history.length || 0;
  
  const chartData = Array.from({ length: dataLength }).map((_, idx) => {
    const point: any = { time: `-${(dataLength - idx) * 5}s` };
    lanes.forEach(lane => {
      point[lane.name] = lane.history[idx] || 0;
    });
    return point;
  });

  const colors = ['#39ff14', '#06b6d4', '#f59e0b', '#ec4899'];

  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <BrainCircuit className="text-primary" /> AI Predictions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Live congestion tracking across all sectors</p>
        </div>
        
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center min-w-[120px]">
          <div className="text-primary font-bold text-2xl flex items-center justify-center gap-1">
            <TrendingDown className="w-5 h-5" /> {aiEfficiency}%
          </div>
          <div className="text-xs text-primary/70 uppercase tracking-wide mt-1">Congestion Reduced</div>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] mt-4 relative">
        {chartData.length < 2 ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Gathering data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.3)" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.3)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              {lanes.map((lane, idx) => (
                <Line 
                  key={lane.id}
                  type="monotone" 
                  dataKey={lane.name} 
                  stroke={colors[idx % colors.length]} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: colors[idx % colors.length], stroke: '#0f172a', strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
