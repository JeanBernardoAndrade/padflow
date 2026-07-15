# Visão do Produto - PanFlow

## 1. O Problema
Padarias de médio e pequeno porte operam em um ambiente de altíssimo dinamismo, onde a produção é descentralizada e o consumo de estoque ocorre em múltiplos canais (venda direta, consumo interno, perdas operacionais, produção de buffet, etc.). 

Atualmente, o proprietário e o gerente enfrentam os seguintes gargalos:
* **Falta de visibilidade em tempo real:** O saldo de estoque e a disponibilidade de produtos frescos na vitrine são gerenciados de forma visual ou intuitiva, sem registro sistêmico imediato.
* **Vazamento de margem invisível:** Perdas por validade, excesso de produção (sobras de balcão) e consumo interno não registrado corroem silenciosamente o lucro diário.
* **Falta de rastreabilidade de estoque:** Dificuldade em conciliar o que foi efetivamente assado (produzido) com o que foi vendido ou descartado.

## 2. Público-Alvo
* Proprietários de padarias, confeitarias e panificadoras artesanais.
* Gerentes de produção e gerentes de loja.
* Operadores de frente de loja (atendentes) e equipe de produção (padeiros/confeiteiros).

## 3. A Solução (PanFlow)
O **PanFlow** é um Sistema Inteligente de Gestão da Produção Diária projetado especificamente para a dinâmica ágil de padarias. Ele atua como um hub simplificado de eventos de estoque. Através de uma interface extremamente simples, rápida e adaptada para dispositivos móveis ou tablets na área de produção/balcão, o sistema registra cada movimentação de entrada, saída, perda e consumo. 

Em vez de focar em módulos complexos de ERP tradicionais, o PanFlow foca na **liquidez do estoque do dia**, gerando um motor de movimentações auditável que alimenta dashboards operacionais em tempo real.

## 4. Diferenciais Competitivos
* **Foco na Usabilidade Operacional:** Registro de produção e perdas em menos de 3 cliques (adequado para o ambiente de cozinha, onde as mãos costumam estar ocupadas).
* **Arquitetura Event-Driven Simplificada:** O saldo de estoque não é um campo estático na tabela de produtos; ele é a soma consolidada de um fluxo contínuo de eventos de movimentação. Isso garante rastreabilidade e auditoria completas.
* **Orientação a Dados (BI Native):** Estrutura de dados pensada desde o primeiro dia para alimentar análises de desperdício, eficiência de fornada e comportamento de vendas diárias.

## 5. Objetivos
* Reduzir em até 30% o desperdício por excesso de produção nas primeiras 8 semanas de uso.
* Garantir acurácia de 98% no estoque de produtos de alta rotatividade.
* Fornecer ao proprietário uma visão clara do lucro bruto diário consolidado até às 20h de cada dia.

## 6. Não Objetivos (Fora do Escopo)
* Emissão de Notas Fiscais de Consumidor Eletrônicas (NFC-e) — o sistema consome ou espelha dados de venda, mas não atua como PDV fiscal homologado.
* Gestão de compras e cotações com fornecedores.
* Controle de folha de pagamento de funcionários.

## 7. Roadmap Macro
* **Sprint -1:** Product Discovery (Fase Atual)
* **Sprint 0:** Configuração de Infraestrutura, Setup do Banco de Dados e Arquitetura Base
* **Release 1.0 (MVP):** Gestão essencial de movimentações (Produção, Vendas Manuais, Consumo, Perdas) e Dashboard Diário.
* **Release 2.0:** Alertas inteligentes de reposição (Previsibilidade de demanda baseada no histórico).

## 8. Métricas de Sucesso do Produto
* **Adoção Diária (DAU):** Frequência de uso das telas de registro por parte dos padeiros e atendentes.
* **Tempo Médio de Lançamento (MTTR):** Tempo que um funcionário leva para registrar uma perda ou uma nova fornada (alvo: < 10 segundos).
* **Acurácia de Inventário:** Divergência percentual entre o estoque sistêmico e o estoque físico verificado no fechamento diário.