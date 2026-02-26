import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, BarChart3, Lock, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900 font-bold">M</div>
          <span className="font-bold text-xl tracking-tight">MSM-NR1</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
          <a href="#methodology" className="hover:text-white transition-colors">Metodologia</a>
          <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
        </div>
        <Link to="/signup" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-5 py-2.5 rounded-full font-semibold text-sm transition-all">
          Acessar Plataforma
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Compliance NR-1 & eSocial
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Saúde Mental como <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">KPI de Negócio</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
            Automatize a conformidade com a NR-1 e transforme riscos psicossociais em ROI. 
            A primeira plataforma serverless e preditiva desenhada para eliminar o erro humano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              Começar Agora
              <Zap size={20} className="text-emerald-600" />
            </Link>
            <button className="px-8 py-4 rounded-xl font-bold text-lg border border-slate-700 hover:bg-slate-800 transition-all text-slate-300">
              Ver Demonstração
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-2 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
              <div className="h-8 bg-slate-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Risco Psicossocial Global</div>
                    <div className="text-2xl font-bold text-white mt-1">Nível Moderado</div>
                  </div>
                  <div className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-medium">Atenção Requerida</div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Exigências Quantitativas', val: 78, color: 'bg-red-500' },
                    { label: 'Ritmo de Trabalho', val: 65, color: 'bg-yellow-500' },
                    { label: 'Suporte Social', val: 42, color: 'bg-emerald-500' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white font-mono">{item.val}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          className={`h-full ${item.color}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-24 border-t border-slate-800">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Compliance NR-1</h3>
            <p className="text-slate-400 leading-relaxed">
              Tradução automática de dados clínicos para a matriz de risco da engenharia. Gere o inventário de riscos com um clique.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Anonimato Absoluto</h3>
            <p className="text-slate-400 leading-relaxed">
              Isolamento de dados em nível de banco (RLS). Segurança psicológica garantida para o colaborador responder com honestidade.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">ROI Preditivo</h3>
            <p className="text-slate-400 leading-relaxed">
              Antecipe riscos antes que virem passivos. Cada $1 investido retorna $4 em produtividade e economia de FAP.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
