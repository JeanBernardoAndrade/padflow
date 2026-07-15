# Escopo da Release 1.0 (MVP)

Este documento define estritamente as fronteiras de escopo para a primeira entrega comercializável do PanFlow. O foco está em validar o comportamento do motor de movimentações imutáveis e sanar a falta de visibilidade diária da padaria.

---

## 1. O que ENTRA (In-Scope)
*   **Gestão de Cadastros Essenciais:**
    *   Cadastro simplificado de produtos e categorias (via painel administrativo básico).
    *   Cadastro de funcionários (para assinatura digital dos registros).
*   **Motor de Movimentações (API & DB):**
    *   API Append-only para registros de Produção, Vendas, Consumo Interno e Perdas.
    *   View dinâmica para cálculo de saldo acumulado em tempo real por ID de produto.
*   **Interface Operacional (Front-end):**
    *   Tela unificada de lançamentos otimizada para toque/tablet.
    *   Bloqueio visual para transações que fariam o estoque ficar menor do que zero (RN005).
*   **Visualização de Dados (Dashboard):**
    *   Painel diário consolidando volumes produzidos, vendidos, consumidos e perdidos.
    *   Fórmula integrada do Custo de Desperdício baseada no Custo Médio do produto.

---

## 2. O que NÃO entra nesta versão (Out of Scope)
*   **Fechamento de Caixa Fiscal:** Integração direta com SAT, NFC-e ou TEF. O MVP registrará "Vendas Manuais" ou consumirá relatórios parciais de saída para conciliação.
*   **Gestão de Fórmulas e Receituário:** Dedução automática de insumos (farinha, ovos, açúcar) a partir da produção do produto final. O MVP monitora o estoque do produto pronto (unidades/peso), não da matéria-prima.
*   **Previsão Preditiva (IA/ML):** Sugestão automatizada de produção para o dia seguinte com base no clima ou histórico de vendas. Isso será desenvolvido na Release 2.0.

---

## 3. Critérios de Aceite Globais (Definition of Done - DoD)
1. **Zero perda de dados:** Todas as transações de movimentação na base devem conter as chaves estrangeiras (`produto_id`, `funcionario_id`) íntegras.
2. **Auditabilidade total:** Nenhuma movimentação pode ser deletada do banco de dados (regras RN009 e RN010 cobertas por testes automatizados).
3. **Desempenho aceitável:** O cálculo da View de disponibilidade atualizada para uma base com até 100 mil movimentações deve responder em menos de 100ms.