import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardPage } from '@/pages/dashboard';
import { ProdutosPage } from '@/pages/produtos';
import { FuncionariosPage } from '@/pages/funcionarios';
import { ProducaoPage } from '@/pages/producao';
import { VendasPage } from '@/pages/vendas';
import { ConsumoPage } from '@/pages/consumo';
import { PerdasPage } from '@/pages/perdas';
import { ConfiguracoesPage } from '@/pages/configuracoes';

// Rota Raiz (Carrega o Layout Base do SaaS)
const rootRoute = createRootRoute({
  component: AppLayout,
});

// Rotas Filhas
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: DashboardPage });
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dashboard', component: DashboardPage });
const produtosRoute = createRoute({ getParentRoute: () => rootRoute, path: '/produtos', component: ProdutosPage });
const funcionariosRoute = createRoute({ getParentRoute: () => rootRoute, path: '/funcionarios', component: FuncionariosPage });
const producaoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/producao', component: ProducaoPage });
const vendasRoute = createRoute({ getParentRoute: () => rootRoute, path: '/vendas', component: VendasPage });
const consumoRoute = createRoute({ getParentRoute: () => rootRoute, path: '/consumo', component: ConsumoPage });
const perdasRoute = createRoute({ getParentRoute: () => rootRoute, path: '/perdas', component: PerdasPage });
const configuracoesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/configuracoes', component: ConfiguracoesPage });

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  produtosRoute,
  funcionariosRoute,
  producaoRoute,
  vendasRoute,
  consumoRoute,
  perdasRoute,
  configuracoesRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}