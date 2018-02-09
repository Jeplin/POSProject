-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2018 at 04:45 AM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `posproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `pos_login`
--

CREATE TABLE `pos_login` (
  `id` int(11) NOT NULL,
  `user_type` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_allorders`
--

CREATE TABLE `tbl_allorders` (
  `id` int(11) NOT NULL,
  `tableorder_id` int(50) NOT NULL,
  `item` varchar(50) NOT NULL,
  `quant` int(50) NOT NULL,
  `price` int(50) NOT NULL,
  `tot_price` int(50) NOT NULL,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_allorders`
--

INSERT INTO `tbl_allorders` (`id`, `tableorder_id`, `item`, `quant`, `price`, `tot_price`, `modified_date`) VALUES
(110, 60, 'Pizza', 1, 200, 200, '2018-01-26 21:15:28'),
(111, 60, 'Burger', 1, 20, 20, '2018-01-26 21:15:28'),
(112, 60, 'Sandwich', 1, 50, 50, '2018-01-26 21:15:54'),
(113, 60, 'Burer23', 1, 200, 200, '2018-01-26 21:18:30'),
(114, 61, 'Burger', 1, 20, 20, '2018-01-26 21:23:11'),
(115, 61, 'Pizza', 1, 200, 200, '2018-01-26 21:23:12'),
(116, 61, 'Sandwich', 1, 50, 50, '2018-01-26 21:23:19'),
(117, 61, 'Samosa', 1, 10, 10, '2018-01-26 21:23:19'),
(118, 61, 'Burger', 1, 20, 20, '2018-01-26 21:25:46'),
(119, 61, 'Pizza', 1, 200, 200, '2018-01-26 21:25:46'),
(120, 62, 'Burger', 1, 20, 20, '2018-01-27 17:46:18'),
(121, 63, 'Pizza', 1, 200, 200, '2018-01-30 18:12:03'),
(122, 63, 'Biryani', 1, 100, 100, '2018-01-30 18:12:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_current_address`
--

CREATE TABLE `tbl_current_address` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `address_one` varchar(100) NOT NULL,
  `address_two` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `pincode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_current_address`
--

INSERT INTO `tbl_current_address` (`id`, `user_id`, `address_one`, `address_two`, `city`, `state`, `country`, `pincode`) VALUES
(1, 1, 'Cur-NA', 'Cur-NA', 'Cur-NA', 'Cur-NA', 'Cur-NA', 'Cur-NA');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_floor`
--

CREATE TABLE `tbl_floor` (
  `id` int(11) NOT NULL,
  `layout_id` int(100) NOT NULL,
  `number_of_table` int(100) NOT NULL,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_floor`
--

INSERT INTO `tbl_floor` (`id`, `layout_id`, `number_of_table`, `modified_date`) VALUES
(32, 42, 0, '2017-12-25 19:16:16'),
(33, 42, 0, '2017-12-25 19:16:16'),
(34, 43, 4, '2017-12-25 19:28:25'),
(35, 43, 5, '2017-12-25 19:26:45'),
(36, 43, 1, '2017-12-25 19:24:07');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_layout`
--

CREATE TABLE `tbl_layout` (
  `id` int(11) NOT NULL,
  `status` int(10) NOT NULL,
  `admin_id` int(100) NOT NULL,
  `number_of_floor` int(100) NOT NULL,
  `layout_title` varchar(100) NOT NULL,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_layout`
--

INSERT INTO `tbl_layout` (`id`, `status`, `admin_id`, `number_of_floor`, `layout_title`, `modified_date`) VALUES
(43, 0, 1, 3, 'mylayout', '2017-12-25 19:20:35');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menucard`
--

CREATE TABLE `tbl_menucard` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `item_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_menucard`
--

INSERT INTO `tbl_menucard` (`id`, `category_id`, `item_name`, `item_price`) VALUES
(9, 1, 'Burger', 20),
(10, 2, 'Pizza', 200),
(11, 3, 'Biryani', 100),
(12, 1, 'Sandwich', 50),
(13, 1, 'Samosa', 10);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menu_category`
--

CREATE TABLE `tbl_menu_category` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_menu_category`
--

INSERT INTO `tbl_menu_category` (`id`, `category`) VALUES
(1, 'Breakfast'),
(2, 'Lunch'),
(3, 'Dinner');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_status`
--

CREATE TABLE `tbl_order_status` (
  `id` int(11) NOT NULL,
  `order_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_order_status`
--

INSERT INTO `tbl_order_status` (`id`, `order_status`) VALUES
(1, 'In-Process'),
(2, 'DONE');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_permanent_address`
--

CREATE TABLE `tbl_permanent_address` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `address_one` varchar(100) NOT NULL,
  `address_two` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(20) NOT NULL,
  `country` varchar(30) NOT NULL,
  `pincode` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_permanent_address`
--

INSERT INTO `tbl_permanent_address` (`id`, `user_id`, `address_one`, `address_two`, `city`, `state`, `country`, `pincode`) VALUES
(1, 1, 'Per-NA', 'Per-NA', 'Per-NA', 'Per-NA', 'Per-NA', 'Per-NA');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tableorders`
--

CREATE TABLE `tbl_tableorders` (
  `id` int(11) NOT NULL,
  `floor_no` int(50) NOT NULL,
  `table_no` int(50) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `taken_by` int(50) NOT NULL,
  `order_status` int(50) NOT NULL,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_tableorders`
--

INSERT INTO `tbl_tableorders` (`id`, `floor_no`, `table_no`, `customer_name`, `taken_by`, `order_status`, `modified_date`) VALUES
(60, 1, 1, 'jdr', 1, 1, '2018-01-30 18:09:49'),
(61, 1, 2, 'iouy', 0, 0, '2018-01-27 17:45:53'),
(62, 1, 2, 'same', 0, 0, '2018-01-27 17:50:55'),
(63, 1, 1, 'jdr', 2, 0, '2018-02-07 17:40:46');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tables`
--

CREATE TABLE `tbl_tables` (
  `id` int(11) NOT NULL,
  `floor_id` int(100) NOT NULL,
  `table_capacity` int(50) NOT NULL,
  `table_status` int(11) NOT NULL,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_tables`
--

INSERT INTO `tbl_tables` (`id`, `floor_id`, `table_capacity`, `table_status`, `modified_date`) VALUES
(45, 31, 4, 1, '2018-01-14 12:22:25'),
(48, 34, 3, 3, '2018-01-26 21:15:28'),
(50, 35, 6, 1, '2018-01-26 21:14:57'),
(51, 35, 4, 1, '2018-01-26 21:11:19'),
(52, 35, 5, 1, '2018-01-26 19:55:49'),
(53, 36, 5, 1, '2018-01-14 12:22:47'),
(54, 35, 2, 1, '2018-01-20 14:36:37'),
(55, 34, 5, 1, '2018-01-27 17:50:55');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_table_status`
--

CREATE TABLE `tbl_table_status` (
  `id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_table_status`
--

INSERT INTO `tbl_table_status` (`id`, `status`) VALUES
(1, 'Available'),
(2, 'In-Process'),
(3, 'Booked');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_userdetail`
--

CREATE TABLE `tbl_userdetail` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `contact` varchar(50) NOT NULL,
  `fathername` varchar(50) NOT NULL,
  `mothername` varchar(50) NOT NULL,
  `familycontact` varchar(15) NOT NULL,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_userdetail`
--

INSERT INTO `tbl_userdetail` (`id`, `user_id`, `email`, `dob`, `contact`, `fathername`, `mothername`, `familycontact`, `modified_date`) VALUES
(1, 1, 'jeplin@email.com', '2018-02-01', '9082838282', 'Fathername', 'MotherName', '434343434', '2018-02-02 18:19:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `joining` datetime NOT NULL,
  `modified_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `user_type_id`, `fname`, `lname`, `username`, `password`, `joining`, `modified_date`) VALUES
(1, 2, 'Jeplin', 'Devbarma', 'jeplin', '12345', '2018-02-01 03:14:12', '2018-02-02 18:36:21');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usertype`
--

CREATE TABLE `tbl_usertype` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_usertype`
--

INSERT INTO `tbl_usertype` (`id`, `type`) VALUES
(1, 'admin'),
(2, 'waiter'),
(3, 'manager');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_attendence`
--

CREATE TABLE `tbl_user_attendence` (
  `id` int(11) NOT NULL,
  `user_id` int(100) NOT NULL,
  `date` date NOT NULL,
  `in_time` datetime NOT NULL,
  `out_time` datetime NOT NULL,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user_attendence`
--

INSERT INTO `tbl_user_attendence` (`id`, `user_id`, `date`, `in_time`, `out_time`, `modified_time`) VALUES
(1, 1, '2018-01-01', '2018-01-30 01:05:00', '2018-01-30 08:06:00', '2018-01-14 16:36:34'),
(2, 1, '2018-01-02', '2018-01-30 01:17:00', '2018-01-30 18:00:00', '2018-01-14 16:36:55'),
(3, 1, '2018-01-03', '2018-01-30 02:00:00', '2018-01-30 16:00:00', '2018-01-14 16:37:16'),
(4, 1, '2018-01-04', '2018-01-30 02:11:00', '2018-01-30 16:23:00', '2018-01-14 16:37:37'),
(5, 1, '2018-01-05', '2018-01-30 05:28:00', '2018-01-30 18:12:00', '2018-01-14 16:37:57'),
(6, 1, '2018-01-06', '2018-01-30 01:21:00', '2018-01-30 10:13:00', '2018-01-14 16:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE `users_info` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `emailid` varchar(50) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pos_login`
--
ALTER TABLE `pos_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_allorders`
--
ALTER TABLE `tbl_allorders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_current_address`
--
ALTER TABLE `tbl_current_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_floor`
--
ALTER TABLE `tbl_floor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_layout`
--
ALTER TABLE `tbl_layout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_menucard`
--
ALTER TABLE `tbl_menucard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_menu_category`
--
ALTER TABLE `tbl_menu_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_order_status`
--
ALTER TABLE `tbl_order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_permanent_address`
--
ALTER TABLE `tbl_permanent_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_tableorders`
--
ALTER TABLE `tbl_tableorders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_tables`
--
ALTER TABLE `tbl_tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_table_status`
--
ALTER TABLE `tbl_table_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_userdetail`
--
ALTER TABLE `tbl_userdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_usertype`
--
ALTER TABLE `tbl_usertype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user_attendence`
--
ALTER TABLE `tbl_user_attendence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pos_login`
--
ALTER TABLE `pos_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_allorders`
--
ALTER TABLE `tbl_allorders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `tbl_current_address`
--
ALTER TABLE `tbl_current_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_floor`
--
ALTER TABLE `tbl_floor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `tbl_layout`
--
ALTER TABLE `tbl_layout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `tbl_menucard`
--
ALTER TABLE `tbl_menucard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_menu_category`
--
ALTER TABLE `tbl_menu_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_order_status`
--
ALTER TABLE `tbl_order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_permanent_address`
--
ALTER TABLE `tbl_permanent_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_tableorders`
--
ALTER TABLE `tbl_tableorders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `tbl_tables`
--
ALTER TABLE `tbl_tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `tbl_table_status`
--
ALTER TABLE `tbl_table_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_userdetail`
--
ALTER TABLE `tbl_userdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_usertype`
--
ALTER TABLE `tbl_usertype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_user_attendence`
--
ALTER TABLE `tbl_user_attendence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users_info`
--
ALTER TABLE `users_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
