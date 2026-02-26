import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Briefcase, Camera, ArrowRight, Check, ChevronLeft, Upload, ShieldCheck } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    code: ['', '', '', '', '', ''],
    password: '',
    confirmPassword: '',
    fullName: '',
    cpf: '',
    phone: '',
    crp: '',
    crpRegion: '',
    photo: null as string | null
  });

  const handleNext = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    setStep(prev => prev + 1);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...formData.code];
    newCode[index] = value;
    setFormData({ ...formData, code: newCode });
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const finishSignup = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Email
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Crie sua conta</h2>
              <p className="text-slate-500">Comece informando seu e-mail profissional.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-slate-400" size={20} />
                <input 
                  type="email" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="seu.nome@empresa.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  autoFocus
                />
              </div>
            </div>
            <button 
              onClick={handleNext}
              disabled={!formData.email || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continuar <ArrowRight size={20} /></>}
            </button>
          </motion.div>
        );

      case 2: // Verification
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Verifique seu e-mail</h2>
              <p className="text-slate-500">Enviamos um código de 6 dígitos para <span className="font-medium text-slate-900">{formData.email}</span></p>
            </div>
            <div className="flex justify-center gap-2">
              {formData.code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && i > 0) {
                      document.getElementById(`code-${i - 1}`)?.focus();
                    }
                  }}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={formData.code.some(d => !d) || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verificar Código'}
            </button>
            <button onClick={() => setStep(1)} className="w-full text-slate-500 text-sm hover:text-emerald-600 transition-colors">
              Reenviar código ou alterar e-mail
            </button>
          </motion.div>
        );

      case 3: // Password
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Defina sua senha</h2>
              <p className="text-slate-500">Crie uma senha forte para proteger seus dados.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="Repita a senha"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleNext}
              disabled={!formData.password || formData.password !== formData.confirmPassword || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Definir Senha'}
            </button>
          </motion.div>
        );

      case 4: // Personal Data
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Dados Pessoais</h2>
              <p className="text-slate-500">Precisamos saber quem é você.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="Ex: Ricardo Silva"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">CPF</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={e => setFormData({...formData, cpf: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Celular</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleNext}
              disabled={!formData.fullName || !formData.cpf || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Continuar'}
            </button>
          </motion.div>
        );

      case 5: // Professional Data
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Dados Profissionais</h2>
              <p className="text-slate-500">Validação do registro no Conselho de Psicologia.</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Região</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                    value={formData.crpRegion}
                    onChange={e => setFormData({...formData, crpRegion: e.target.value})}
                  >
                    <option value="">UF</option>
                    <option value="SP">SP</option>
                    <option value="RJ">RJ</option>
                    <option value="MG">MG</option>
                    {/* Add others */}
                  </select>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Número CRP</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="00/00000"
                      value={formData.crp}
                      onChange={e => setFormData({...formData, crp: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                <ShieldCheck className="text-blue-600 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-bold">Validação Automática</p>
                  <p>Seu registro será validado junto à base do CFP para garantir a emissão de laudos oficiais.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleNext}
              disabled={!formData.crp || !formData.crpRegion || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Validar Registro'}
            </button>
          </motion.div>
        );

      case 6: // Photo
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Sua Foto de Perfil</h2>
              <p className="text-slate-500">Adicione uma foto profissional para seus pacientes e relatórios.</p>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-6 py-4">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-slate-300" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full shadow-md group-hover:scale-110 transition-transform">
                  <Camera size={18} />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2 mx-auto"
                >
                  <Upload size={18} />
                  Carregar imagem
                </button>
                <p className="text-xs text-slate-400 mt-2">JPG ou PNG. Máximo 2MB.</p>
              </div>
            </div>

            <button 
              onClick={finishSignup}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Concluir Cadastro <Check size={20} /></>}
            </button>
            <button onClick={finishSignup} className="w-full text-slate-500 text-sm hover:text-slate-700 transition-colors">
              Pular por enquanto
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      {/* Left Panel - Branding */}
      <div className="lg:w-1/2 bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900 font-bold">M</div>
            <span className="font-bold text-xl tracking-tight">MSM-NR1</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            A revolução da <span className="text-emerald-400">Saúde Mental</span> corporativa começa com você.
          </h1>
          <p className="text-slate-400 text-lg max-w-md">
            Junte-se a milhares de psicólogos que estão transformando o bem-estar em estratégia de negócio com a MSM-NR1.
          </p>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold">
                  <User size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-white block">+2.000 Psicólogos</span>
              <span className="text-slate-400">já utilizam a plataforma</span>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {step > 1 && (
            <button 
              onClick={() => setStep(prev => prev - 1)}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-sm font-medium mb-8 transition-colors"
            >
              <ChevronLeft size={16} />
              Voltar
            </button>
          )}

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-emerald-500' : 'bg-slate-200'}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
