-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2024 at 09:03 AM
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
-- Database: `support_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `replied_by` int(11) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `ticket_id`, `message`, `replied_by`, `attachment`, `created_at`) VALUES
(1, 1, 'Hello\n', 2, NULL, '2024-07-03 17:26:51'),
(2, 1, 'reply 2', 2, NULL, '2024-07-03 17:49:31'),
(4, 2, 'chgfh', 2, NULL, '2024-07-03 17:50:26'),
(5, 2, 'kalyani', 2, NULL, '2024-07-03 17:51:30'),
(6, 3, 'hell\n', 1, NULL, '2024-07-03 17:54:54'),
(7, 4, 'hii sneha\n', 6, NULL, '2024-07-04 07:43:51'),
(8, 9, 'Attachment added', 2, 'uploads\\1720084054514-Kalyani Patil Cover Letter.pdf', '2024-07-04 09:07:34'),
(11, 9, 'New reply', 2, NULL, '2024-07-04 09:45:37'),
(12, 9, 'New att', 2, NULL, '2024-07-04 09:46:37'),
(13, 9, 'file', 2, NULL, '2024-07-04 09:49:07'),
(14, 9, 'upload', 2, 'uploads\\1720087056839-mahindra.txt', '2024-07-04 09:57:36'),
(16, 9, 'gchgtycgftyt', 2, NULL, '2024-07-04 10:07:25'),
(17, 1, 'Tech support', 6, NULL, '2024-07-04 10:11:28');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('open','closed','resolved') DEFAULT 'open',
  `created_by` int(11) NOT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `status`, `created_by`, `assigned_to`, `created_at`) VALUES
(1, 'Ticket', 'test', 'closed', 2, 6, '2024-07-03 15:04:01'),
(2, 'Ticket 1', 'test', 'open', 2, 5, '2024-07-03 15:13:09'),
(3, 'my', 'vcfcfc', 'open', 1, 6, '2024-07-03 17:54:20'),
(4, 'Solve React Problem', 'React giving some error on load.', 'resolved', 2, 6, '2024-07-04 03:27:47'),
(9, 'File upload', 'hjhjfg', 'open', 2, 5, '2024-07-04 09:07:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('end-user','tech-support','admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'Kalyani', '$2a$10$JoCmBOM/QZRFHWj6ZFhWJOP.WV8eaxYd5DCngY3PnjQmoQQ5fkXgq', 'end-user', '2024-07-03 12:49:44'),
(2, 'Sneha', '$2a$10$z2tC17G9G1EVz1gLksJrCuyx/klK5qgU9dGj.S0Odpqez8gVgq3am', 'end-user', '2024-07-03 14:09:21'),
(5, 'Rohit', '$2a$10$qxvr7PDIRhiYbuWDJTG6sOqOEKloI8V8ReCGGWCJ4Wnv3Ec2zFcsC', 'tech-support', '2024-07-04 05:28:49'),
(6, 'Pooja', '$2a$10$RRc.fDjqKuSnQvs/gXjrdO4fAcr/i/u2yldUxWBTC8pGa7g1DrPky', 'tech-support', '2024-07-04 07:01:05'),
(7, 'Admin', '$2a$10$xLaRIM2ZlwpDyH9IvVtnA.9RLCwaP/pmkOoVNs.LehfG6wjylRNam', 'admin', '2024-07-04 07:03:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `replied_by` (`replied_by`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`replied_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
