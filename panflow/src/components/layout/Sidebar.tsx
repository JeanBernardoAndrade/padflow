import { Link, useLocation } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Package, 
  ChefHat, 
  ShoppingBag, 
  Users, 
  Settings, 
  AlertTriangle, 
  Coffee,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Produtos', icon: Package, to: '/produtos' },
    { label: 'Produção', icon: ChefHat, to: '/producao' },
    { label: 'Vendas', icon: ShoppingBag, to: '/vendas' },
    { label: 'Consumo Interno', icon: Coffee, to: '/consumo' },
    { label: 'Perdas', icon: AlertTriangle, to: '/perdas' },
    { label: 'Funcionários', icon: Users, to: '/funcionarios' },
    { label: 'Configurações', icon: Settings, to: '/configuracoes' },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed bottom-0 top-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-amber-600">
            <ChefHat className="h-6 w-6" />
            <span>PanFlow</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}