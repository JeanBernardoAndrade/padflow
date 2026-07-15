Markdown
# Processo da Padaria - Mapeamento de Fluxos

Este documento mapeia o ciclo de vida operacional diário de um produto dentro da padaria, detalhando cada etapa, seus responsáveis, entradas, saídas e regras aplicadas.

   [ Planejamento ] ──► [ Produção ] ──► [ Disponibilidade ] ──► [ Venda / Consumo / Perda ] ──► [ Fechamento ] ──► [ Dashboard ]

---

## Detalhamento das Etapas

### 1. Planejamento (Abertura do Dia)
* **Descrição:** Definição da quantidade estimada de produção para o dia com base no dia da semana, histórico de vendas e condições climáticas.
* **Entradas:** Histórico de vendas (BI), saldo remanescente do dia anterior.
* **Saídas:** Grade de produção do dia (metas de fornadas por produto).
* **Responsável:** Gerente.
* **Regras Associadas:** Apenas produtos ativos no cadastro podem ser incluídos na meta de produção.

### 2. Produção (Entrada)
* **Descrição:** O ato físico de assar, confeitar ou preparar o produto e disponibilizá-lo na área de vendas.
* **Entradas:** Matéria-prima (insumos), ordem de produção interna.
* **Saídas:** Produto acabado e pronto para consumo.
* **Responsável:** Padeiro / Confeiteiro.
* **Regras Associadas:** Cada lote finalizado deve ser imediatamente registrado no sistema como um movimento de **Produção** para atualizar a disponibilidade física na vitrine.

### 3. Disponibilidade (Estoque em Tempo Real)
* **Descrição:** O estado em que o produto se encontra exposto ao cliente, aguardando uma ação de saída.
* **Entradas:** Movimentações de Produção (+).
* **Saídas:** Movimentações de Venda, Consumo Interno ou Perda (-).
* **Responsável:** Atendente / Gerente.
* **Regras Associadas:** O saldo do produto na vitrine reflete exatamente a soma acumulada de entradas menos saídas. Este saldo nunca pode ser menor que zero.

### 4. Venda (Saída Ativa)
* **Descrição:** A comercialização do produto para o cliente final no balcão ou caixa.
* **Entradas:** Produto disponível na vitrine.
* **Saídas:** Produto entregue ao cliente; geração de receita financeira.
* **Responsável:** Atendente / Operador de Caixa.
* **Regras Associadas:** Toda venda gera um movimento de **Venda**, reduzindo instantaneamente a disponibilidade.

### 5. Consumo Interno (Saída Operacional)
* **Descrição:** Retirada de produtos para alimentação de funcionários, testes de qualidade da cozinha ou ações de cortesia autorizadas.
* **Entradas:** Produto disponível na vitrine.
* **Saídas:** Produto consumido; custo operacional registrado.
* **Responsável:** Atendente / Padeiro (sob autorização do Gerente).
* **Regras Associadas:** Deve ser registrado no momento exato da retirada física, informando o funcionário beneficiado/responsável.

### 6. Perda (Saída por Desperdício)
* **Descrição:** Descarte físico do produto devido a quebras operacionais (ex: queimou no forno), data de validade vencida ou sobras de prateleira não comercializáveis ao final do dia.
* **Entradas:** Produto disponível na vitrine ou estoque de retaguarda.
* **Saídas:** Descarte do produto físico.
* **Responsável:** Atendente / Gerente.
* **Regras Associadas:** A perda deve ser categorizada no lançamento (Quebra Operacional, Validade ou Sobra de Balcão) para permitir análises precisas de desperdício no BI.

### 7. Fechamento Diário (Sincronização)
* **Descrição:** Processo de encerramento das atividades do dia, onde o estoque físico remanescente na vitrine é contado e confrontado com a disponibilidade calculada pelo sistema.
* **Entradas:** Contagem física final dos produtos.
* **Saídas:** Lançamento automático de perdas por "Sobra de Balcão" para os produtos que não serão reaproveitados no dia seguinte; zeramento ou transporte de saldo de produtos não perecíveis.
* **Responsável:** Gerente.
* **Regras Associadas:** Após o fechamento do dia, nenhuma nova movimentação pode ser inserida com data retroativa sem autorização do nível Administrador.

### 8. Dashboard (Visualização de Dados)
* **Descrição:** Consolidação em tempo real de todas as movimentações ocorridas para exibição gráfica de performance operacional.
* **Entradas:** Log de movimentações imutáveis.
* **Saídas:** Indicadores visuais de produtividade, perdas, vendas e CMV teórico.
* **Responsável:** Proprietário (Leitura) / Gerente (Leitura).