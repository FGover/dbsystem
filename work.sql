-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: work
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_info`
--

DROP TABLE IF EXISTS `admin_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_info` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `adminname` varchar(50) NOT NULL,
  `adminpassword` varchar(50) NOT NULL,
  `adminemail` varchar(100) DEFAULT NULL,
  `adminphone` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `admin_id_UNIQUE` (`admin_id`),
  UNIQUE KEY `adminname_UNIQUE` (`adminname`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_info`
--

LOCK TABLES `admin_info` WRITE;
/*!40000 ALTER TABLE `admin_info` DISABLE KEYS */;
INSERT INTO `admin_info` VALUES (1,'张三','123456','zhangsan@example.com','13888888888',NULL),(2,'李四','654321','lisi@example.com','15999999999',NULL),(3,'王五','555555','wangwu@example.com','12345678901',NULL),(4,'ccy','123','2924074443@qq.com','18824400185','/upload/1705412767768.jpg');
/*!40000 ALTER TABLE `admin_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday`
--

DROP TABLE IF EXISTS `holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holiday` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `status` enum('待审批','审批通过','审批拒绝') NOT NULL DEFAULT '待审批',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
INSERT INTO `holiday` VALUES (8,4,'gg','2024-01-15 00:00:00','2024-01-15 01:00:00','审批通过'),(9,4,'生孩子','2024-01-15 03:02:00','2024-01-15 04:02:00','审批拒绝'),(5,1,'去飞鸡','2024-01-15 15:00:00','2024-01-15 22:00:00','待审批'),(6,1,'反光板v成功','2024-01-15 12:00:00','2024-01-15 13:00:00','审批拒绝'),(7,1,'生孩子','2024-01-15 03:00:00','2024-01-16 13:00:00','审批通过'),(10,4,'阿斯蒂芬','2024-01-15 00:00:00','2024-01-16 02:00:00','待审批'),(11,4,'跟红尘天涯','2024-01-15 02:00:00','2024-01-16 06:12:00','待审批'),(12,4,'好吧说的话举报','2024-01-15 09:00:00','2024-01-16 16:00:00','待审批'),(13,4,'上的分布遇到','2024-01-15 10:00:00','2024-01-16 23:00:00','审批拒绝'),(14,4,'爸列','2024-01-15 00:00:00','2024-01-17 00:00:00','待审批');
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sign_in`
--

DROP TABLE IF EXISTS `sign_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sign_in` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sign_in_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sign_in`
--

LOCK TABLES `sign_in` WRITE;
/*!40000 ALTER TABLE `sign_in` DISABLE KEYS */;
INSERT INTO `sign_in` VALUES (6,1,'2024-01-11 08:00:55'),(7,1,'2024-01-13 08:00:55'),(8,3,'2024-01-13 08:00:55'),(39,1,'2024-01-14 13:31:55'),(40,1,'2024-01-15 09:59:23');
/*!40000 ALTER TABLE `sign_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `username` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(10) DEFAULT NULL,
  `password` varchar(50) NOT NULL DEFAULT '123456',
  `email` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT '/upload/fg.jpg',
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES ('fg',1,'女','123','2924074463@qq.com','/upload/1705414414359.jpg','18824400184','雷州厕所'),('李四',2,'女','654321','lisi@example.com','/upload/1705406967534.jpg',NULL,NULL),('王五',3,'男','111111','wangwu@example.com','',NULL,NULL),('赵六',4,'女','222222','zhaoliu@example.com','','17775701356','雷州厕所'),('九九',5,'男','123456','zhangsan@example.com',NULL,'14579585545','文化路垃圾场'),('九1',7,'男','123456','zhangsan@example.com',NULL,'14579585545','文化路垃圾场'),('九2',12,'男','123456','zhangsan@example.com',NULL,'14579585545','文化路垃圾场'),('fff',13,'男','123456','2924074463@qq.com',NULL,'18824400184','雷州厕所'),('九5',11,'男','123456','zhangsan@example.com',NULL,'14579585545','文化路垃圾场'),('李四六',14,'女','123456','lisi@example.com',NULL,'14579585545','文化路垃圾场'),('ffff',23,'男','123456','2924074463@qq.com','/upload/fg.jpg','18824400184','雷州厕所'),('李六',24,'女','123456','lisi@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('abc',6,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九a',15,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九b',10,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九c',16,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九d',17,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九e',18,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九f',19,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九g',20,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九h',21,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场'),('九i',22,'男','123456','zhangsan@example.com','/upload/fg.jpg','14579585545','文化路垃圾场');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salary` decimal(10,2) DEFAULT NULL,
  `depart` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,40000.00,'研发部'),(2,6000.00,'财务部'),(3,7000.00,'人事部'),(4,6000.00,'后勤部'),(5,7000.00,'销售部'),(6,20000.00,'研发部'),(7,20000.00,'财务部'),(10,20000.00,'研发部'),(11,500.00,'人事部'),(12,20.00,'研发部'),(13,6000.00,'财务部'),(14,50000.00,'研发部'),(15,6000.00,'财务部'),(16,50000.00,'研发部'),(17,50000.00,'研发部'),(18,6000.00,'财务部'),(19,6000.00,'财务部'),(20,50000.00,'研发部'),(21,6000.00,'采购部'),(22,50000.00,'研发部'),(23,6000.00,'财务部'),(24,50000.00,'研发部');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-17 16:48:21
