CREATE TABLE `tb_categoria` (
	`idcategoria` BIGINT NOT NULL AUTO_INCREMENT,
	`nome_categoria` varchar(255) NOT NULL,
	`causa` varchar(255) NOT NULL,
	`status` BOOLEAN NOT NULL,
	PRIMARY KEY (`idcategoria`)
);

CREATE TABLE `tb_produto` (
	`idproduto` BIGINT NOT NULL AUTO_INCREMENT,
	`nome_produto` varchar(255) NOT NULL,
	`preco_produto` DECIMAL(10,2) NOT NULL,
	`descricao` TEXT(300) NOT NULL,
	`img_produto` varchar(255) NOT NULL,
	`categoria_id` BIGINT NOT NULL,
    FOREIGN KEY (`categoria_id`)
	REFERENCES `tb_categoria`(`idcategoria`),
	PRIMARY KEY (`idproduto`)
);

CREATE TABLE `tb_usuario` (
	`idusuario` BIGINT NOT NULL AUTO_INCREMENT,
	`nome_completo` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`senha` varchar(10) NOT NULL,
	PRIMARY KEY (`idusuario`)
);



