# Modelo de Domínio (Domain Model) - PanFlow

Este documento descreve a modelagem tática do domínio do PanFlow utilizando os conceitos de **Domain-Driven Design (DDD)**. Ele abstrai a tecnologia e foca nas responsabilidades, comportamentos e limites do negócio.


┌────────────────────────────────────────────────────────┐
 │                   AGREGADO: MOVIMENTAÇÃO               │
 │                                                        │
 │   ┌───────────────────────┐    ┌───────────────────┐   │
 │   │ Movimentacao (Entity) │───►│ TipoMovimentacao  │   │
 │   │                       │    │ (Value Object)    │   │
 │   └───────────┬───────────┘    └───────────────────┘   │
 │               │                                        │
 │               ▼                                        │
 │   ┌───────────────────────┐                            │
 │   │ Quantidade            │                            │
 │   │ (Value Object)        │                            │
 │   └───────────────────────┘                            │
 └───────────────┬────────────────────────────────────────┘
                 │
                 │ (Referência por ID)
                 ▼
 ┌────────────────────────────────────────────────────────┐
 │                   AGREGADO: PRODUTO                    │
 │                                                        │
 │   ┌───────────────────────┐    ┌───────────────────┐   │
 │   │ Produto (Root Entity) │───►│ Categoria         │   │
 │   │                       │    │ (Entity)          │   │
 │   └───────────────────────┘    └───────────────────┘   │
 └────────────────────────────────────────────────────────┘


 ---

## 1. Limites de Contexto (Bounded Contexts)

O sistema PanFlow é estruturado em torno de dois contextos principais:
1. **Core Context (Gestão de Fluxo de Estoque):** Responsável por registrar os eventos de movimentação física do inventário e garantir que as regras de integridade (como saldo não negativo) sejam respeitadas em tempo de execução.
2. **Supporting Context (Cadastro de Apoio):** Responsável pela manutenção de produtos, categorias e funcionários.
3. **Generic Context (Análise & BI):** Responsável por consumir os eventos consolidados e expor métricas operacionais históricas e em tempo real.

---

## 2. Entidades, Agregados e Objetos de Valor (Value Objects)

### Agregado: Produto
O ciclo de vida de um item que pode ser estocado ou comercializado.
* **Produto (Root Entity):** Representa o item físico à venda ou fabricado.
  * *Atributos:* `ID`, `Nome`, `Código de Barras (opcional)`, `Preço de Venda`, `Preço de Custo`, `Status (Ativo/Inativo)`.
  * *Comportamentos:* Ativar, inativar, alterar preços.
* **Categoria (Entity):** Classificação do produto.
  * *Atributos:* `ID`, `Nome`.

### Agregado: Movimentação
A representação de qualquer evento que altere a disponibilidade física de um produto. Este é o agregado mais crítico para a performance de escrita e leitura do sistema.
* **Movimentacao (Root Entity):** O fato imutável ocorrido na operação da padaria.
  * *Atributos:* `ID`, `ProdutoID`, `FuncionarioID`, `Quantidade`, `TipoMovimentacao`, `DataHoraRegistro`, `Justificativa`.
  * *Invariante de Domínio:* Uma movimentação é criada estritamente com dados preenchidos e válidos. Ela nunca pode ser alterada ou deletada após a persistência.
* **TipoMovimentacao (Value Object):** Enumeração fechada que define as saídas e entradas válidas no domínio.
  * *Valores válidos:* `PRODUCAO`, `VENDA`, `CONSUMO_INTERNO`, `PERDA`.
* **Quantidade (Value Object):** Tipo complexo que encapsula a quantidade física e impede valores negativos ou nulos no domínio.

### Agregado: Funcionário
Representação do usuário operador que assina e se responsabiliza pelas ações.
* **Funcionario (Root Entity):**
  * *Atributos:* `ID`, `Nome`, `Cargo` (`PADEIRO`, `GERENTE`, `ATENDENTE`, `ADMIN`), `Status`.