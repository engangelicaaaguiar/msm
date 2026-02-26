import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Info, Download } from 'lucide-react';
import { motion } from 'motion/react';

const HEATMAP_DATA = [
  { dept: 'TI / Dev', demands: 85, control: 40, support: 30, leadership: 60 },
  { dept: 'Comercial', demands: 92, control: 70, support: 50, leadership: 45 },
  { dept: 'Financeiro', demands: 60, control: 80, support: 85, leadership: 90 },
  { dept: 'RH', demands: 45, control: 60, support: 90, leadership: 85 },
  { dept: 'Operações', demands: 75, control: 30, support: 40, leadership: 50 },
];

const DOMAINS = [
  { key: 'demands', label: 'Exigências Quantitativas' },
  { key: 'control', label: 'Controle sobre o Trabalho' },
  { key: 'support', label: 'Suporte Social' },
  { key: 'leadership', label: 'Qualidade da Liderança' },
];

const getColor = (score: number) => {
  if (score >= 80) return 'bg-red-500 text-white'; // High Risk
  if (score >= 60) return 'bg-yellow-400 text-slate-900'; // Moderate Risk
  return 'bg-emerald-500 text-white'; // Low Risk
};

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Diagnóstico Clínico (COPSOQ III)</h1>
          <p className="text-slate-500">Mapa de calor e análise psicométrica por grupos homogêneos.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Download size={18} />
          Exportar Relatório Clínico
        </button>
      </div>

      {/* Heatmap Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Mapa de Calor de Riscos
          </h3>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500"></div> Baixo Risco</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400"></div> Risco Moderado</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500"></div> Alto Risco</div>
          </div>
        </div>
        
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Departamento (GHE)</th>
                {DOMAINS.map(d => (
                  <th key={d.key} className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider text-center">{d.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HEATMAP_DATA.map((row, i) => (
                <motion.tr 
                  key={row.dept}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">{row.dept}</td>
                  {DOMAINS.map(d => {
                    const score = row[d.key as keyof typeof row] as number;
                    return (
                      <td key={d.key} className="px-4 py-3 text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-8 rounded-lg font-bold ${getColor(score)}`}>
                          {score}
                        </div>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-6">Distribuição de Exigências Quantitativas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HEATMAP_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="demands" radius={[4, 4, 0, 0]}>
                  {HEATMAP_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.demands >= 80 ? '#ef4444' : entry.demands >= 60 ? '#facc15' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 mb-4">Insights Automáticos (IA)</h3>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3">
              <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-red-900 text-sm">Alerta Crítico: Comercial</h4>
                <p className="text-red-800 text-sm mt-1">
                  Combinação de <strong>Altas Exigências (92)</strong> e <strong>Baixo Suporte (50)</strong> indica risco iminente de Burnout (Síndrome de Esgotamento Profissional).
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex gap-3">
              <Info className="text-yellow-600 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-yellow-900 text-sm">Atenção: TI / Dev</h4>
                <p className="text-yellow-800 text-sm mt-1">
                  Baixo <strong>Controle sobre o Trabalho (40)</strong> pode reduzir a produtividade criativa. Recomendado rever autonomia das squads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
