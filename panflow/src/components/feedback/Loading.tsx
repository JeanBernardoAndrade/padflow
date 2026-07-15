import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      <span className="text-sm font-medium text-slate-500">Carregando dados...</span>
    </div>
  );
}