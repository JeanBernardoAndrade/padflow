# Histórias de Usuário (User Stories) - PanFlow

Este documento contém as histórias de usuário que descrevem as interações com o PanFlow na Release 1.0. Elas utilizam o formato ágil tradicional e critérios de aceitação estruturados no padrão BDD (Behavior-Driven Development).

---

### US01 - Registro Rápido de Produção (Fornada)
**Como** Padeiro  
**Quero** registrar a quantidade de um produto produzido na cozinha de forma rápida  
**Para** atualizar a disponibilidade de produtos frescos na vitrine instantaneamente.

*   **Critério de Aceite 1:** Registro com poucos cliques.
    *   **Dado** que estou autenticado na tela do painel de produção;
    *   **Quando** eu selecionar o produto "Pão Francês", digitar a quantidade "50" e clicar em "Confirmar";
    *   **Então** o sistema deve salvar um registro de movimentação com tipo `PRODUCAO` e quantidade `50` associado ao meu funcionário;
    *   **E** a disponibilidade atualizada do Pão Francês deve refletir o acréscimo das 50 unidades.

*   **Critério de Aceite 2:** Impedir registro de produtos inativos.
    *   **Dado** que um produto está com o status `INATIVO`;
    *   **Quando** o sistema tentar registrar uma produção para ele;
    *   **Então** a operação deve ser bloqueada e uma mensagem explicativa deve ser exibida.

---

### US02 - Registro de Desperdício (Perdas)
**Como** Gerente ou Atendente  
**Quero** lançar o descarte de produtos da vitrine especificando o motivo  
**Para** que o proprietário saiba exatamente de onde vêm as perdas financeiras.

*   **Critério de Aceite 1:** Registro de perda com motivo obrigatório.
    *   **Dado** que estou na tela de perdas operacionais;
    *   **Quando** eu registrar a perda de "5" unidades de "Bolo de Milho" com o motivo "Sobra de Prateleira";
    *   **Então** o sistema deve debitar 5 unidades da disponibilidade calculada;
    *   **E** associar o motivo selecionado à justificativa da movimentação.

*   **Critério de Aceite 2:** Bloqueio de saldo negativo se aplicável.
    *   **Dado** que o saldo atual calculado de "Pão de Queijo" é de "2" unidades;
    *   **Quando** eu tentar registrar uma perda de "5" unidades;
    *   **Então** o sistema deve exibir um alerta informando saldo insuficiente e sugerir a revisão de lançamentos pendentes.

---

### US03 - Acompanhamento Diário (Dashboard Proprietário)
**Como** Proprietário da Padaria  
**Quero** visualizar um consolidado em tempo real da produção, vendas e perdas do dia  
**Para** monitorar a saúde operacional da minha loja de qualquer lugar.

*   **Critério de Aceite 1:** Atualização de métricas on-the-fly.
    *   **Dado** que acessei o dashboard operacional hoje;
    *   **Quando** uma nova movimentação do tipo `VENDA` ou `PERDA` for registrada no balcão;
    *   **Então** os gráficos e cartões de "Disponibilidade", "Venda Total" e "Taxa de Desperdício" devem se atualizar instantaneamente na tela.