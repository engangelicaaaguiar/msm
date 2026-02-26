import React from 'react';
import { Bell, Shield, User, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500">Gerencie suas preferências e integrações.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="p-6 flex items-start gap-4">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
            <User size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">Perfil Profissional</h3>
            <p className="text-sm text-slate-500 mb-4">Seus dados de registro (CRP) e assinatura digital.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" className="p-2 border border-slate-200 rounded-lg text-sm" placeholder="Nome Completo" defaultValue="Ricardo Silva" />
              <input type="text" className="p-2 border border-slate-200 rounded-lg text-sm" placeholder="Registro Profissional" defaultValue="CRP 06/12345" />
            </div>
          </div>
        </div>

        <div className="p-6 flex items-start gap-4">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
            <Shield size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">Segurança e LGPD</h3>
            <p className="text-sm text-slate-500 mb-4">Configurações de anonimato e retenção de dados.</p>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-slate-700">Trava de Anonimato (Mínimo 3 respondentes)</span>
              <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-slate-700">Autenticação de Dois Fatores (2FA)</span>
              <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex items-start gap-4">
          <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
            <Globe size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">Integrações</h3>
            <p className="text-sm text-slate-500 mb-4">Conexões com softwares de SST e Governo.</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">SOC - Software de Gestão</span>
                </div>
                <span className="text-xs text-emerald-600 font-bold uppercase">Conectado</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <span className="text-sm font-medium">eSocial (Gov.br)</span>
                </div>
                <button className="text-xs text-slate-600 font-bold uppercase hover:text-emerald-600">Conectar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
