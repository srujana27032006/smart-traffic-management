import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0C10] overflow-hidden relative font-sans text-white">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#45A29E]/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#39ff14]/10 blur-[100px]" />
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#39ff14] to-[#45A29E] flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <Cpu className="text-[#0B0C10] w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">Nexus<span className="text-[#39ff14]">Traffic</span></span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">Documentation</a>
          <Link href="/dashboard" className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all font-medium backdrop-blur-sm">
            Launch System
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#45A29E] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39ff14]"></span>
          </span>
          System v2.4 Now Online
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter leading-tight mb-6 max-w-4xl"
        >
          AI-Powered <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] to-[#45A29E] neon-text-green">
            Smart Traffic
          </span> Control
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Dynamically adjust signal timings based on real-time vehicle density. 
          Reduce congestion, lower emissions, and optimize city flow.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/dashboard" className="px-8 py-4 rounded-xl font-semibold text-lg bg-[#39ff14] text-[#0B0C10] shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
            Open Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 rounded-xl font-semibold text-lg bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
            View API Docs
          </button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl text-left"
        >
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
            <Radio className="w-10 h-10 text-[#45A29E] mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">IoT Sensor Integration</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Simulates data ingest from traffic cameras and IR sensors to calculate lane density in milliseconds.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
            <Cpu className="w-10 h-10 text-[#39ff14] mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">Predictive AI Engine</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Machine learning algorithms adjust green light durations to prioritize high-congestion lanes dynamically.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
            <ShieldCheck className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">Manual Override</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Emergency vehicle approaching? Instantly switch from Auto to Manual mode via the admin panel.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
