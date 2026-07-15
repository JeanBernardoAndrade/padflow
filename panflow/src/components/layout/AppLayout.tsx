import { useState } from 'react';
import { Outlet } from '@tanstack/react-router';
import { Sidebar } from '@/components/layout/Sidebar';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:px-8">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-slate-500 focus:outline-none lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <User className="h-4 w-4" />
              <span>{user?.email ?? 'Gestor PanFlow'}</span>
            </div>
            <button 
              onClick={signOut}
              className="p-2 text-slate-500 hover:text-rose-600 dark:text-slate-400"
              title="Sair do Sistema"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Área de Conteúdo */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white/50 py-4 text-center text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-950/50">
          PanFlow © {new Date().getFullYear()} — Inteligência e Controle em Panificação.
        </footer>
      </div>
    </div>
  );
}