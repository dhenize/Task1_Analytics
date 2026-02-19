-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2026 at 07:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_uniform_sales`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) DEFAULT NULL,
  `customer_name` varchar(200) DEFAULT NULL,
  `customer_email` varchar(200) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_time` time DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `customer_name`, `customer_email`, `order_date`, `order_time`, `total_amount`, `payment_method`, `status`, `created_at`) VALUES
(1, 'ORD-202502-00001', 'John Smith', 'john.smith@email.com', '2025-02-01', '09:15:00', 125.95, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(2, 'ORD-202502-00002', 'Maria Garcia', 'maria.g@email.com', '2025-02-01', '10:30:00', 89.97, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(3, 'ORD-202502-00003', 'Robert Johnson', 'r.johnson@email.com', '2025-02-01', '14:45:00', 215.50, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(4, 'ORD-202502-00004', 'Sarah Williams', 'sarah.w@email.com', '2025-02-02', '08:20:00', 67.98, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(5, 'ORD-202502-00005', 'Michael Brown', 'mbrown@email.com', '2025-02-02', '11:10:00', 156.75, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(6, 'ORD-202502-00006', 'Emily Davis', 'emily.d@email.com', '2025-02-02', '15:30:00', 234.80, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(7, 'ORD-202502-00007', 'David Miller', 'd.miller@email.com', '2025-02-03', '09:45:00', 98.50, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(8, 'ORD-202502-00008', 'Lisa Wilson', 'lisa.w@email.com', '2025-02-03', '12:15:00', 145.25, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(9, 'ORD-202502-00009', 'James Moore', 'james.m@email.com', '2025-02-03', '16:00:00', 78.99, 'Bank Transfer', 'Completed', '2026-02-18 15:32:43'),
(10, 'ORD-202502-00010', 'Jennifer Taylor', 'jen.taylor@email.com', '2025-02-04', '10:00:00', 312.45, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(11, 'ORD-202502-00011', 'Charles Anderson', 'c.anderson@email.com', '2025-02-04', '13:30:00', 187.60, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(12, 'ORD-202502-00012', 'Patricia Thomas', 'p.thomas@email.com', '2025-02-04', '17:15:00', 92.30, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(13, 'ORD-202502-00013', 'Christopher Jackson', 'chris.j@email.com', '2025-02-05', '08:45:00', 267.80, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(14, 'ORD-202502-00014', 'Nancy White', 'nancy.w@email.com', '2025-02-05', '11:20:00', 134.25, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(15, 'ORD-202502-00015', 'Daniel Harris', 'dan.h@email.com', '2025-02-05', '14:50:00', 76.50, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(16, 'ORD-202502-00016', 'Betty Martin', 'betty.m@email.com', '2025-02-06', '09:30:00', 198.75, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(17, 'ORD-202502-00017', 'Paul Thompson', 'paul.t@email.com', '2025-02-06', '12:45:00', 145.90, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(18, 'ORD-202502-00018', 'Karen Robinson', 'karen.r@email.com', '2025-02-06', '16:30:00', 223.40, 'Bank Transfer', 'Completed', '2026-02-18 15:32:43'),
(19, 'ORD-202502-00019', 'Mark Lewis', 'mark.l@email.com', '2025-02-07', '10:15:00', 89.95, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(20, 'ORD-202502-00020', 'Sandra Lee', 'sandra.lee@email.com', '2025-02-07', '13:40:00', 167.30, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(21, 'ORD-202502-00021', 'Kevin Walker', 'kevin.w@email.com', '2025-02-07', '15:55:00', 134.75, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(22, 'ORD-202502-00022', 'Donna Hall', 'donna.h@email.com', '2025-02-08', '09:00:00', 278.50, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(23, 'ORD-202502-00023', 'Edward Allen', 'ed.a@email.com', '2025-02-08', '11:35:00', 92.25, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(24, 'ORD-202502-00024', 'Carol Young', 'carol.y@email.com', '2025-02-08', '14:20:00', 156.80, 'Bank Transfer', 'Completed', '2026-02-18 15:32:43'),
(25, 'ORD-202502-00025', 'Brian King', 'brian.k@email.com', '2025-02-09', '10:45:00', 189.40, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(26, 'ORD-202502-00026', 'Ruth Wright', 'ruth.w@email.com', '2025-02-09', '13:15:00', 123.75, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(27, 'ORD-202502-00027', 'Steven Lopez', 'steven.l@email.com', '2025-02-09', '16:45:00', 267.90, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(28, 'ORD-202502-00028', 'Michelle Hill', 'michelle.h@email.com', '2025-02-10', '08:30:00', 98.50, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(29, 'ORD-202502-00029', 'George Scott', 'george.s@email.com', '2025-02-10', '11:50:00', 145.30, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(30, 'ORD-202502-00030', 'Dorothy Green', 'dorothy.g@email.com', '2025-02-10', '15:10:00', 212.60, 'Bank Transfer', 'Completed', '2026-02-18 15:32:43'),
(31, 'ORD-202502-00031', 'Kenneth Adams', 'ken.a@email.com', '2025-02-11', '09:25:00', 87.95, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(32, 'ORD-202502-00032', 'Sharon Baker', 'sharon.b@email.com', '2025-02-11', '12:40:00', 178.20, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(33, 'ORD-202502-00033', 'Ronald Gonzalez', 'ron.g@email.com', '2025-02-11', '14:55:00', 234.75, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(34, 'ORD-202502-00034', 'Deborah Nelson', 'debbie.n@email.com', '2025-02-12', '10:20:00', 112.40, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(35, 'ORD-202502-00035', 'Anthony Carter', 'anthony.c@email.com', '2025-02-12', '13:35:00', 267.30, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(36, 'ORD-202502-00036', 'Kathleen Mitchell', 'kath.m@email.com', '2025-02-12', '16:50:00', 189.85, 'Bank Transfer', 'Completed', '2026-02-18 15:32:43'),
(37, 'ORD-202502-00037', 'Jeffrey Perez', 'jeff.p@email.com', '2025-02-13', '09:10:00', 98.70, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(38, 'ORD-202502-00038', 'Amy Roberts', 'amy.r@email.com', '2025-02-13', '11:55:00', 145.60, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(39, 'ORD-202502-00039', 'Gregory Turner', 'greg.t@email.com', '2025-02-13', '15:25:00', 223.40, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(40, 'ORD-202502-00040', 'Angela Phillips', 'angela.p@email.com', '2025-02-14', '10:35:00', 167.90, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(41, 'ORD-202502-00041', 'Peter Campbell', 'peter.c@email.com', '2025-02-14', '13:45:00', 89.75, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(42, 'ORD-202502-00042', 'Rebecca Parker', 'rebecca.p@email.com', '2025-02-14', '17:00:00', 234.20, 'Bank Transfer', 'Completed', '2026-02-18 15:32:43'),
(43, 'ORD-202502-00043', 'Frank Evans', 'frank.e@email.com', '2025-02-15', '08:50:00', 156.45, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(44, 'ORD-202502-00044', 'Laura Edwards', 'laura.e@email.com', '2025-02-15', '11:30:00', 198.30, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(45, 'ORD-202502-00045', 'Raymond Collins', 'ray.c@email.com', '2025-02-15', '14:40:00', 123.90, 'Online Payment', 'Completed', '2026-02-18 15:32:43'),
(46, 'ORD-202502-00046', 'Stephanie Stewart', 'steph.s@email.com', '2025-02-16', '10:05:00', 278.60, 'Debit Card', 'Completed', '2026-02-18 15:32:43'),
(47, 'ORD-202502-00047', 'Lawrence Sanchez', 'larry.s@email.com', '2025-02-16', '13:20:00', 145.75, 'Credit Card', 'Completed', '2026-02-18 15:32:43'),
(48, 'ORD-202502-00048', 'Cynthia Morris', 'cynthia.m@email.com', '2025-02-16', '16:15:00', 189.40, 'Bank Transfer', 'Completed', '2026-02-18 15:32:43'),
(49, 'ORD-202502-00049', 'Andrew Rogers', 'andrew.r@email.com', '2025-02-17', '09:40:00', 212.85, 'Cash', 'Completed', '2026-02-18 15:32:43'),
(50, 'ORD-202502-00050', 'Margaret Reed', 'margaret.r@email.com', '2025-02-17', '12:25:00', 98.95, 'Credit Card', 'Completed', '2026-02-18 15:32:43');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `subtotal`) VALUES
(259, 1, 1, 2, 25.99, 51.98),
(260, 1, 11, 1, 32.99, 32.99),
(261, 1, 42, 3, 8.99, 26.97),
(262, 1, 37, 1, 12.99, 12.99),
(263, 2, 3, 1, 25.99, 25.99),
(264, 2, 16, 2, 28.99, 57.98),
(265, 2, 44, 1, 8.99, 8.99),
(266, 3, 7, 2, 34.99, 69.98),
(267, 3, 12, 1, 32.99, 32.99),
(268, 3, 22, 1, 79.99, 79.99),
(269, 3, 45, 2, 39.99, 79.98),
(270, 4, 2, 1, 25.99, 25.99),
(271, 4, 26, 2, 45.99, 91.98),
(272, 4, 41, 3, 12.99, 38.97),
(273, 5, 5, 2, 25.99, 51.98),
(274, 5, 14, 1, 28.99, 28.99),
(275, 5, 30, 2, 45.99, 91.98),
(276, 5, 46, 1, 39.99, 39.99),
(277, 6, 8, 1, 34.99, 34.99),
(278, 6, 17, 3, 32.99, 98.97),
(279, 6, 38, 2, 12.99, 25.98),
(280, 7, 4, 2, 25.99, 51.98),
(281, 7, 19, 1, 28.99, 28.99),
(282, 7, 43, 1, 8.99, 8.99),
(283, 8, 9, 1, 34.99, 34.99),
(284, 8, 21, 1, 79.99, 79.99),
(285, 8, 27, 2, 45.99, 91.98),
(286, 9, 6, 1, 25.99, 25.99),
(287, 9, 31, 1, 45.99, 45.99),
(288, 10, 10, 2, 34.99, 69.98),
(289, 10, 15, 2, 32.99, 65.98),
(290, 10, 23, 1, 79.99, 79.99),
(291, 10, 39, 1, 12.99, 12.99),
(292, 11, 13, 2, 32.99, 65.98),
(293, 11, 24, 1, 79.99, 79.99),
(294, 11, 45, 1, 39.99, 39.99),
(295, 12, 18, 1, 32.99, 32.99),
(296, 12, 25, 2, 45.99, 91.98),
(297, 13, 20, 3, 28.99, 86.97),
(298, 13, 28, 1, 45.99, 45.99),
(299, 13, 32, 2, 45.99, 91.98),
(300, 14, 29, 1, 45.99, 45.99),
(301, 14, 33, 2, 45.99, 91.98),
(302, 15, 34, 1, 45.99, 45.99),
(303, 15, 40, 1, 12.99, 12.99),
(304, 16, 35, 2, 45.99, 91.98),
(305, 16, 44, 1, 39.99, 39.99),
(306, 16, 2, 1, 25.99, 25.99),
(307, 17, 36, 1, 45.99, 45.99),
(308, 17, 43, 2, 39.99, 79.98),
(309, 18, 1, 2, 25.99, 51.98),
(310, 18, 7, 1, 34.99, 34.99),
(311, 18, 12, 1, 32.99, 32.99),
(312, 18, 17, 1, 32.99, 32.99),
(313, 19, 3, 1, 25.99, 25.99),
(314, 19, 8, 1, 34.99, 34.99),
(315, 20, 4, 2, 25.99, 51.98),
(316, 20, 9, 1, 34.99, 34.99),
(317, 20, 14, 1, 28.99, 28.99),
(318, 21, 5, 1, 25.99, 25.99),
(319, 21, 10, 1, 34.99, 34.99),
(320, 21, 15, 1, 32.99, 32.99),
(321, 22, 6, 2, 25.99, 51.98),
(322, 22, 11, 1, 32.99, 32.99),
(323, 22, 16, 2, 28.99, 57.98),
(324, 23, 2, 1, 25.99, 25.99),
(325, 23, 7, 1, 34.99, 34.99),
(326, 24, 8, 2, 34.99, 69.98),
(327, 24, 13, 1, 32.99, 32.99),
(328, 25, 9, 1, 34.99, 34.99),
(329, 25, 14, 2, 28.99, 57.98),
(330, 25, 19, 1, 28.99, 28.99),
(331, 26, 10, 1, 34.99, 34.99),
(332, 26, 15, 1, 32.99, 32.99),
(333, 26, 20, 1, 28.99, 28.99),
(334, 27, 11, 2, 32.99, 65.98),
(335, 27, 16, 1, 28.99, 28.99),
(336, 27, 21, 1, 79.99, 79.99),
(337, 28, 12, 1, 32.99, 32.99),
(338, 28, 17, 1, 32.99, 32.99),
(339, 29, 13, 2, 32.99, 65.98),
(340, 29, 18, 1, 32.99, 32.99),
(341, 30, 14, 1, 28.99, 28.99),
(342, 30, 19, 2, 28.99, 57.98),
(343, 30, 22, 1, 79.99, 79.99),
(344, 31, 15, 1, 32.99, 32.99),
(345, 31, 20, 1, 28.99, 28.99),
(346, 32, 16, 2, 28.99, 57.98),
(347, 32, 21, 1, 79.99, 79.99),
(348, 33, 17, 1, 32.99, 32.99),
(349, 33, 22, 2, 79.99, 159.98),
(350, 34, 18, 1, 32.99, 32.99),
(351, 34, 23, 1, 79.99, 79.99),
(352, 35, 19, 2, 28.99, 57.98),
(353, 35, 24, 1, 79.99, 79.99),
(354, 35, 29, 1, 45.99, 45.99),
(355, 36, 20, 1, 28.99, 28.99),
(356, 36, 25, 2, 45.99, 91.98),
(357, 37, 21, 1, 79.99, 79.99),
(358, 37, 26, 1, 45.99, 45.99),
(359, 38, 22, 1, 79.99, 79.99),
(360, 38, 27, 1, 45.99, 45.99),
(361, 39, 23, 2, 79.99, 159.98),
(362, 39, 28, 1, 45.99, 45.99),
(363, 40, 24, 1, 79.99, 79.99),
(364, 40, 29, 1, 45.99, 45.99),
(365, 41, 25, 1, 45.99, 45.99),
(366, 41, 30, 1, 45.99, 45.99),
(367, 42, 26, 1, 45.99, 45.99),
(368, 42, 31, 1, 45.99, 45.99),
(369, 42, 37, 1, 12.99, 12.99),
(370, 43, 27, 2, 45.99, 91.98),
(371, 43, 32, 1, 45.99, 45.99),
(372, 44, 28, 1, 45.99, 45.99),
(373, 44, 33, 2, 45.99, 91.98),
(374, 45, 29, 1, 45.99, 45.99),
(375, 45, 34, 1, 45.99, 45.99),
(376, 46, 30, 2, 45.99, 91.98),
(377, 46, 35, 1, 45.99, 45.99),
(378, 46, 38, 1, 12.99, 12.99),
(379, 47, 31, 1, 45.99, 45.99),
(380, 47, 36, 1, 45.99, 45.99),
(381, 48, 32, 2, 45.99, 91.98),
(382, 48, 37, 1, 12.99, 12.99),
(383, 49, 33, 1, 45.99, 45.99),
(384, 49, 38, 1, 12.99, 12.99),
(385, 49, 39, 1, 12.99, 12.99),
(386, 50, 34, 1, 45.99, 45.99),
(387, 50, 35, 1, 45.99, 45.99);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `size` varchar(20) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `size`, `price`, `stock_quantity`, `created_at`) VALUES
(1, 1, 'Classic White Shirt', 'XS', 25.99, 45, '2026-02-18 15:32:23'),
(2, 1, 'Classic White Shirt', 'S', 25.99, 62, '2026-02-18 15:32:23'),
(3, 1, 'Classic White Shirt', 'M', 25.99, 78, '2026-02-18 15:32:23'),
(4, 1, 'Classic White Shirt', 'L', 25.99, 54, '2026-02-18 15:32:23'),
(5, 1, 'Classic White Shirt', 'XL', 25.99, 38, '2026-02-18 15:32:23'),
(6, 1, 'Classic White Shirt', 'XXL', 25.99, 22, '2026-02-18 15:32:23'),
(7, 2, 'Premium Cotton Shirt', 'S', 34.99, 35, '2026-02-18 15:32:23'),
(8, 2, 'Premium Cotton Shirt', 'M', 34.99, 42, '2026-02-18 15:32:23'),
(9, 2, 'Premium Cotton Shirt', 'L', 34.99, 31, '2026-02-18 15:32:23'),
(10, 2, 'Premium Cotton Shirt', 'XL', 34.99, 19, '2026-02-18 15:32:23'),
(11, 3, 'Khaki School Pants', 'XS', 32.99, 28, '2026-02-18 15:32:23'),
(12, 3, 'Khaki School Pants', 'S', 32.99, 41, '2026-02-18 15:32:23'),
(13, 3, 'Khaki School Pants', 'M', 32.99, 53, '2026-02-18 15:32:23'),
(14, 3, 'Khaki School Pants', 'L', 32.99, 44, '2026-02-18 15:32:23'),
(15, 3, 'Khaki School Pants', 'XL', 32.99, 27, '2026-02-18 15:32:23'),
(16, 4, 'Plaid School Skirt', 'XS', 28.99, 32, '2026-02-18 15:32:23'),
(17, 4, 'Plaid School Skirt', 'S', 28.99, 45, '2026-02-18 15:32:23'),
(18, 4, 'Plaid School Skirt', 'M', 28.99, 38, '2026-02-18 15:32:23'),
(19, 4, 'Plaid School Skirt', 'L', 28.99, 24, '2026-02-18 15:32:23'),
(20, 5, 'PE Shirt - Red', 'XS', 22.99, 51, '2026-02-18 15:32:23'),
(21, 5, 'PE Shirt - Red', 'S', 22.99, 63, '2026-02-18 15:32:23'),
(22, 5, 'PE Shirt - Red', 'M', 22.99, 72, '2026-02-18 15:32:23'),
(23, 5, 'PE Shirt - Red', 'L', 22.99, 48, '2026-02-18 15:32:23'),
(24, 5, 'PE Shirt - Red', 'XL', 22.99, 33, '2026-02-18 15:32:23'),
(25, 5, 'PE Shorts - Navy', 'XS', 22.99, 44, '2026-02-18 15:32:23'),
(26, 5, 'PE Shorts - Navy', 'S', 22.99, 56, '2026-02-18 15:32:23'),
(27, 5, 'PE Shorts - Navy', 'M', 22.99, 61, '2026-02-18 15:32:23'),
(28, 5, 'PE Shorts - Navy', 'L', 22.99, 42, '2026-02-18 15:32:23'),
(29, 5, 'PE Shorts - Navy', 'XL', 22.99, 29, '2026-02-18 15:32:23'),
(30, 6, 'Navy Wool Blazer', 'S', 79.99, 15, '2026-02-18 15:32:23'),
(31, 6, 'Navy Wool Blazer', 'M', 79.99, 22, '2026-02-18 15:32:23'),
(32, 6, 'Navy Wool Blazer', 'L', 79.99, 18, '2026-02-18 15:32:23'),
(33, 6, 'Navy Wool Blazer', 'XL', 79.99, 11, '2026-02-18 15:32:23'),
(34, 7, 'Crewneck Sweater', 'XS', 45.99, 27, '2026-02-18 15:32:23'),
(35, 7, 'Crewneck Sweater', 'S', 45.99, 34, '2026-02-18 15:32:23'),
(36, 7, 'Crewneck Sweater', 'M', 45.99, 41, '2026-02-18 15:32:23'),
(37, 7, 'Crewneck Sweater', 'L', 45.99, 29, '2026-02-18 15:32:23'),
(38, 7, 'Crewneck Sweater', 'XL', 45.99, 18, '2026-02-18 15:32:23'),
(39, 8, 'School Striped Tie', 'One Size', 12.99, 95, '2026-02-18 15:32:23'),
(40, 9, 'Knee High Socks', 'S', 8.99, 67, '2026-02-18 15:32:23'),
(41, 9, 'Knee High Socks', 'M', 8.99, 82, '2026-02-18 15:32:23'),
(42, 9, 'Knee High Socks', 'L', 8.99, 58, '2026-02-18 15:32:23'),
(43, 10, 'School Sports Jacket', 'S', 39.99, 23, '2026-02-18 15:32:23'),
(44, 10, 'School Sports Jacket', 'M', 39.99, 31, '2026-02-18 15:32:23'),
(45, 10, 'School Sports Jacket', 'L', 39.99, 27, '2026-02-18 15:32:23'),
(46, 10, 'School Sports Jacket', 'XL', 39.99, 16, '2026-02-18 15:32:23');

-- --------------------------------------------------------

--
-- Table structure for table `uniform_categories`
--

CREATE TABLE `uniform_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `size_options` text DEFAULT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uniform_categories`
--

INSERT INTO `uniform_categories` (`id`, `name`, `type`, `size_options`, `base_price`, `created_at`) VALUES
(1, 'Test Shirt', 'Shirt', 'S,M,L', 29.99, '2026-02-18 09:03:46'),
(2, 'Test Pants', 'Pants', 'M,L,XL', 39.99, '2026-02-18 09:03:46'),
(3, 'Classic Shirt', 'Shirt', 'XS,S,M,L,XL,XXL', 25.99, '2026-02-18 15:31:56'),
(4, 'Premium Shirt', 'Shirt', 'S,M,L,XL', 34.99, '2026-02-18 15:31:56'),
(5, 'School Pants', 'Pants', 'XS,S,M,L,XL', 32.99, '2026-02-18 15:31:56'),
(6, 'Girls Skirt', 'Skirt', 'XS,S,M,L', 28.99, '2026-02-18 15:31:56'),
(7, 'PE Uniform', 'PE Uniform', 'XS,S,M,L,XL', 22.99, '2026-02-18 15:31:56'),
(8, 'Winter Blazer', 'Blazer', 'S,M,L,XL', 79.99, '2026-02-18 15:31:56'),
(9, 'School Sweater', 'Sweater', 'XS,S,M,L,XL', 45.99, '2026-02-18 15:31:56'),
(10, 'Formal Tie', 'Tie', 'One Size', 12.99, '2026-02-18 15:31:56'),
(11, 'School Socks', 'Socks', 'S,M,L', 8.99, '2026-02-18 15:31:56'),
(12, 'Sports Jacket', 'PE Uniform', 'S,M,L,XL', 39.99, '2026-02-18 15:31:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `uniform_categories`
--
ALTER TABLE `uniform_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=388;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `uniform_categories`
--
ALTER TABLE `uniform_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `uniform_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
