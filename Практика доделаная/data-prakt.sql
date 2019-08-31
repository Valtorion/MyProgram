-- MySQL dump 10.16  Distrib 10.1.41-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: prakt
-- ------------------------------------------------------
-- Server version	10.1.41-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `DZ`
--

DROP TABLE IF EXISTS `DZ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DZ` (
  `date` date DEFAULT NULL,
  `obj` text,
  `dz` text,
  `dz_id` int(11) NOT NULL AUTO_INCREMENT,
  `OTime` time DEFAULT NULL,
  PRIMARY KEY (`dz_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DZ`
--

LOCK TABLES `DZ` WRITE;
/*!40000 ALTER TABLE `DZ` DISABLE KEYS */;
INSERT INTO `DZ` VALUES ('2019-08-07','Информатика','Какать',53,'09:00:00'),('2019-08-07','Математика','Какая-та шняга',54,'12:00:00'),('2019-08-08','Социология','Какая-та фигня',56,'11:00:00');
/*!40000 ALTER TABLE `DZ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DZ_study`
--

DROP TABLE IF EXISTS `DZ_study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DZ_study` (
  `Groop_id` int(11) DEFAULT NULL,
  `dz_id` int(11) DEFAULT NULL,
  KEY `Groop_id` (`Groop_id`),
  KEY `dz_id` (`dz_id`),
  CONSTRAINT `DZ_study_ibfk_2` FOREIGN KEY (`Groop_id`) REFERENCES `Students` (`Groop_id`),
  CONSTRAINT `DZ_study_ibfk_3` FOREIGN KEY (`dz_id`) REFERENCES `DZ` (`dz_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DZ_study`
--

LOCK TABLES `DZ_study` WRITE;
/*!40000 ALTER TABLE `DZ_study` DISABLE KEYS */;
INSERT INTO `DZ_study` VALUES (1,53),(1,54),(1,56);
/*!40000 ALTER TABLE `DZ_study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Facultet`
--

DROP TABLE IF EXISTS `Facultet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Facultet` (
  `Fac_id` int(11) NOT NULL AUTO_INCREMENT,
  `Fac` text,
  PRIMARY KEY (`Fac_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Facultet`
--

LOCK TABLES `Facultet` WRITE;
/*!40000 ALTER TABLE `Facultet` DISABLE KEYS */;
INSERT INTO `Facultet` VALUES (1,'ФИТ'),(2,'ФСТ'),(3,'СТФ'),(4,'ЭФ'),(5,'ФЭАТ'),(6,'ГФ');
/*!40000 ALTER TABLE `Facultet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GROOP`
--

DROP TABLE IF EXISTS `GROOP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GROOP` (
  `Group_id` int(11) NOT NULL AUTO_INCREMENT,
  `Groop` text,
  `Spec_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Group_id`),
  KEY `Spec_id` (`Spec_id`),
  CONSTRAINT `GROOP_ibfk_1` FOREIGN KEY (`Spec_id`) REFERENCES `Special` (`Spec_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GROOP`
--

LOCK TABLES `GROOP` WRITE;
/*!40000 ALTER TABLE `GROOP` DISABLE KEYS */;
INSERT INTO `GROOP` VALUES (1,'ПС-81',1),(2,'ПС-82',1);
/*!40000 ALTER TABLE `GROOP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Object`
--

DROP TABLE IF EXISTS `Object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Object` (
  `Obj_id` int(11) NOT NULL AUTO_INCREMENT,
  `obj` text,
  PRIMARY KEY (`Obj_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Object`
--

LOCK TABLES `Object` WRITE;
/*!40000 ALTER TABLE `Object` DISABLE KEYS */;
INSERT INTO `Object` VALUES (1,'Информатика'),(2,'Компьютерная графика'),(3,'СНКМ'),(4,'Математика'),(5,'Иностранный язык'),(6,'ВКМ'),(7,'Физра'),(8,'Социология'),(9,'Приборы физ. лаборатории'),(10,'Экология'),(11,'История'),(12,'Начертательная геомертия');
/*!40000 ALTER TABLE `Object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Object_study`
--

DROP TABLE IF EXISTS `Object_study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Object_study` (
  `Obj_id` int(11) DEFAULT NULL,
  `Groop_id` int(11) DEFAULT NULL,
  KEY `Obj_id` (`Obj_id`),
  CONSTRAINT `Object_study_ibfk_1` FOREIGN KEY (`Obj_id`) REFERENCES `Object` (`Obj_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Object_study`
--

LOCK TABLES `Object_study` WRITE;
/*!40000 ALTER TABLE `Object_study` DISABLE KEYS */;
INSERT INTO `Object_study` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2);
/*!40000 ALTER TABLE `Object_study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Special`
--

DROP TABLE IF EXISTS `Special`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Special` (
  `Spec_id` int(11) NOT NULL AUTO_INCREMENT,
  `Spec` text,
  `Fac_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Spec_id`),
  KEY `Fac_id` (`Fac_id`),
  CONSTRAINT `Special_ibfk_1` FOREIGN KEY (`Fac_id`) REFERENCES `Facultet` (`Fac_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Special`
--

LOCK TABLES `Special` WRITE;
/*!40000 ALTER TABLE `Special` DISABLE KEYS */;
INSERT INTO `Special` VALUES (1,'Приборостроение',1),(2,'Информационная безопасность',1),(3,'Программная инженерия',1),(6,'Машиностроение',2),(7,'Техническая физика',2),(8,'Материаловедение и технологии материалов',2),(9,'Инноватика',2),(10,'Строительство',3),(11,'Электроэнергетика и электротехника',4),(12,'Технология транспортных процессов',5),(13,'Эксплуатация транспортно-технологических машин и комплексов',5),(14,'Энергетическое машиностроение',5),(15,'Наземные транспортно-технологические комплексы',5);
/*!40000 ALTER TABLE `Special` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Students` (
  `Fac_id` int(11) DEFAULT NULL,
  `Spec_id` int(11) DEFAULT NULL,
  `Groop_id` int(11) DEFAULT NULL,
  `Fname` text,
  `Name` text,
  `Student_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Student_id`),
  KEY `Fac_id` (`Fac_id`),
  KEY `Spec_id` (`Spec_id`),
  KEY `Groop_id` (`Groop_id`),
  CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`Fac_id`) REFERENCES `Facultet` (`Fac_id`) ON DELETE CASCADE,
  CONSTRAINT `Students_ibfk_3` FOREIGN KEY (`Spec_id`) REFERENCES `Special` (`Spec_id`) ON DELETE CASCADE,
  CONSTRAINT `Students_ibfk_4` FOREIGN KEY (`Groop_id`) REFERENCES `GROOP` (`Group_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES (1,1,1,'Балашов','Антон',1),(1,1,2,'Миниахметов','Илья',2),(1,1,1,'Коняхин','Андрей',3),(1,1,1,'Томаровский','Анатолий',4);
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-15 10:53:58
