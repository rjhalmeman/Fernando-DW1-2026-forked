no postgresql

--Crie um banco de dados chamado dw1-db-2026

--Neste banco de dados, crie uma tabela chamada produto (em public).



CREATE TABLE public.produto (
    id_produto SERIAL PRIMARY KEY,
    nome_produto VARCHAR(60) NOT NULL,
    quantidade_produto INT NOT NULL,
    quantidade_minima_produto INT NOT NULL,
    quantidade_maxima_produto INT NOT NULL
);

INSERT INTO public.produto (nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto) VALUES 
('Armas funcionais', 250, 350, 1050),
('Comida (em kg)', 30, 50, 100),
('Munição de diversas armas', 7000, 10000, 15000),
('Tropas', 18000, 20000, 50000);