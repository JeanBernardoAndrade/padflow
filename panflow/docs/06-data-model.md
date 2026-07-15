# Modelo Conceitual e Físico de Dados

O modelo de dados do PanFlow foi projetado para priorizar a velocidade de gravação dos eventos no banco e a rastreabilidade absoluta de auditoria. Ele segue o padrão relacional (SQL) e foi modelado em conformidade com as regras de normalização, exceto onde a performance de agregação de BI exija estruturas otimizadas.

---

## 1. Diagrama Entidade-Relacionamento (Conceitual)

* Uma **CATEGORIA** possui muitos **PRODUTOS** (1:N).
* Um **PRODUTO** possui muitas **MOVIMENTAÇÕES** (1:N).
* Um **FUNCIONÁRIO** realiza muitas **MOVIMENTAÇÕES** (1:N).

---

## 2. Esquema Físico (DDL - SQL ANSI)

```sql
-- Criar tabelas de cadastro de apoio
CREATE TABLE categorias (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    id VARCHAR(36) PRIMARY KEY,
    categoria_id VARCHAR(36) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    codigo_barras VARCHAR(50) NULL,
    preco_venda DECIMAL(10, 2) NOT NULL,
    preco_custo DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO', -- ATIVO, INATIVO
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE funcionarios (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cargo VARCHAR(50) NOT NULL, -- PADEIRO, GERENTE, ATENDENTE, ADMIN
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO', -- ATIVO, INATIVO
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transações de estoque (Append-Only)
CREATE TABLE movimentacoes (
    id VARCHAR(36) PRIMARY KEY,
    produto_id VARCHAR(36) NOT NULL,
    funcionario_id VARCHAR(36) NOT NULL,
    tipo_movimentacao VARCHAR(30) NOT NULL, -- PRODUCAO, VENDA, CONSUMO_INTERNO, PERDA
    quantidade DECIMAL(10, 3) NOT NULL, -- Suporte a pesáveis (ex: 1.550 kg de pão de queijo)
    justificativa TEXT NULL, -- Obrigatória em cancelamentos e perdas específicas
    data_hora_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
);

-- Índices recomendados para performance de agregação e cálculos de saldo on-the-fly
CREATE INDEX idx_movimentacoes_produto ON movimentacoes(produto_id);
CREATE INDEX idx_movimentacoes_tipo ON movimentacoes(tipo_movimentacao);
CREATE INDEX idx_movimentacoes_data ON movimentacoes(data_hora_registro);



CREATE VIEW view_disponibilidade_atual AS
SELECT 
    p.id AS produto_id,
    p.nome AS produto_nome,
    c.nome AS categoria_nome,
    COALESCE(SUM(CASE WHEN m.tipo_movimentacao = 'PRODUCAO' THEN m.quantidade ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN m.tipo_movimentacao IN ('VENDA', 'CONSUMO_INTERNO', 'PERDA') THEN m.quantidade ELSE 0 END), 0) AS saldo_disponivel
FROM produtos p
INNER JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN movimentacoes m ON p.id = m.produto_id
WHERE p.status = 'ATIVO'
GROUP BY p.id, p.nome, c.nome;


---

# docs/12-decision-log.md

```markdown
# Registro de Decisões de Arquitetura (Architecture Decision Records)

Este log registra as decisões técnicas cruciais tomadas durante a concepção do PanFlow, apresentando os contextos, alternativas analisadas, decisões tomadas e seus impactos futuros.

---

## ADR-01: Modelo de Banco de Dados Orientado a Eventos (Append-Only)

### Contexto
Sistemas tradicionais de estoque comumente armazenam uma coluna estática `quantidade_estoque` na tabela de produtos e fazem operações de adição/subtração via `UPDATE`. No entanto, em operações dinâmicas como o varejo de panificação, esse modelo causa problemas crônicos como:
1. Deadlocks de banco de dados em horários de pico sob alta concorrência de requisições.
2. Perda completa de rastreabilidade de estoque (não há histórico do porquê o número mudou).
3. Dificuldade de auditoria em casos de perdas por desvios.

### Decisão Tomada
Adotamos um modelo de banco de dados **Append-Only** (Somente Inserção) para a tabela de movimentações de estoque. A tabela `movimentacoes` atuará como um log imutável de eventos. O saldo disponível de estoque nunca é editado, mas sim calculado em tempo de execução agregando-se os valores de entradas e saídas.

### Consequências
* **Positivas:**
  * Performance extrema para escritas (inserções simples `INSERT` em vez de atualizações bloqueantes `UPDATE`).
  * Histórico de auditoria completo nativo: o BI pode gerar o estado exato de estoque em qualquer minuto ou hora do passado.
  * Sem risco de concorrência corromper o estoque físico.
* **Negativas / Desafios:**
  * O cálculo do saldo atual em consultas de leitura (`SELECT`) consome mais processamento à medida que a tabela de movimentos cresce.
  * **Mitigação do Desafio:** Criação de índices específicos na coluna de chaves estrangeiras e, no futuro, implementação de buffers de fechamento diário de estoque para consolidar dados históricos e evitar escaneamentos de tabela de anos anteriores.

---

## ADR-02: Uso de IDs do Tipo UUIDv4 no Banco de Dados

### Contexto
Em ambientes de padaria, a conexão com a internet ou o sinal de rede interna podem falhar pontualmente em pontos de venda e tablets de produção. Se utilizássemos chaves primárias do tipo sequencial numérico autoincrementável (`INT AUTOINCREMENT`), as requisições precisariam necessariamente de confirmação do banco central para gerar um ID válido para a transação, inviabilizando operações de cache locais (offline).

### Decisão Tomada
Todas as tabelas do sistema utilizarão chaves primárias geradas via UUIDv4 (`VARCHAR(36)` ou `UUID` nativo do banco).

### Consequências
* **Positivas:**
  * Permite que aplicações móveis clientes gerem as chaves primárias localmente (offline) e as sincronizem de forma assíncrona com o servidor sem riscos de colisões de chaves.
  * Desacoplamento da geração de ID em relação à infraestrutura de banco de dados.
* **Negativas:**
  * UUIDv4 ocupa maior espaço em disco e prejudica a indexação primária nativa em bancos relacionais comparados a chaves numéricas simples. No entanto, para a escala física de transações de uma padaria, o impacto de performance em disco é perfeitamente aceitável e desprezível diante da flexibilidade de integridade de dados obtida.