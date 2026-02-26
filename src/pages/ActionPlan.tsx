import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, FileInput, UploadCloud, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const CRITICAL_RISKS = [
  { id: 1, factor: 'Sobrecarga de Trabalho', area: 'Comercial', level: 'Crítico', action: '' },
  { id: 3, factor: 'Falta de Autonomia', area: 'TI / Dev', level: 'Substancial', action: '' },
];

export default function ActionPlan() {
  const [actions, setActions] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<number[]>([]);

  const handleSubmit = (id: number) => {
    setSubmitted([...submitted, id]);
    // Simulate API call
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Plano de Ação & eSocial</h1>
        <p className="text-slate-500">Defina medidas de controle para os riscos identificados e envie os eventos S-2240/S-2220.</p>
      </div>

      <div className="grid gap-6">
        {CRITICAL_RISKS.map((risk) => (
          <motion.div 
            key={risk.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg ${risk.level === 'Crítico' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{risk.factor}</h3>
                  <div className="text-sm text-slate-500 mt-1">
                    Setor: <span className="font-medium">{risk.area}</span> • Nível: <span className="font-bold">{risk.level}</span>
                  </div>
                </div>
              </div>
              {submitted.includes(risk.id) && (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-bold">
                  <CheckCircle2 size={16} />
                  Plano Registrado
                </div>
              )}
            </div>

            <div className="p-6">
              {!submitted.includes(risk.id) ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Medida de Controle (PDCA)</label>
                    <textarea 
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      rows={3}
                      placeholder="Descreva a ação preventiva (ex: Redimensionamento de metas, contratação de staff, treinamento de liderança...)"
                      value={actions[risk.id] || ''}
                      onChange={e => setActions({...actions, [risk.id]: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Responsável</label>
                      <input type="text" className="w-full p-2 rounded-lg border border-slate-200" placeholder="Nome do Gestor" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Prazo</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input type="date" className="w-full pl-10 p-2 rounded-lg border border-slate-200" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={() => handleSubmit(risk.id)}
                      disabled={!actions[risk.id]}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      Registrar Ação
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 space-y-2">
                  <div className="text-sm text-slate-900 font-medium">Ação Definida:</div>
                  <p className="text-slate-600 text-sm italic">"{actions[risk.id]}"</p>
                  <div className="pt-4 flex items-center gap-4 border-t border-emerald-100 mt-4">
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-emerald-600 transition-colors">
                      <FileInput size={16} />
                      Vincular ao Prontuário (SOC)
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-emerald-600 transition-colors">
                      <UploadCloud size={16} />
                      Enviar Evento S-2240
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
