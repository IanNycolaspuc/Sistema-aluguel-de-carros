-- Usuários base
INSERT INTO usuarios (nome, email, senha, tipo_usuario, ativo, data_cadastro, data_atualizacao) VALUES
('Admin Sistema',   'admin@carrental.com',   'admin123',  'ADMIN',   TRUE, NOW(), NOW()),
('Agente João',     'joao@carrental.com',    'agente123', 'AGENTE',  TRUE, NOW(), NOW()),
('Maria Silva',     'maria@carrental.com',   'senha123',  'CLIENTE', TRUE, NOW(), NOW()),
('Carlos Souza',    'carlos@carrental.com',  'senha123',  'CLIENTE', TRUE, NOW(), NOW()),
('Ana Pereira',     'ana@carrental.com',     'senha123',  'CLIENTE', TRUE, NOW(), NOW());

-- Endereços
INSERT INTO enderecos (logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES
('Rua das Flores',      '123', 'Apto 10', 'Centro',        'Belo Horizonte', 'MG', '30100-000'),
('Av. Afonso Pena',     '456', NULL,      'Savassi',        'Belo Horizonte', 'MG', '30130-001'),
('Rua da Bahia',        '789', 'Casa 2',  'Lourdes',        'Belo Horizonte', 'MG', '30160-010');

-- Clientes (id deve bater com o id do usuário correspondente na tabela usuarios)
INSERT INTO clientes (id, rg, cpf, telefone, data_nascimento, profissao, endereco_id) VALUES
(3, '12.345.678-9', '123.456.789-00', '(31) 99999-1111', '1990-05-15', 'Engenheira',  1),
(4, '98.765.432-1', '987.654.321-00', '(31) 99999-2222', '1985-08-22', 'Contador',    2),
(5, '11.222.333-4', '111.222.333-00', '(31) 99999-3333', '1995-12-01', 'Professora',  3);

-- Automóveis
INSERT INTO automovel (marca, modelo, ano, placa, matricula, status) VALUES
('Toyota',     'Corolla',  2022, 'ABC-1234', 'MAT001', 'DISPONIVEL'),
('Honda',      'Civic',    2021, 'DEF-5678', 'MAT002', 'DISPONIVEL'),
('Volkswagen', 'Polo',     2023, 'GHI-9012', 'MAT003', 'ALUGADO'),
('Chevrolet',  'Onix',     2022, 'JKL-3456', 'MAT004', 'DISPONIVEL'),
('Hyundai',    'HB20',     2021, 'MNO-7890', 'MAT005', 'MANUTENCAO'),
('Fiat',       'Cronos',   2023, 'PQR-1122', 'MAT006', 'DISPONIVEL');

-- Pedidos de aluguel
INSERT INTO pedidos (cliente_id, automovel_id, data_solicitacao, data_fim_pretendida, valor_previsto, observacoes, status, agente_id) VALUES
(3, 3, NOW(), '2026-04-20', 450.00,  'Cliente solicitou seguro completo', 'APROVADO',  2),
(4, 1, NOW(), '2026-04-18', 320.00,  NULL,                                'PENDENTE',  2),
(5, 2, NOW(), '2026-04-25', 600.00,  'Viagem a trabalho',                 'PENDENTE',  NULL);