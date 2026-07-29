import React from 'react';
import { useTrafficSimulation } from '@/hooks/use-traffic-simulation';
import { LaneCard } from '@/components/LaneCard';
import { AdminPanel } from '@/components/AdminPanel';
import { AnalyticsChart } from '@/components/AnalyticsChart';
import { Activity, LayoutDashboard, Globe, ShieldAlert } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { lanes, totalProcessed, aiEfficiency } = useTrafficSimulation();

  return (
    <div className="min-h-screen bg-background bg-grid-pattern relative pb-20">
      {/* Background radial gradient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-glow-green">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-display font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Nexus<span className="text-primary">Traffic</span>
            </h1>
          </div>
          
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-white transition-colors">Overview</Link>
            <div className="flex items-center gap-2 text-white bg-white/10 px-3 py-1.5 rounded-md">
              <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 relative z-10">
        
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
             <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                <Activity className="w-6 h-6" />
             </div>
             <div>
               <p className="text-sm text-muted-foreground">System Status</p>
               <p className="text-2xl font-bold text-white flex items-center gap-2">
                 Online <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               </p>
             </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
             <div className="p-4 bg-primary/10 rounded-xl text-primary border border-primary/20">
                <Car className="w-6 h-6" />
             </div>
             <div>
               <p className="text-sm text-muted-foreground">Vehicles Processed</p>
               <p className="text-2xl font-bold text-white">{totalProcessed.toLocaleString()}</p>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
             <div className="p-4 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
                <ShieldAlert className="w-6 h-6" />
             </div>
             <div>
               <p className="text-sm text-muted-foreground">Active Intersections</p>
               <p className="text-2xl font-bold text-white">1 (Main Hub)</p>
             </div>
          </motion.div>
        </div>

        {/* Traffic Lanes Grid */}
        <div>
          <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
            Live Intersection View
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lanes.map((lane) => (
              <LaneCard key={lane.id} lane={lane} />
            ))}
          </div>
        </div>

        {/* Lower Section: Analytics & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnalyticsChart lanes={lanes} aiEfficiency={aiEfficiency} />
          </div>
          <div className="lg:col-span-1">
            <AdminPanel lanes={lanes} />
          </div>
        </div>

      </main>
    </div>
  );
}

// Simple Car icon component specifically for the Dashboard
function Car(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  );
}
