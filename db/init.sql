-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para proyecto
CREATE DATABASE IF NOT EXISTS `proyecto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto`;

-- Creación del usuario saal y asignación de permisos
CREATE USER IF NOT EXISTS 'saal'@'%' IDENTIFIED BY 'dosu';
GRANT ALL PRIVILEGES ON `proyecto`.* TO 'saal'@'%';
FLUSH PRIVILEGES;

-- Volcando estructura para tabla proyecto.bus
CREATE TABLE IF NOT EXISTS `bus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plate_num` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `join_date` date NOT NULL,
  `km_count` int NOT NULL,
  `last_serv` date NOT NULL,
  `num_seat` int NOT NULL,
  `delist` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.bus: ~5 rows (aproximadamente)
INSERT INTO `bus` (`id`, `plate_num`, `model`, `join_date`, `km_count`, `last_serv`, `num_seat`, `delist`) VALUES
	(1, '1234ABC', 'Sprinter 2008', '2026-03-24', 365000, '2026-03-24', 45, 0),
	(2, '5678DEF', 'B12 2016', '2026-03-24', 235620, '2026-03-24', 30, 1),
	(3, '9012GHI', 'Setra 2016', '2026-03-24', 15340, '2026-03-24', 50, 0),
	(4, '3456JKL', 'Otokar Model 3', '2026-03-26', 0, '2026-03-26', 22, 0),
	(5, '3423XYZ', 'Seat Córdoba 2005', '2026-04-13', 0, '2026-04-13', 3, 0),
	(6, '234DFG', 'Irizar i8', '2026-05-02', 0, '2026-05-02', 43, 0);

-- Volcando estructura para tabla proyecto.doctrine_migration_versions
CREATE TABLE IF NOT EXISTS `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Volcando datos para la tabla proyecto.doctrine_migration_versions: ~0 rows (aproximadamente)
INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
	('DoctrineMigrations\\Version20251203000851', '2025-12-03 00:09:08', 293),
	('DoctrineMigrations\\Version20260323033027', '2026-03-23 03:33:53', 64);

-- Volcando estructura para tabla proyecto.messenger_messages
CREATE TABLE IF NOT EXISTS `messenger_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750` (`queue_name`,`available_at`,`delivered_at`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.messenger_messages: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto.route_stations
CREATE TABLE IF NOT EXISTS `route_stations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `route_id` int NOT NULL,
  `station_id` int NOT NULL,
  `position` int NOT NULL,
  `time_to_next` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_59DB3DC234ECB4E6` (`route_id`),
  KEY `IDX_59DB3DC221BDB235` (`station_id`),
  CONSTRAINT `FK_59DB3DC221BDB235` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`),
  CONSTRAINT `FK_59DB3DC234ECB4E6` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.route_stations: ~8 rows (aproximadamente)
INSERT INTO `route_stations` (`id`, `route_id`, `station_id`, `position`, `time_to_next`) VALUES
	(1, 1, 1, 1, '00:00:00'),
	(3, 1, 2, 4, '00:00:00'),
	(5, 2, 4, 1, '02:00:00'),
	(6, 2, 5, 2, '01:30:00'),
	(8, 2, 6, 4, '01:30:00'),
	(9, 2, 7, 5, '01:10:00'),
	(10, 2, 8, 6, '00:00:00'),
	(11, 2, 1, 3, '01:20:00');

-- Volcando estructura para tabla proyecto.routes
CREATE TABLE IF NOT EXISTS `routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delist` tinyint(1) NOT NULL,
  `highlight` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.routes: ~3 rows (aproximadamente)
INSERT INTO `routes` (`id`, `name`, `delist`, `highlight`) VALUES
	(1, 'Línea 13', 0, 0),
	(2, 'Ruta del Sur', 0, 1),
	(3, 'Ruta del Sur 2', 1, 0);

