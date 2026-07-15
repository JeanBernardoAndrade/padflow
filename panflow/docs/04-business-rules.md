# Regras de Negócio (Business Rules) - PanFlow

Este documento reúne todas as regras de negócio lógicas e restrições de sistema que controlam as operações do PanFlow. Elas devem ser estritamente seguidas pelos desenvolvedores no momento da codificação das APIs e validações do banco de dados.

---

### Módulo de Estoque e Disponibilidade

#### RN001 - Impacto da Produção
Toda movimentação registrada com o tipo `PRODUCAO` deve **somar** à quantidade de disponibilidade do produto correspondente.

#### RN002 - Impacto da Venda
Toda movimentação registrada com o tipo `VENDA` deve **subtrair** da quantidade de disponibilidade do produto correspondente.

#### RN003 - Impacto do Consumo Interno
Toda movimentação registrada com o tipo `CONSUMO_INTERNO` deve **subtrair** da quantidade de disponibilidade do produto correspondente.

#### RN004 - Impacto de Perdas
Toda movimentação registrada com o tipo `PERDA` deve **subtrair** da quantidade de disponibilidade do produto correspondente.

#### RN005 - Saldo Não Negativo
A disponibilidade calculada de um produto nunca poderá ser inferior a zero ($Saldo \ge 0$). Caso uma tentativa de lançamento de saída (`VENDA`, `CONSUMO_INTERNO` ou `PERDA`) resulte em saldo negativo, o sistema deverá bloquear a operação e exigir que o usuário revise os lançamentos de produção pendentes ou registre um ajuste sob supervisão do gerente.

#### RN006 - Restrição de Produto Inativo
Não é permitido realizar qualquer movimentação (`PRODUCAO`, `VENDA`, `CONSUMO_INTERNO`, `PERDA`) para produtos marcados no cadastro com o status `INATIVO`.

---

### Módulo de Auditoria e Segurança

#### RN007 - Rastreabilidade Obrigatória
Toda e qualquer movimentação gerada pelo sistema deve possuir obrigatoriamente:
* Identificador único (ID do movimento)
* Identificador do Produto
* Identificador do Funcionário que realizou o registro
* Data e hora do registro (carimbo de data/hora do servidor)
* Tipo de movimentação (`PRODUCAO`, `VENDA`, `CONSUMO_INTERNO`, `PERDA`)
* Quantidade movimentada (sempre maior que zero)

#### RN008 - Registro de Auditoria (Audit Log)
O sistema deve armazenar logs de acessos, tentativas de lançamentos bloqueados e ações de fechamento de caixa por motivos de auditoria de segurança.

#### RN009 - Imutabilidade Física de Movimentos
Não é permitido editar (`UPDATE`) ou excluir (`DELETE`) registros da tabela de movimentações de estoque no banco de dados. Caso ocorra um erro de lançamento humano (ex: registrar 100 pães em vez de 10), o usuário deverá registrar um movimento de estorno (cancelamento) que represente a correção, justificando o motivo por escrito. O histórico original e o de correção devem permanecer visíveis para auditoria.

#### RN010 - Saldo Calculado (On-the-Fly)
O saldo de estoque atual (disponibilidade) de um produto nunca deverá ser armazenado de forma persistente e editável em uma coluna estática na tabela de `PRODUTOS`. O saldo atualizado deve ser dinamicamente calculado através da consolidação em tempo real das movimentações ativas registradas até o momento da consulta.