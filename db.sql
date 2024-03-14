-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para el_dorado_db
DROP DATABASE IF EXISTS `el_dorado_db`;
CREATE DATABASE IF NOT EXISTS `el_dorado_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `el_dorado_db`;

-- Volcando estructura para tabla el_dorado_db.aerolinea
DROP TABLE IF EXISTS `aerolinea`;
CREATE TABLE IF NOT EXISTS `aerolinea` (
  `codaerolinea` int DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla el_dorado_db.aerolinea: ~6 rows (aproximadamente)
INSERT INTO `aerolinea` (`codaerolinea`, `descripcion`) VALUES
	(1, 'Avianca'),
	(2, 'Satena'),
	(3, 'Wingo'),
	(4, 'Latam'),
	(5, 'Ultra Air'),
	(6, 'Easyfly');

-- Volcando estructura para tabla el_dorado_db.destino
DROP TABLE IF EXISTS `destino`;
CREATE TABLE IF NOT EXISTS `destino` (
  `coddestino` int DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla el_dorado_db.destino: ~7 rows (aproximadamente)
INSERT INTO `destino` (`coddestino`, `descripcion`) VALUES
	(1, 'Armenia'),
	(2, 'Barranquilla'),
	(3, 'Cali'),
	(4, 'Cartagena'),
	(5, 'Medellin'),
	(6, 'Santa Marta'),
	(7, 'San Andres');

-- Volcando estructura para tabla el_dorado_db.pasajero
DROP TABLE IF EXISTS `pasajero`;
CREATE TABLE IF NOT EXISTS `pasajero` (
  `id` varchar(50) NOT NULL DEFAULT '',
  `nombres` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `telefono` varchar(50) NOT NULL DEFAULT '',
  `codvuelo` varchar(6) NOT NULL DEFAULT '0',
  `foto` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla el_dorado_db.pasajero: ~2 rows (aproximadamente)
INSERT INTO `pasajero` (`id`, `nombres`, `apellidos`, `email`, `telefono`, `codvuelo`, `foto`) VALUES
	('1116612267', 'Tatiana Andrea', 'Guzman Galindo', 'tatianaandrea3214@gmail.com', '3164802268', 'YDH961', '{}'),
	('1116612268', 'Edwin Santiago', 'Acevedo Forero', 'edwinsantiago3214@gmail.com', '3164802267', 'CTU6KF', '{}');

-- Volcando estructura para tabla el_dorado_db.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla el_dorado_db.usuario: ~1 rows (aproximadamente)
INSERT INTO `usuario` (`id`, `username`, `password`, `token`) VALUES
	(1, 'administrador', 'administrador', '');

-- Volcando estructura para tabla el_dorado_db.vuelo
DROP TABLE IF EXISTS `vuelo`;
CREATE TABLE IF NOT EXISTS `vuelo` (
  `codvuelo` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `coddestino` int NOT NULL,
  `codaerolinea` int NOT NULL,
  `salaabordaje` varchar(50) NOT NULL DEFAULT '0',
  `horasalida` time NOT NULL,
  `horallegada` time NOT NULL,
  PRIMARY KEY (`codvuelo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla el_dorado_db.vuelo: ~3 rows (aproximadamente)
INSERT INTO `vuelo` (`codvuelo`, `coddestino`, `codaerolinea`, `salaabordaje`, `horasalida`, `horallegada`) VALUES
	('CTU6KF', 3, 3, 'B2', '13:30:00', '15:15:00'),
	('YCQJVL', 6, 5, 'E5', '11:55:00', '13:55:00'),
	('YDH961', 2, 2, 'C3', '10:00:00', '11:55:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
