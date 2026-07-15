# Catálogo de Métricas e Indicadores (KPIs)

Este documento define matematicamente cada métrica exibida nos dashboards do PanFlow. Ele serve como especificação direta para o desenvolvimento das queries e views de Business Intelligence (BI).

---

### 1. Indicadores de Volume Operacional

#### M01: Produção Total do Dia
* **Descrição:** Quantidade total de itens de um produto produzidos (assados/preparados) na data corrente.
* **Fórmula:**
  $$Produção\_Total\_Dia = \sum_{t=0}^{now} Quantidade\_Movimentada \text{ onde } Tipo = 'PRODUCAO'$$
* **Objetivo:** Avaliar a capacidade e ritmo produtivo da cozinha.

#### M02: Vendas Totais do Dia
* **Descrição:** Quantidade total de itens de um produto comercializados na data corrente.
* **Fórmula:**
  $$Vendas\_Totais\_Dia = \sum_{t=0}^{now} Quantidade\_Movimentada \text{ onde } Tipo = 'VENDA'$$
* **Objetivo:** Acompanhar o escoamento dos produtos na vitrine.

#### M03: Disponibilidade Atual (Saldo de Vitrine)
* **Descrição:** Volume de estoque disponível no momento para comercialização imediata.
* **Fórmula:**
  $$Disponibilidade = \sum(PRODUCAO) - \sum(VENDA) - \sum(CONSUMO\_INTERNO) - \sum(PERDA)$$
* **Objetivo:** Fornecer feedback visual rápido para reposição de balcão.

---

### 2. Indicadores de Desperdício e Eficiência

#### M04: Perda Total do Dia
* **Descrição:** Soma de todas as quantidades descartadas de um produto ao longo do dia operacional.
* **Fórmula:**
  $$Perda\_Total\_Dia = \sum_{t=0}^{now} Quantidade\_Movimentada \text{ onde } Tipo = 'PERDA'$$
* **Objetivo:** Monitorar o desperdício físico de alimentos.

#### M05: Taxa de Desperdício (%)
* **Descrição:** A relação percentual entre o volume perdido e o volume total que esteve disponível para venda no dia.
* **Fórmula:**
  $$Taxa\_Desperdicio = \left( \frac{Perda\_Total\_Dia}{Produção\_Total\_Dia + Saldo\_Inicial\_Dia} \right) \times 100$$
* **Objetivo:** Indicar a ineficiência do planejamento de produção (Meta: < 5%).

#### M06: Custo Teórico do Desperdício ($)
* **Descrição:** O impacto financeiro estimado gerado pelas perdas do dia a preço de custo (ou preço estimado de produção).
* **Fórmula:**
  $$Custo\_Desperdicio = \sum \left( Quantidade\_Perdida \times Preço\_Custo\_Produto \right)$$
* **Objetivo:** Sensibilizar financeiramente a equipe e proprietários sobre o impacto das sobras.

---

### 3. Indicadores de Consumo de Apoio

#### M07: Consumo Interno do Dia
* **Descrição:** Quantidade de produtos retirada para consumo de funcionários ou testes de qualidade.
* **Fórmula:**
  $$Consumo\_Interno\_Dia = \sum_{t=0}^{now} Quantidade\_Movimentada \text{ onde } Tipo = 'CONSUMO\_INTERNO'$$
* **Objetivo:** Isolar o consumo interno das perdas operacionais inevitáveis, garantindo precisão no cálculo do CMV (Custo de Mercadoria Vendida).