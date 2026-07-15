# Backlog de Produto de Engenharia - PanFlow

Decomposição funcional para planejamento técnico das equipes de banco de dados, backend e frontend.

---

## [EP01 - INFRAESTRUTURA E ARQUITETURA DE DADOS]
*   **CAP01: Setup Técnico & Configuração**
    *   **FEAT01-1:** Configuração do repositório Git, ambiente Docker, scripts de migração do banco de dados.
        *   *Task backend:* Criar infraestrutura inicial e tabelas de acordo com `06-data-model.md`.
        *   *Task backend:* Implementar índices de performance de data/hora e produto.
    *   **FEAT01-2:** Implementação do motor de cálculo de saldo.
        *   *Task database:* Criar e validar a view `view_disponibilidade_atual`.
        *   *Task backend:* Criar endpoint `/api/produtos/disponibilidade` consumindo a view de saldo.

## [EP02 - REGISTRO DE EVENTOS DE ESTOQUE]
*   **CAP02: API de Movimentação**
    *   **FEAT02-1:** Criação da rota de lançamentos imutáveis.
        *   *Task backend:* Criar endpoint `POST /api/movimentacoes` aplicando restrições de imutabilidade (sem rotas PUT ou DELETE).
        *   *Task backend:* Adicionar validação de saldo não negativo (RN005) em transações concorrentes.
*   **CAP03: Interface de Lançamento**
    *   **FEAT03-1:** Front-end mobile-first para operação.
        *   *Task frontend:* Desenvolver tela de seleção rápida de fluxos e produtos (Wireframe 2).
        *   *Task frontend:* Integrar botões de lançamento ágil com a API de movimentações.

## [EP03 - EXIBIÇÃO OPERACIONAL E INSIGHTS]
*   **CAP04: Dashboard de Visibilidade Diária**
    *   **FEAT04-1:** Métricas analíticas diárias.
        *   *Task backend/BI:* Estruturar queries baseadas no `13-metric-catalog.md` (M01 a M07).
        *   *Task frontend:* Desenvolver tela principal (Wireframe 1) exibindo cards consolidados e tabela de alertas de vitrine crítica.