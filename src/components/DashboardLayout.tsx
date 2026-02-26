import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, FileBarChart, ShieldAlert, Settings, LogOut, Menu, X, CheckCircle2, Sliders } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-emerald-50 text-emerald-700" 
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    <Icon size={20} className={cn("transition-colors", active ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600")} />
    <span className="font-medium text-sm">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isOpen ? 240 : 0, opacity: isOpen ? 1 : 0 }}
        className="bg-white border-r border-slate-200 flex-shrink-0 fixed inset-y-0 left-0 z-20 overflow-hidden lg:relative"
      >
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-lg tracking-tight text-slate-900">MSM-NR1</span>
        </div>

        <div className="px-3 py-2 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Gestão</div>
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Visão Geral" active={location.pathname === '/dashboard'} />
          <NavItem to="/dashboard/setup" icon={Building2} label="Empresas & Setup" active={location.pathname === '/dashboard/setup'} />
          <NavItem to="/dashboard/campaigns" icon={FileBarChart} label="Campanhas COPSOQ" active={location.pathname === '/dashboard/campaigns'} />
          
          <div className="px-3 py-2 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Análise & Risco</div>
          <NavItem to="/dashboard/analytics" icon={FileBarChart} label="Diagnóstico Clínico" active={location.pathname === '/dashboard/analytics'} />
          <NavItem to="/dashboard/risks" icon={ShieldAlert} label="Matriz de Risco NR-1" active={location.pathname === '/dashboard/risks'} />
          <NavItem to="/dashboard/actions" icon={CheckCircle2} label="Plano de Ação & eSocial" active={location.pathname === '/dashboard/actions'} />
          
          <div className="px-3 py-2 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sistema</div>
          <NavItem to="/dashboard/copsoq-config" icon={Sliders} label="Configuração COPSOQ" active={location.pathname === '/dashboard/copsoq-config'} />
          <NavItem to="/settings" icon={Settings} label="Configurações" active={location.pathname === '/settings'} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-red-600 transition-colors w-full">
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-slate-900">Dr. Ricardo Silva</div>
              <div className="text-xs text-slate-500">Psicólogo Ocupacional</div>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://picsum.photos/seed/doctor/200" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