-- Volcando estructura para tabla proyecto.station
CREATE TABLE IF NOT EXISTS `station` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delist` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.station: ~8 rows (aproximadamente)
INSERT INTO `station` (`id`, `name`, `location`, `address`, `phone`, `city`, `delist`) VALUES
	(1, 'Granada buses', '37.19965433039412, -3.6135445698261894', 'Av. de Juan Pablo IV, 77, Norte, 18014 Granada', '616161616', 'Granada', 0),
	(2, 'Granada - Estación de tren', '37.18397863542101, -3.6091798205538037', 'Av. de Andaluces, 20, Beiro, 18014 Granada', '616161616', 'Granada', 1),
	(3, 'fgsdfgsdfg', 'fgsfgsgsf', 'sfdgsdfgsdg', '616161616', 'fsgdfgs', 1),
	(4, 'Plaza de Armas', '37.39284295591541, -6.004581442673919', 'Puente del Cristo de la Expiración, 2, Casco Antiguo, 41001 Sevilla', '616161616', 'Sevilla', 0),
	(5, 'Antequera Bus', '37.02319156778228, -4.56247016951063', 'Paseo García del Olmo S/N', '616161616', 'Antequera', 0),
	(6, 'Estación de Autobuses de Baza', '37.492336955904754, -2.775169841107975', 'Av. Reyes Católicos, S/N, 18800 Baza, Granada', '616161616', 'Baza', 0),
	(7, 'Buses Lorca', '37.67146672132577, -1.6967843137667313', 'C. José Espinosa Pomares, 30800 Lorca, Murcia', '968469270', 'Lorca', 0),
	(8, 'Estación de Buses de Murcia', '37.98618567821426, -1.1390791895436045', 'C. Sierra Pila, 5, 30005 Murcia', '616161616', 'Murcia', 0);

-- Volcando estructura para tabla proyecto.station_routes
CREATE TABLE IF NOT EXISTS `station_routes` (
  `station_id` int NOT NULL,
  `routes_id` int NOT NULL,
  PRIMARY KEY (`station_id`,`routes_id`),
  KEY `IDX_FD37D15521BDB235` (`station_id`),
  KEY `IDX_FD37D155AE2C16DC` (`routes_id`),
  CONSTRAINT `FK_FD37D15521BDB235` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_FD37D155AE2C16DC` FOREIGN KEY (`routes_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.station_routes: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `travel_id` int NOT NULL,
  `from_id_id` int NOT NULL,
  `to_id_id` int NOT NULL,
  `seat` int NOT NULL,
  `uid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `departure` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arrival` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_97A0ADA37E3C61F9` (`owner_id`),
  KEY `IDX_97A0ADA3ECAB15B3` (`travel_id`),
  KEY `IDX_97A0ADA34632BB48` (`from_id_id`),
  KEY `IDX_97A0ADA37478AF67` (`to_id_id`),
  CONSTRAINT `FK_97A0ADA34632BB48` FOREIGN KEY (`from_id_id`) REFERENCES `station` (`id`),
  CONSTRAINT `FK_97A0ADA37478AF67` FOREIGN KEY (`to_id_id`) REFERENCES `station` (`id`),
  CONSTRAINT `FK_97A0ADA37E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_97A0ADA3ECAB15B3` FOREIGN KEY (`travel_id`) REFERENCES `travel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.ticket: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto.travel
CREATE TABLE IF NOT EXISTS `travel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bus_id_id` int NOT NULL,
  `route_id_id` int NOT NULL,
  `valid_until` date NOT NULL,
  `departure_time` time NOT NULL,
  `delist` tinyint(1) NOT NULL,
  `work_days` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reverse` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_2D0B6BCEE9123BA6` (`bus_id_id`),
  KEY `IDX_2D0B6BCEE23BACF9` (`route_id_id`),
  CONSTRAINT `FK_2D0B6BCEE23BACF9` FOREIGN KEY (`route_id_id`) REFERENCES `routes` (`id`),
  CONSTRAINT `FK_2D0B6BCEE9123BA6` FOREIGN KEY (`bus_id_id`) REFERENCES `bus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.travel: ~7 rows (aproximadamente)
INSERT INTO `travel` (`id`, `bus_id_id`, `route_id_id`, `valid_until`, `departure_time`, `delist`, `work_days`, `reverse`) VALUES
	(1, 5, 1, '2026-06-15', '17:30:00', 0, 'Mon,Wed,Fri,Sun', 0),
	(2, 4, 1, '2026-12-30', '17:00:00', 0, 'Tue,Thu,Sat', 0),
	(3, 1, 2, '2026-12-30', '05:00:00', 0, 'Mon,Tue,Wed,sun', 0),
	(4, 3, 2, '2026-12-30', '09:00:00', 0, 'Mon,Tue,wed,Thu,fri,Sat,sun', 0),
	(5, 5, 2, '2026-12-30', '09:30:00', 0, 'Mon,Tue,wed,thu,fri,sat,sun', 1),
	(6, 1, 2, '2026-12-30', '20:20:00', 0, 'Tue,Fri,sat', 1),
	(7, 3, 2, '2026-12-30', '16:35:00', 0, 'Mon', 1);

-- Volcando estructura para tabla proyecto.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `citizen_id` varchar(9) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `join_date` date NOT NULL,
  `phone` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_MAIL` (`mail`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla proyecto.user: ~4 rows (aproximadamente)
INSERT INTO `user` (`id`, `username`, `roles`, `password`, `mail`, `citizen_id`, `join_date`, `phone`) VALUES
	(5, 'hello', '["ROLE_USER"]', '$2y$13$bb8iqA0zULcjkDv4xjk2ieEWEoXt0tzonM1MJXYQsx6Y1Tv2yV9LG', 'agasg', 'adsfafaf', '2026-03-23', '616161616'),
	(7, 'agasg', '["ROLE_USER"]', '$2y$13$DqOWBto2btXk43Nh.Ey/BOmZqK.uH3MwjABb/hGHg37CLBbAmby6a', 'GAFASDFADSF', 'fasfafs', '2026-03-23', '616161616'),
	(8, 'agasg', '["ROLE_USER"]', '$2y$13$lctRA2mfRrBXdD23hL5z6uZY7f73CqUnqXWMlflaTFe3OvUCzJbna', 'GAFASDFAD', 'fasfafs', '2026-03-23', '616161616'),
	(9, 'agasg', '["ROLE_USER", "ROLE_ADMIN"]', '$2y$13$Cd83IckbUAR9qw9g8gmaFeO6pnMD9xIPKFZ2DTBwMHBcBCG1pMbPS', 'sdgsdg', 'gsgs', '2026-03-23', '616161616'),
	(10, 'paco', '["ROLE_USER", "ROLE_ADMIN"]', '$2y$13$Cd83IckbUAR9qw9g8gmaFeO6pnMD9xIPKFZ2DTBwMHBcBCG1pMbPS', 'paco', '12345678Q', '2026-03-26', '616161616'),
	(13, 'paco', '["ROLE_USER"]', '$2y$13$kI.NW24QLSsHGAqZDEW6TetZMNrNkFZ5UDbz8cItArSDCgQyXdUqe', 'paco2', '12345678Q', '2026-03-26', '');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
