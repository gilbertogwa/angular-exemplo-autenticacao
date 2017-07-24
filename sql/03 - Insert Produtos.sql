USE DbApiExemploAutenticacao

GO

DECLARE @TotalProdutos int  = 100,
        @Contador int = 0, 
		@CodigoProduto Varchar(50);

WHILE @Contador < @TotalProdutos
BEGIN

	SET @Contador = @Contador + 1;

	SET @CodigoProduto = CAST(@Contador AS VARCHAR) + '-' + CAST(Round(RAND() * 10000,0) AS varchar);

	INSERT INTO Produtos (Codigo, Descricao, Preco)
	Values('PD-' + @CodigoProduto, 'Produto ' + @CodigoProduto, Round(RAND() * 1000,2))

END

