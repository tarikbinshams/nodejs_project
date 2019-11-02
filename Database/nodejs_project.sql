-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2019 at 08:56 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(8) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin'),
(2, 'a', 'a'),
(3, 'aa', 'aa');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(8) NOT NULL,
  `bname` varchar(32) NOT NULL,
  `aname` varchar(32) NOT NULL,
  `category` varchar(16) NOT NULL,
  `price` float NOT NULL,
  `email` varchar(16) NOT NULL,
  `filename` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `bname`, `aname`, `category`, `price`, `email`, `filename`) VALUES
(21, 'JSON', 'Js', 'Programming', 120, 'ami@gmail.com', '1572715969661-book5.jpg'),
(22, 'AJAX', 'Js', 'Programming', 230, 'ami@gmail.com', '1572715988844-book4.jpg'),
(23, 'C', 'Az', 'Programming', 130, 'shams@gmail.com', '1572716020787-book2.jpeg'),
(24, 'PHP', 'p', 'Programming', 230, 'shams@gmail.com', '1572716041657-book1.jpg'),
(25, 'Python', 'Py', 'Programming', 330, 'shams@gmail.com', '1572716056134-book5.jpg'),
(26, 'C++', 'Cpp', 'Programming', 250, 'bin@gmail.com', '1572716258531-book4.jpg'),
(27, 'Java', 'Jvm', 'Programming', 135, 'shams@gmail.com', '1572718881982-cover.jpg'),
(28, 'Python', 'P', 'Programming', 345, 'bin@gmail.com', '1572718930004-1f299efbaa5eb5c8e3b79ac533118be2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `bookorder`
--

CREATE TABLE `bookorder` (
  `id` int(16) NOT NULL,
  `bid` int(16) NOT NULL,
  `bname` varchar(32) NOT NULL,
  `aname` varchar(32) NOT NULL,
  `category` varchar(16) NOT NULL,
  `price` float NOT NULL,
  `bemail` varchar(16) NOT NULL,
  `semail` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookorder`
--

INSERT INTO `bookorder` (`id`, `bid`, `bname`, `aname`, `category`, `price`, `bemail`, `semail`) VALUES
(24, 5, 'Java', 'J', 'Programming', 50, 'binm@gmail.com', 'ami@gmail.com'),
(25, 20, 'BookFile', 'File', 'Political', 258, 'abc@gmail.com', 'ami@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `completeorders`
--

CREATE TABLE `completeorders` (
  `id` int(16) NOT NULL,
  `orderid` int(16) NOT NULL,
  `bid` int(16) NOT NULL,
  `bname` varchar(32) NOT NULL,
  `aname` varchar(32) NOT NULL,
  `category` varchar(16) NOT NULL,
  `price` varchar(16) NOT NULL,
  `bemail` varchar(16) NOT NULL,
  `semail` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `completeorders`
--

INSERT INTO `completeorders` (`id`, `orderid`, `bid`, `bname`, `aname`, `category`, `price`, `bemail`, `semail`) VALUES
(10, 11, 2, 'Compiler', 'AS', 'programming', '50', 'shams@gmail.com', 'ami@gmail.com'),
(11, 19, 2, 'C', 'Az', 'programming', '170', 'bin@gmail.com', 'ami@gmail.com'),
(12, 12, 16, 'English 1', 'Eng', 'science', '170', 'ami@gmail.com', 'bin@gmail.com'),
(13, 13, 2, 'C', 'Az', 'programming', '170', 'bin@gmail.com', 'ami@gmail.com'),
(14, 16, 10, 'Java', 'JVM', 'programming', '270', 'ami@gmail.com', 'shams@gmail.com'),
(15, 14, 14, 'PHP', 'p', 'programming', '260', 'bin@gmail.com', 'shams@gmail.com'),
(16, 17, 15, 'JSON', 'js', 'programming', '270', 'bin@gmail.com', 'ami@gmail.com'),
(17, 21, 15, 'JSON', 'js', 'programming', '270', 'bin@gmail.com', 'ami@gmail.com'),
(18, 18, 2, 'Compiler', 'AS', 'programming', '50', 'bin@gmail.com', 'ami@gmail.com'),
(19, 20, 2, 'C', 'Az', 'programming', '170', 'bin@gmail.com', 'ami@gmail.com'),
(20, 22, 17, 'Biology', 'As Hasnath', 'Medical', '170', 'ami@gmail.com', 'bin@gmail.com'),
(21, 23, 16, 'English 1', 'Eng', 'Science', '170', 'ami@gmail.com', 'bin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `donatebook`
--

CREATE TABLE `donatebook` (
  `id` int(16) NOT NULL,
  `bname` varchar(32) NOT NULL,
  `aname` varchar(32) NOT NULL,
  `category` varchar(16) NOT NULL,
  `email` varchar(16) NOT NULL,
  `filename` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `donatebook`
--

INSERT INTO `donatebook` (`id`, `bname`, `aname`, `category`, `email`, `filename`) VALUES
(4, 'Compiler', 'CD', 'Math', 'bin@gmail.com', '1572716644964-book2.jpeg'),
(6, 'C++', 'Sx', 'Programming', 'bin@gmail.com', '1572718946368-x4thEnglish.JPG.pagespeed.ic._g_1CosMR8.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `requestbook`
--

CREATE TABLE `requestbook` (
  `id` int(16) NOT NULL,
  `bname` varchar(32) NOT NULL,
  `aname` varchar(32) NOT NULL,
  `category` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requestbook`
--

INSERT INTO `requestbook` (`id`, `bname`, `aname`, `category`, `email`) VALUES
(1, 'SQA', 'Q', 'math', 'ami@gmail.com'),
(2, 'SRE', 'RE', 'programming', 'ami@gmail.com'),
(3, 'Islamic', 'Mizan', 'science', 'bin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(32) NOT NULL,
  `email` varchar(16) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `location` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `email`, `phone`, `password`, `location`) VALUES
('ABC', 'abc@gmail.com', '01686246489', 'abc', 'Kuratoli'),
('AMI', 'ami@gmail.com', '909090', 'mmm', 'Bashundhara'),
('Tarik', 'bin@gmail.com', '01686246489', 'ppp', 'Banani'),
('Bin Shams', 'binm@gmail.com', '01742686982', 'zzz', 'Uttara'),
('Shams', 'shams@gmail.com', '01742686982', 'lll', 'Gulshan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookorder`
--
ALTER TABLE `bookorder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `completeorders`
--
ALTER TABLE `completeorders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donatebook`
--
ALTER TABLE `donatebook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requestbook`
--
ALTER TABLE `requestbook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `bookorder`
--
ALTER TABLE `bookorder`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `completeorders`
--
ALTER TABLE `completeorders`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `donatebook`
--
ALTER TABLE `donatebook`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `requestbook`
--
ALTER TABLE `requestbook`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
