import React, { useState } from 'react';
import { Send, Lock, FileText, Smartphone, Mail, Eye, EyeOff, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Campaigns() {
  const [showTCLE, setShowTCLE] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Campanhas COPSOQ</h1>
          <p className="text-slate-500">Dispare avaliações e monitore a adesão em tempo real.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Send size={18} />
          Nova Campanha
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Campaign Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Campanha Q1-2026</h3>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Em Andamento</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-500 uppercase font-semibold">Adesão Total</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">68%</div>
                <div className="text-xs text-emerald-600 mt-1">Meta: 80%</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-500 uppercase font-semibold">Respondentes</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">342</div>
                <div className="text-xs text-slate-400 mt-1">de 500 elegíveis</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-500 uppercase font-semibold">Dias Restantes</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">12</div>
                <div className="text-xs text-slate-400 mt-1">Encerra em 15/03</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">Adesão por Departamento</span>
              </div>
              {[
                { label: 'TI / Desenvolvimento', val: 82, color: 'bg-emerald-500' },
                { label: 'Comercial', val: 45, color: 'bg-yellow-500' },
                { label: 'Financeiro', val: 60, color: 'bg-blue-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="text-slate-900 font-bold">{item.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Anonymity Lock & Tools */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lock size={100} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <Lock size={20} />
                <span className="font-bold text-sm uppercase tracking-wider">Trava de Anonimato</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                O sistema impede a identificação individual. Cruzamento de dados bloqueado para grupos com menos de 3 respondentes.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 p-2 rounded border border-slate-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                LGPD Compliance Ativo
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4">Ferramentas de Disparo</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded group-hover:bg-white transition-colors">
                    <Mail size={18} className="text-slate-600 group-hover:text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">Convite por E-mail</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded group-hover:bg-white transition-colors">
                    <Smartphone size={18} className="text-slate-600 group-hover:text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">Link via WhatsApp/SMS</span>
                </div>
              </button>
              <button 
                onClick={() => setShowTCLE(!showTCLE)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded group-hover:bg-white transition-colors">
                    <FileText size={18} className="text-slate-600 group-hover:text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">Visualizar TCLE</span>
                </div>
                {showTCLE ? <EyeOff size={16} className="text-slate-400" /> : <Eye size={16} className="text-slate-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TCLE Preview Modal (Inline for prototype) */}
      {showTCLE && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-slate-50 border border-slate-200 rounded-xl p-6"
        >
          <h4 className="font-bold text-slate-900 mb-2">Termo de Consentimento Livre e Esclarecido (TCLE) - Prévia</h4>
          <div className="prose prose-sm text-slate-600 max-w-none bg-white p-4 rounded border border-slate-200 h-48 overflow-y-auto">
            <p><strong>OBJETIVO:</strong> Esta pesquisa visa mapear riscos psicossociais no ambiente de trabalho para fins de melhoria organizacional e cumprimento da NR-1.</p>
            <p><strong>SIGILO:</strong> Suas respostas são confidenciais e protegidas por criptografia. Nenhuma resposta individual será compartilhada com a empresa. Os dados serão apresentados apenas de forma agrupada (estatística).</p>
            <p><strong>PARTICIPAÇÃO:</strong> Sua participação é voluntária, porém fundamental para a construção de um ambiente mais saudável.</p>
            <p><strong>TRATAMENTO DE DADOS:</strong> Os dados serão processados pela plataforma MSM-NR1 em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
