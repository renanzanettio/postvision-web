-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.12.0.7122
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para postvision
CREATE DATABASE IF NOT EXISTS `postvision` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `postvision`;

-- Copiando estrutura para tabela postvision.comentarios
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `texto_comentario` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id_comentario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela postvision.exercicios
CREATE TABLE IF NOT EXISTS `exercicios` (
  `id_exercicio` int(11) NOT NULL AUTO_INCREMENT,
  `nome_exercicio` varchar(191) NOT NULL,
  `descricao_exercicio` varchar(191) DEFAULT NULL,
  `grupo_muscular_exercicio` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id_exercicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela postvision.relatorios
CREATE TABLE IF NOT EXISTS `relatorios` (
  `id_relatorio` int(11) NOT NULL AUTO_INCREMENT,
  `quantidade_corretas_relatorio` double DEFAULT NULL,
  `quantidade_incorretas_relatorio` double DEFAULT NULL,
  `precisao_media_relatorio` double DEFAULT NULL,
  `id_sessao` int(11) NOT NULL,
  `id_comentario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_relatorio`),
  KEY `Relatorios_id_sessao_fkey` (`id_sessao`),
  KEY `Relatorios_id_comentario_fkey` (`id_comentario`),
  CONSTRAINT `Relatorios_id_comentario_fkey` FOREIGN KEY (`id_comentario`) REFERENCES `comentarios` (`id_comentario`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Relatorios_id_sessao_fkey` FOREIGN KEY (`id_sessao`) REFERENCES `sessaotreino` (`id_sessao`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela postvision.sessaotreino
CREATE TABLE IF NOT EXISTS `sessaotreino` (
  `id_sessao` int(11) NOT NULL AUTO_INCREMENT,
  `caminho_json_landmarks_sessao` varchar(191) DEFAULT NULL,
  `data_atual_sessao` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `duracao_sessao` varchar(191) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_exercicio` int(11) NOT NULL,
  PRIMARY KEY (`id_sessao`),
  KEY `SessaoTreino_id_usuario_fkey` (`id_usuario`),
  KEY `SessaoTreino_id_exercicio_fkey` (`id_exercicio`),
  CONSTRAINT `SessaoTreino_id_exercicio_fkey` FOREIGN KEY (`id_exercicio`) REFERENCES `exercicios` (`id_exercicio`) ON UPDATE CASCADE,
  CONSTRAINT `SessaoTreino_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela postvision.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(191) NOT NULL,
  `sobrenome_usuario` varchar(191) NOT NULL,
  `email_usuario` varchar(191) NOT NULL,
  `senha_usuario` varchar(191) NOT NULL,
  `data_nascimento_usuario` datetime(3) NOT NULL,
  `genero_usuario` varchar(191) NOT NULL,
  `cpf_usuario` varchar(191) NOT NULL,
  `telefone_usuario` varchar(191) NOT NULL,
  `created_at_usuario` datetime(3) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `Usuarios_email_usuario_key` (`email_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
