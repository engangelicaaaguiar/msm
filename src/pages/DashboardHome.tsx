import React from 'react';
import { TrendingUp, Users, AlertTriangle, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ROI_DATA = [
  { month: 'Jan', cost: 4000, savings: 0 },
  { month: 'Fev', cost: 4000, savings: 2000 },
  { month: 'Mar', cost: 4000, savings: 5500 },
  { month: 'Abr', cost: 4000, savings: 8000 },
  { month: 'Mai', cost: 4000, savings: 12000 },
  { month: 'Jun', cost: 4000, savings: 18000 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visão Geral Executiva</h1>
          <p className="text-slate-500">Monitoramento de ROI e Saúde Organizacional.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
          <TrendingUp size={16} />
          ROI Projetado: 4.5x
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Vidas Monitoradas</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">2,450</div>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp size={12} />
            +12% vs mês anterior
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Risco Psicossocial</div>
              <div className="text-3xl font-bold text-yellow-600 mt-2">Médio</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600">
              <Activity size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Score Global: 68/100
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Alertas Críticos</div>
              <div className="text-3xl font-bold text-red-600 mt-2">3</div>
            </div>
            <div className="bg-red-50 p-2 rounded-lg text-red-600">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs text-red-600 font-medium">
            Ação imediata requerida
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Economia FAP (Est.)</div>
              <div className="text-3xl font-bold text-emerald-600 mt-2">R$ 45k</div>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Acumulado no ano
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Projeção de Economia vs. Investimento</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ROI_DATA}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" name="Economia Gerada" />
                <Area type="monotone" dataKey="cost" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="Custo da Plataforma" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-4">Insights de Negócio</h3>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">Oportunidade</div>
                <p className="text-sm text-slate-300">
                  Redução de 15% no turnover do setor Comercial poderia economizar <strong>R$ 120.000/ano</strong> em custos de contratação.
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="text-xs text-yellow-400 font-bold uppercase tracking-wider mb-1">Risco Latente</div>
                <p className="text-sm text-slate-300">
                  Aumento de 20% nas queixas de "Sobrecarga" precede historicamente picos de afastamento em 3 meses.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-lg transition-colors">
              Ver Relatório Completo
            </button>
          </div>
          {/* Background decoration */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
