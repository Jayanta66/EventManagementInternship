/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: eventintership
-- ------------------------------------------------------
-- Server version	11.8.8-MariaDB-1 from Debian

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` text DEFAULT NULL,
  `event_date` date NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `location` varchar(200) NOT NULL,
  `title` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES
(1,'Java Full Stack Web Development with Spring Boot, React-Vite, Mariadb.','2026-08-31','/uploads/events/e4700884-f1fb-4b94-82f6-9f9d5bb24b62.png','Kolkata','Java Full Stack Web Development'),
(8,'c','2026-09-05',NULL,'c','c'),
(10,'s','2026-09-05',NULL,'s','s'),
(11,'s','2026-09-04',NULL,'s','s'),
(12,'s','2026-09-05',NULL,'s','s');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) NOT NULL,
  `message` text NOT NULL,
  `name` varchar(100) NOT NULL,
  `submitted_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES
(1,'jayhalder18@gmaill.com','Wellcome.','Jayanta Halder','2026-08-30 16:50:05.415434'),
(2,'jayhalder18@gmaill.com','jjj','Jayanta Halder','2026-08-30 17:26:08.480279'),
(3,'javatecci@gmail.com','ss','ss','2026-09-02 13:17:25.372750'),
(4,'javatecci@gmail.com','ff','s','2026-09-03 10:11:46.922477'),
(5,'javatecci@gmail.com','s','s','2026-09-04 06:54:45.019981');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-09-04  7:18:10
