import React, { useState } from 'react';
import { 
  BookOpen, Calculator, Activity, AlertTriangle, 
  CheckCircle2, ChevronDown, ChevronRight, Info, 
  Settings, Sliders, FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data Definitions based on Fiocruz/COPSOQ III
const VERSIONS = {
  short: { label: 'Versão Curta', desc: 'Para empresas até 50 funcionários. Foco em dimensões críticas.', dimensions: 15 },
  medium: { label: 'Versão Média', desc: 'Para empresas de 51 a 1000 funcionários. Diagnóstico setorial.', dimensions: 25 },
  long: { label: 'Versão Longa', desc: 'Para empresas acima de 1000 funcionários. Análise profunda.', dimensions: 32 }
};

const DOMAINS_LONG = [
  {
    id: 1,
    title: "Exigências e Demandas do Trabalho",
    color: "bg-red-50 text-red-700 border-red-200",
    dimensions: [
      { name: "Exigências Quantitativas", desc: "Relação entre volume de tarefas e tempo disponível." },
      { name: "Exigências Cognitivas", desc: "Necessidade de concentração, memória e decisões complexas." },
      { name: "Exigências Emocionais", desc: "Esforço para lidar com emoções próprias e de terceiros (clientes/colegas)." }
    ]
  },
  {
    id: 2,
    title: "Organização do Trabalho e Conteúdo",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dimensions: [
      { name: "Influência e Autonomia", desc: "Controle do trabalhador sobre ritmo, pausas e métodos." },
      { name: "Possibilidade de Desenvolvimento", desc: "Oportunidades de aprendizado e uso de habilidades." },
      { name: "Significado do Trabalho", desc: "Percepção de importância e propósito da função." }
    ]
  },
  {
    id: 3,
    title: "Relações Interpessoais e Liderança",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dimensions: [
      { name: "Qualidade da Liderança", desc: "Suporte, feedback e clareza fornecidos pelos gestores." },
      { name: "Apoio Social", desc: "Rede de ajuda e colaboração entre colegas." },
      { name: "Justiça Organizacional", desc: "Imparcialidade na distribuição de tarefas e recompensas." },
      { name: "Capital Social", desc: "Nível de confiança mútua e cooperação vertical/horizontal." }
    ]
  },
  {
    id: 4,
    title: "Interface Trabalho-Família e Saúde",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    dimensions: [
      { name: "Conflito Trabalho-Família", desc: "Impacto das exigências laborais na vida pessoal." },
      { name: "Saúde Geral e Bem-Estar", desc: "Indicadores de Burnout, estresse, vitalidade e satisfação." }
    ]
  }
];

export default function CopsoqConfig() {
  const [activeTab, setActiveTab] = useState<'structure' | 'calc' | 'matrix'>('structure');
  const [selectedVersion, setSelectedVersion] = useState<'short' | 'medium' | 'long'>('long');

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configuração COPSOQ & NR-1</h1>
        <p className="text-slate-500">Definição metodológica, motor de cálculo e matriz de riscos.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('structure')}
          className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'structure' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <BookOpen size={18} />
          Estrutura e Dimensões
        </button>
        <button 
          onClick={() => setActiveTab('calc')}
          className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'calc' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Calculator size={18} />
          Motor de Cálculo
        </button>
        <button 
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'matrix' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Activity size={18} />
          Matriz de Risco NR-1
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[500px]">
        
        {/* TAB 1: STRUCTURE */}
        {activeTab === 'structure' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
            <div className="flex gap-4 mb-6">
              {(Object.keys(VERSIONS) as Array<keyof typeof VERSIONS>).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVersion(v)}
                  className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${selectedVersion === v ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`font-bold ${selectedVersion === v ? 'text-emerald-800' : 'text-slate-700'}`}>{VERSIONS[v].label}</span>
                    {selectedVersion === v && <CheckCircle2 size={18} className="text-emerald-600" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{VERSIONS[v].desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <FileText className="text-emerald-600" />
                Domínios e Dimensões ({VERSIONS[selectedVersion].label})
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {DOMAINS_LONG.map((domain) => (
                  <div key={domain.id} className={`rounded-xl border p-5 ${domain.color}`}>
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-xs border border-current">{domain.id}</span>
                      {domain.title}
                    </h3>
                    <ul className="space-y-3">
                      {domain.dimensions.map((dim, i) => (
                        <li key={i} className="bg-white/60 p-3 rounded-lg text-sm backdrop-blur-sm">
                          <strong className="block text-slate-900">{dim.name}</strong>
                          <span className="text-slate-600 text-xs">{dim.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: CALCULATION */}
        {activeTab === 'calc' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-8">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-slate-900">Matemática do Sistema</h2>
                <p className="text-slate-500">Conversão de Escala Likert para Score Padronizado (0-100).</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sliders size={20} className="text-emerald-600" />
                  Lógica de Conversão
                </h3>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {[
                    { label: 'Nunca / Discordo Totalmente', val: 0, color: 'bg-slate-200' },
                    { label: 'Raramente / Discordo', val: 25, color: 'bg-emerald-100 text-emerald-700' },
                    { label: 'Às vezes / Neutro', val: 50, color: 'bg-yellow-100 text-yellow-700' },
                    { label: 'Frequentemente / Concordo', val: 75, color: 'bg-orange-100 text-orange-700' },
                    { label: 'Sempre / Concordo Totalmente', val: 100, color: 'bg-red-100 text-red-700' },
                  ].map((item) => (
                    <div key={item.val} className="space-y-2">
                      <div className={`h-12 rounded-lg flex items-center justify-center font-bold ${item.color}`}>
                        {item.val} pts
                      </div>
                      <p className="text-xs text-slate-500 leading-tight">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800">
                <Info size={24} className="flex-shrink-0" />
                <div className="text-sm">
                  <strong>Cálculo do Score da Dimensão:</strong>
                  <p className="mt-1">
                    O sistema calcula a <strong>Média Aritmética</strong> das respostas de todos os colaboradores de um Grupo Homogêneo de Exposição (GHE).
                    <br />
                    <code className="bg-white/50 px-2 py-0.5 rounded mt-1 inline-block">Score = (∑ Pontos Individuais) / Nº Respondentes</code>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: MATRIX NR-1 */}
        {activeTab === 'matrix' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Integração com Matriz de Risco NR-1</h2>
              <p className="text-slate-500">O "Pulo do Gato": Transformando psicologia em engenharia de segurança.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Step A */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">A</div>
                  Definição da Probabilidade (Automático)
                </div>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Score (0-100)</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-600">Probabilidade NR-1</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 font-mono text-emerald-600">0 - 33</td>
                        <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">BAIXA</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-yellow-600">34 - 66</td>
                        <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">MÉDIA</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-red-600">67 - 100</td>
                        <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">ALTA</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step B */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">B</div>
                  Matriz de Decisão (PGR)
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="text-xs">
                      <span className="block text-slate-500">Prob. Baixa + Severidade Leve</span>
                      <strong className="text-emerald-700">RISCO TRIVIAL</strong>
                    </div>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Monitorar</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="text-xs">
                      <span className="block text-slate-500">Prob. Média + Severidade Moderada</span>
                      <strong className="text-yellow-700">RISCO MODERADO</strong>
                    </div>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Planejar</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border-l-4 border-l-red-500 shadow-sm">
                    <div className="text-xs">
                      <span className="block text-slate-500">Prob. Alta + Severidade Grave</span>
                      <strong className="text-red-700">RISCO CRÍTICO</strong>
                    </div>
                    <span className="text-xs bg-red-100 px-2 py-1 rounded text-red-700 font-bold">Ação Imediata</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-bold">Aviso de Privacidade (LGPD)</p>
                <p>O sistema bloqueia automaticamente a visualização de scores individuais. Apenas médias agregadas por GHE são utilizadas para a geração da matriz de risco, garantindo o anonimato dos colaboradores.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
