Markdown
# Wireframes e Fluxos de Tela (Baixa Fidelidade)

Este documento descreve a arquitetura de informação e a navegação estrutural do aplicativo web do PanFlow. A interface é focada em usabilidade *mobile-first* (tablets e smartphones) para operação em pé e ambientes dinâmicos.

---

## 1. Tela 1: Dashboard Operacional (Visão Gerente/Dono)

+-------------------------------------------------------------+
|  [PanFlow]                                        (Roberto) |
+-------------------------------------------------------------+
|  [ Hoje: 15/07/2026 ]                            [Atualizar]|
|                                                             |
|  +---------------------+   +---------------------+          |
|  | Produção do Dia     |   | Desperdício Acum.   |          |
|  | 350 itens           |   | 12.4% (Alvo < 5%)   |          |
|  +---------------------+   +---------------------+          |
|  +---------------------+   +---------------------+          |
|  | Vendas do Dia       |   | CMV Teórico         |          |
|  | R$ 1.450,00         |   | R$ 420,00           |          |
|  +---------------------+   +---------------------+          |
|                                                             |
|  Métricas em Tempo Real (Vitrine Ativa):                    |
|  - Pão Francês:   [  45 un disp ]  - Estável                |
|  - Pão de Queijo: [   2 un disp ]  - Crítico (Fornada já!)  |
|  - Bolo de Milho: [  12 un disp ]  - Alto Risco Sobra       |
|                                                             |
|  [+] Registrar Produção     [-] Registrar Perda/Saída       |
+-------------------------------------------------------------+


## 2. Tela 2: Registro de Movimentações Rápido (Visão Operador)

Esta tela é otimizada para tablets posicionados na parede da cozinha ou ao lado do balcão. Botões grandes de toque rápido eliminam a necessidade de teclado físico.

+-------------------------------------------------------------+
|  <- Voltar     [ REGISTRAR NOVA MOVIMENTAÇÃO ]              |
+-------------------------------------------------------------+
|  1. Selecione o Tipo de Fluxo:                              |
|  ( ) [PRODUÇÃO (Entrada)]       ( ) [PERDA/DESCARTE (Saída)]|
|  ( ) [CONSUMO INTERNO (Saída)]  ( ) [VENDA MANUAL (Saída)]  |
|                                                             |
|  2. Escolha o Produto:                                      |
|  +-----------------+  +-----------------+  +-------------+  |
|  |  Pão Francês    |  |  Pão de Queijo  |  |  Bolo Milho |  |
|  +-----------------+  +-----------------+  +-------------+  |
|  +-----------------+  +-----------------+  +-------------+  |
|  |  Croissant      |  |  Baguete        |  |  Outros...  |  |
|  +-----------------+  +-----------------+  +-------------+  |
|                                                             |
|  3. Quantidade:                                             |
|     [ - ]     [  50  ]     [ + ]     [ 10 ] [ 50 ] [ 100 ]  |
|                                                             |
|  4. Justificativa/Motivo (Apenas para perdas):              |
|  [ Selecione: Quebra / Validade / Sobra de Balcão      [v] ]|
|                                                             |
|  [ CONFIRMAR REGISTRO ]                                     |
+-------------------------------------------------------------+