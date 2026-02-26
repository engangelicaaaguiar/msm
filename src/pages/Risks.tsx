import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, FileCheck, Save } from 'lucide-react';
import { motion } from 'motion/react';

const RISK_FACTORS = [
  { id: 1, factor: 'Sobrecarga de Trabalho (Exigências Quantitativas)', source: 'Comercial', score: 92, probability: 'Alta' },
  { id: 2, factor: 'Baixo Suporte Social', source: 'Comercial', score: 50, probability: 'Média' },
  { id: 3, factor: 'Falta de Autonomia', source: 'TI / Dev', score: 40, probability: 'Alta' },
];

const SEVERITY_OPTIONS = [
  { value: 'leve', label: 'Leve (Desconforto temporário)' },
  { value: 'moderada', label: 'Moderada (Afastamento < 15 dias)' },
  { value: 'grave', label: 'Grave (Afastamento > 15 dias / Burnout)' },
  { value: 'catastrofica', label: 'Catastrófica (Invalidez / Suicídio)' },
];

export default function Risks() {
  const [assessments, setAssessments] = useState<Record<number, string>>({});

  const getRiskLevel = (prob: string, sev: string) => {
    if (!sev) return 'Pendente';
    if (sev === 'catastrofica' || (prob === 'Alta' && sev === 'grave')) return 'Crítico';
    if (sev === 'grave' || (prob === 'Alta' && sev === 'moderada')) return 'Substancial';
    if (sev === 'moderada' || (prob === 'Média' && sev === 'leve')) return 'Moderado';
    return 'Trivial';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Crítico': return 'bg-red-100 text-red-800 border-red-200';
      case 'Substancial': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Moderado': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Trivial': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Matriz de Risco NR-1</h1>
          <p className="text-slate-500">Transposição técnica: Psicologia → Engenharia de Segurança.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <FileCheck size={18} />
          Gerar Inventário de Riscos (PGR)
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ShieldAlert size={16} />
            <span>Valide a severidade clínica para calcular o nível de risco ocupacional.</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {RISK_FACTORS.map((risk) => {
            const severity = assessments[risk.id] || '';
            const riskLevel = getRiskLevel(risk.probability, severity);

            return (
              <motion.div 
                key={risk.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 grid lg:grid-cols-12 gap-6 items-center hover:bg-slate-50 transition-colors"
              >
                {/* Risk Source */}
                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{risk.factor}</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    Fonte: <span className="font-medium text-slate-700">{risk.source}</span> • Score COPSOQ: <span className="font-mono text-slate-700">{risk.score}</span>
                  </div>
                </div>

                {/* Probability (Auto) */}
                <div className="lg:col-span-2">
                  <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Probabilidade (Auto)</div>
                  <div className="font-medium text-slate-900">{risk.probability}</div>
                </div>

                {/* Arrow */}
                <div className="lg:col-span-1 flex justify-center text-slate-300">
                  <ArrowRight size={20} />
                </div>

                {/* Severity (Manual) */}
                <div className="lg:col-span-3">
                  <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Severidade (Clínica)</div>
                  <select 
                    className="w-full p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    value={severity}
                    onChange={(e) => setAssessments({...assessments, [risk.id]: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    {SEVERITY_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Result */}
                <div className="lg:col-span-2 text-right">
                  <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Nível de Risco</div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-bold border ${getRiskColor(riskLevel)}`}>
                    {riskLevel}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Save size={18} />
            Salvar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
}
