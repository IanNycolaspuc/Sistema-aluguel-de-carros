-- Tabela base de usuários (herança JOINED)
CREATE TABLE IF NOT EXISTS usuarios (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(150) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    senha           VARCHAR(100) NOT NULL,
    tipo_usuario    VARCHAR(50),
    ativo           BOOLEAN DEFAULT TRUE,
    data_cadastro   TIMESTAMP,
    data_atualizacao TIMESTAMP
);

-- Tabela de endereços
CREATE TABLE IF NOT EXISTS enderecos (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    logradouro  VARCHAR(255) NOT NULL,
    numero      VARCHAR(20) NOT NULL,
    complemento VARCHAR(100),
    bairro      VARCHAR(100) NOT NULL,
    cidade      VARCHAR(100) NOT NULL,
    estado      VARCHAR(50) NOT NULL,
    cep         VARCHAR(20) NOT NULL
);

-- Tabela de clientes (JOINED com usuarios)
CREATE TABLE IF NOT EXISTS clientes (
    id              BIGINT PRIMARY KEY,  -- FK para usuarios
    rg              VARCHAR(14) NOT NULL,
    cpf             VARCHAR(14) NOT NULL,
    telefone        VARCHAR(20) NOT NULL,
    data_nascimento VARCHAR(20) NOT NULL,
    profissao       VARCHAR(100) NOT NULL,
    endereco_id     BIGINT,
    CONSTRAINT fk_clientes_usuario  FOREIGN KEY (id)          REFERENCES usuarios(id),
    CONSTRAINT fk_clientes_endereco FOREIGN KEY (endereco_id) REFERENCES enderecos(id)
);

-- Tabela de automóveis
CREATE TABLE IF NOT EXISTS automovel (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    marca     VARCHAR(100),
    modelo    VARCHAR(100),
    ano       INT,
    placa     VARCHAR(20),
    matricula VARCHAR(50),
    status    VARCHAR(50)
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id                 BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id         BIGINT,
    automovel_id       BIGINT,
    data_solicitacao   TIMESTAMP,
    data_fim_pretendida DATE,
    valor_previsto     DECIMAL(10,2),
    observacoes        VARCHAR(500),
    status             VARCHAR(50),
    agente_id          BIGINT
);