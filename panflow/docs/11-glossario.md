# Glossário de Termos - PanFlow

Este glossário define de forma inequívoca os termos de negócio e conceitos técnicos utilizados em todo o ecossistema do PanFlow, garantindo o alinhamento total entre desenvolvedores, analistas de BI e usuários finais.

---

### 1. Entidades de Negócio
* **Produto:** Qualquer item fabricado internamente (ex: Pão Francês, Bolo de Milho) ou revendido pela padaria (ex: Refrigerante Lata) que possua controle de estoque e disponibilidade.
* **Categoria:** Classificação lógica dos produtos para facilitar a organização, navegação e análises no dashboard (ex: Panificação, Confeitaria, Bebidas, Frios).
* **Funcionário:** Qualquer colaborador ativo na operação da padaria que possua autorização para realizar ou registrar movimentações.
* **Usuário:** Credencial de acesso ao sistema PanFlow, vinculada a um perfil de permissão específico (Administrador, Gerente, Operador).

### 2. Fluxos e Eventos de Estoque (Movimentações)
* **Movimentação:** Registro imutável de uma alteração física no estoque de um produto. Toda movimentação deve obrigatoriamente possuir um tipo, quantidade, data/hora, produto e responsável pelo registro.
* **Produção (Entrada):** Registro de entrada de novos itens prontos originados do setor de panificação/confeitaria (equivalente ao conceito de "nova fornada"). Aumenta a *Disponibilidade*.
* **Venda (Saída):** Registro de saída de produtos comercializados para o cliente final. Reduz a *Disponibilidade*.
* **Consumo Interno (Saída):** Registro de saída de produtos consumidos por funcionários, testes de qualidade da cozinha ou cortesias autorizadas pela gerência. Reduz a *Disponibilidade*.
* **Perda (Saída):** Registro de descarte de produtos por quebra operacional (ex: queimou no forno, caiu no chão), vencimento de validade ou sobra de prateleira não comercializada no fechamento do dia. Reduz a *Disponibilidade*.

### 3. Conceitos de Saldo e Inventário
* **Disponibilidade (Saldo Atual):** Quantidade física de um determinado produto disponível para venda em tempo real. Calculada de forma dinâmica através da fórmula:
  $$\text{Disponibilidade} = \sum(\text{Produção}) - \sum(\text{Vendas}) - \sum(\text{Consumo Interno}) - \sum(\text{Perdas})$$
* **Fornada:** Evento de produção em lote de um determinado produto de panificação que ocorre em um horário planejado do dia.
* **Fechamento Diário:** Evento de conciliação de estoque realizado ao final do dia operacional, onde a *Disponibilidade* sistêmica é confrontada com o inventário físico da loja, consolidando as métricas diárias e zerando ou ajustando o saldo inicial para o dia seguinte.