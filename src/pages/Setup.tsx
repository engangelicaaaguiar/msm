import React, { useState } from 'react';
import { 
  Building2, Users, FileSpreadsheet, ShieldCheck, UserCheck, 
  Briefcase, Lock, ChevronRight, ChevronLeft, Save, CheckCircle2, 
  AlertCircle, FileText, Layers, Plus, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Setup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    cnae: '',
    unidade: '',

    // Step 2: Size & Version
    employeeCount: '',
    copsoqVersion: '', // 'short', 'medium', 'long'

    // Step 3: Structure
    departments: [] as string[],
    roles: [] as string[],
    shifts: [] as string[],
    newDept: '',
    newRole: '',
    newShift: '',

    // Step 4: Demographics
    collectAge: true,
    collectGender: true,
    collectTenure: true,

    // Step 5: LGPD
    minRespondents: 3,
    tcleText: `DECLARAÇÃO DE CONSENTIMENTO LIVRE E ESCLARECIDO (TCLE)

Esta pesquisa tem como objetivo mapear os riscos psicossociais no ambiente de trabalho para fins de melhoria organizacional e cumprimento da Norma Regulamentadora 01 (NR-1).

GARANTIA DE ANONIMATO:
Suas respostas são confidenciais e protegidas por criptografia. Nenhuma resposta individual será compartilhada com a empresa. Os dados serão apresentados apenas de forma agrupada (estatística), garantindo que você não possa ser identificado(a).

BASE LEGAL:
A coleta de dados segue as diretrizes da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).`,

    // Step 6: Technical Responsible
    respName: '',
    respEmail: '',
    respRole: '',
    respRegister: ''
  });

  // Logic for COPSOQ Version based on employee count
  const handleEmployeeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    let version = '';
    if (count > 0 && count <= 50) version = 'short';
    else if (count > 50 && count <= 1000) version = 'medium';
    else if (count > 1000) version = 'long'; // Or medium, but defaulting to long for logic simplicity
    
    setFormData({ ...formData, employeeCount: e.target.value, copsoqVersion: version });
  };

  const addItem = (field: 'departments' | 'roles' | 'shifts', valueField: 'newDept' | 'newRole' | 'newShift') => {
    if (formData[valueField].trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], formData[valueField]],
        [valueField]: ''
      });
    }
  };

  const removeItem = (field: 'departments' | 'roles' | 'shifts', index: number) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    alert('Empresa cadastrada e parametrizada com sucesso!');
    // Redirect logic would go here
  };

  const steps = [
    { id: 1, title: 'Identificação', icon: Building2 },
    { id: 2, title: 'Porte & Versão', icon: FileSpreadsheet },
    { id: 3, title: 'Estrutura (GHE)', icon: Layers },
    { id: 4, title: 'Demografia', icon: Users },
    { id: 5, title: 'Privacidade', icon: ShieldCheck },
    { id: 6, title: 'Responsável', icon: UserCheck },
  ];

  const renderStep = () => {
    switch (step) {
      case 1: // Identificação
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Dados Cadastrais da Empresa</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Razão Social</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Nome Jurídico Completo"
                  value={formData.razaoSocial}
                  onChange={e => setFormData({...formData, razaoSocial: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome Fantasia</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Nome Comercial"
                  value={formData.nomeFantasia}
                  onChange={e => setFormData({...formData, nomeFantasia: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">CNPJ</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={e => setFormData({...formData, cnpj: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">CNAE Principal</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Código de Atividade Econômica"
                  value={formData.cnae}
                  onChange={e => setFormData({...formData, cnae: e.target.value})}
                />
                <p className="text-xs text-slate-500">Fundamental para cálculo do FAP e risco epidemiológico.</p>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Unidade / Filial (Opcional)</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Ex: Matriz - São Paulo"
                  value={formData.unidade}
                  onChange={e => setFormData({...formData, unidade: e.target.value})}
                />
              </div>
            </div>
          </motion.div>
        );

      case 2: // Porte & Versão
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Dimensionamento da Avaliação</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Número Total de Funcionários</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input 
                    type="number" 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Quantidade de vidas"
                    value={formData.employeeCount}
                    onChange={handleEmployeeCountChange}
                  />
                </div>
              </div>

              {formData.copsoqVersion && (
                <div className={`p-4 rounded-xl border ${
                  formData.copsoqVersion === 'short' ? 'bg-blue-50 border-blue-100 text-blue-800' :
                  formData.copsoqVersion === 'medium' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                  'bg-purple-50 border-purple-100 text-purple-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-lg">
                        {formData.copsoqVersion === 'short' && 'Versão Curta Selecionada'}
                        {formData.copsoqVersion === 'medium' && 'Versão Média Selecionada'}
                        {formData.copsoqVersion === 'long' && 'Versão Longa/Média Selecionada'}
                      </h4>
                      <p className="text-sm mt-1 opacity-90">
                        {formData.copsoqVersion === 'short' && 'Ideal para pequenas empresas. Foco em plano de ação coletivo imediato.'}
                        {formData.copsoqVersion === 'medium' && 'Permite comparação entre setores e identificação de vulnerabilidades específicas.'}
                        {formData.copsoqVersion === 'long' && 'Exige validação estatística robusta. Recomendado para grandes corporações.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 3: // Estrutura (GHE)
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Matriz de GHE (Grupos Homogêneos)</h3>
              <button className="text-sm text-emerald-600 font-medium hover:underline">Importar Planilha</button>
            </div>
            <p className="text-sm text-slate-500">Defina a estrutura para segmentar os riscos psicossociais.</p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Departamentos */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Building2 size={16} /> Departamentos
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 p-2 text-sm rounded border border-slate-200"
                    placeholder="Ex: Financeiro"
                    value={formData.newDept}
                    onChange={e => setFormData({...formData, newDept: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && addItem('departments', 'newDept')}
                  />
                  <button onClick={() => addItem('departments', 'newDept')} className="bg-slate-100 p-2 rounded hover:bg-emerald-100 text-slate-600 hover:text-emerald-600"><Plus size={18} /></button>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 h-48 overflow-y-auto space-y-1 border border-slate-100">
                  {formData.departments.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white px-2 py-1 rounded border border-slate-100 text-sm">
                      {item}
                      <button onClick={() => removeItem('departments', i)} className="text-slate-400 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  {formData.departments.length === 0 && <span className="text-xs text-slate-400 italic p-2">Nenhum departamento</span>}
                </div>
              </div>

              {/* Cargos */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Briefcase size={16} /> Cargos / Funções
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 p-2 text-sm rounded border border-slate-200"
                    placeholder="Ex: Analista Jr"
                    value={formData.newRole}
                    onChange={e => setFormData({...formData, newRole: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && addItem('roles', 'newRole')}
                  />
                  <button onClick={() => addItem('roles', 'newRole')} className="bg-slate-100 p-2 rounded hover:bg-emerald-100 text-slate-600 hover:text-emerald-600"><Plus size={18} /></button>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 h-48 overflow-y-auto space-y-1 border border-slate-100">
                  {formData.roles.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white px-2 py-1 rounded border border-slate-100 text-sm">
                      {item}
                      <button onClick={() => removeItem('roles', i)} className="text-slate-400 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  {formData.roles.length === 0 && <span className="text-xs text-slate-400 italic p-2">Nenhum cargo</span>}
                </div>
              </div>

              {/* Turnos */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Layers size={16} /> Turnos
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 p-2 text-sm rounded border border-slate-200"
                    placeholder="Ex: Noturno"
                    value={formData.newShift}
                    onChange={e => setFormData({...formData, newShift: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && addItem('shifts', 'newShift')}
                  />
                  <button onClick={() => addItem('shifts', 'newShift')} className="bg-slate-100 p-2 rounded hover:bg-emerald-100 text-slate-600 hover:text-emerald-600"><Plus size={18} /></button>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 h-48 overflow-y-auto space-y-1 border border-slate-100">
                  {formData.shifts.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white px-2 py-1 rounded border border-slate-100 text-sm">
                      {item}
                      <button onClick={() => removeItem('shifts', i)} className="text-slate-400 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  {formData.shifts.length === 0 && <span className="text-xs text-slate-400 italic p-2">Nenhum turno</span>}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4: // Demografia
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Filtros Demográficos</h3>
            <p className="text-slate-500">Selecione quais dados adicionais serão coletados para enriquecer a análise epidemiológica.</p>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.collectAge ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Faixa Etária</span>
                    <span className="text-sm text-slate-500">Ex: 18-25, 26-35, 36-50...</span>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-emerald-600" checked={formData.collectAge} onChange={e => setFormData({...formData, collectAge: e.target.checked})} />
              </label>

              <label className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.collectGender ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Gênero</span>
                    <span className="text-sm text-slate-500">Monitoramento de vulnerabilidades específicas.</span>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-emerald-600" checked={formData.collectGender} onChange={e => setFormData({...formData, collectGender: e.target.checked})} />
              </label>

              <label className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.collectTenure ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Tempo de Empresa</span>
                    <span className="text-sm text-slate-500">Comparativo: Recém-contratados vs. Veteranos.</span>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-emerald-600" checked={formData.collectTenure} onChange={e => setFormData({...formData, collectTenure: e.target.checked})} />
              </label>
            </div>
          </motion.div>
        );

      case 5: // Privacidade (LGPD)
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Privacidade e LGPD</h3>
            
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-900 flex items-center gap-2">
                    <Lock size={18} className="text-slate-600" />
                    Regra de Agrupamento Mínimo
                  </label>
                  <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-sm font-bold">{formData.minRespondents} pessoas</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="10" 
                  value={formData.minRespondents} 
                  onChange={e => setFormData({...formData, minRespondents: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <p className="text-sm text-slate-500 mt-2">
                  Setores com menos de <strong>{formData.minRespondents} respondentes</strong> terão seus dados fundidos automaticamente para garantir o anonimato.
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-900 flex items-center gap-2">
                  <FileText size={18} className="text-slate-600" />
                  Termo de Consentimento (TCLE)
                </label>
                <textarea 
                  className="w-full h-48 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm font-mono text-slate-600 leading-relaxed"
                  value={formData.tcleText}
                  onChange={e => setFormData({...formData, tcleText: e.target.value})}
                />
                <p className="text-xs text-slate-500">Este texto será apresentado obrigatoriamente antes do início da pesquisa.</p>
              </div>
            </div>
          </motion.div>
        );

      case 6: // Responsável Técnico
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Responsável Técnico do Projeto</h3>
            <p className="text-slate-500">Dados do profissional que responderá tecnicamente pelo Inventário de Riscos (PGR).</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Nome do Gestor"
                  value={formData.respName}
                  onChange={e => setFormData({...formData, respName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">E-mail Corporativo</label>
                <input 
                  type="email" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="email@empresa.com"
                  value={formData.respEmail}
                  onChange={e => setFormData({...formData, respEmail: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cargo / Função</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Ex: Eng. de Segurança / Psicólogo"
                  value={formData.respRole}
                  onChange={e => setFormData({...formData, respRole: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Registro Profissional</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="CRM / CRP / CREA"
                  value={formData.respRegister}
                  onChange={e => setFormData({...formData, respRegister: e.target.value})}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 mt-4">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
              <div className="text-sm text-blue-800">
                <p className="font-bold">Assinatura Digital</p>
                <p>O responsável técnico deverá assinar digitalmente o relatório final para validade jurídica.</p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Setup de Cliente</h1>
        <p className="text-slate-500">Parametrização completa para conformidade com NR-1 e LGPD.</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
        <div className="flex items-center min-w-max gap-4">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${step === s.id ? 'text-emerald-600 font-bold' : step > s.id ? 'text-emerald-500' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step === s.id ? 'bg-emerald-100' : step > s.id ? 'bg-emerald-500 text-white' : 'bg-slate-100'
                }`}>
                  {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                </div>
                <span className="text-sm whitespace-nowrap">{s.title}</span>
              </div>
              {i < steps.length - 1 && <div className="w-8 h-px bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center">
          <button 
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
            Voltar
          </button>

          {step < 6 ? (
            <button 
              onClick={() => setStep(prev => Math.min(6, prev + 1))}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              Próximo Passo
              <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-70"
            >
              {loading ? 'Processando...' : 'Finalizar Setup'}
              {!loading && <Save size={20} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
