-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 19, 2020 lúc 07:11 AM
-- Phiên bản máy phục vụ: 10.1.37-MariaDB
-- Phiên bản PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dbs314838`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `datacode`
--

CREATE TABLE `datacode` (
  `id` int(11) NOT NULL,
  `nameCode` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `passWord` varchar(100) NOT NULL,
  `member` int(10) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `views` int(20) NOT NULL,
  `createddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `datacode`
--

INSERT INTO `datacode` (`id`, `nameCode`, `data`, `passWord`, `member`, `lang`, `views`, `createddate`) VALUES
(1, '5', '//Hello World!', '5', 5, '', 0, '2020-03-11 23:00:00'),
(4, '123', '\npublic class HelloWorld {\n\n    public static void main(String[] args) {\n        // Prints \'Hello, World\' to the terminal window.\n        System.out.println(\'Hello, World\'); \n    }\n    \n    public static int maximum(int a, int b, int c){\n        int max = Integer.MIN_VALUE;\n        \n        max = a > max ? a : max;\n        max = b > max ? b : max;\n        max = c > max ? c : max;\n        \n        return max;\n    }\n}\n        \n        ', '', 3, 'java', 0, '2020-03-11 23:00:00'),
(5, 'Nguyen', '\n  \n  #include <iostream>\nusing namespace std;\n  \nint main()\n{\n	cout << \'Hello World\' << endl;\n	cin.get();\n	return 0;f\n}\n ', '', 3, 'c_cpp', 0, '2020-03-11 23:00:00'),
(6, 'abc', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(7, 'abcd', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(8, 'abcdf', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(9, 'abcdfe', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(10, 'abcdfeg', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(11, 'abcdfegh', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(12, 'abcdfeghi', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(13, 'abcdfeghik', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(14, 'abcdfeghikl', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(17, 'abcdfeghiklm', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        ', '123', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(18, 'abcdfeghiklmn', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(19, 'abcdfeghiklmno', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(20, 'abcdfeghiklmnop', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(21, 'abcdfeghiklmsss', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(22, 'sasasa', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(23, 'favicon.ico', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 120, '2020-03-13 20:14:39'),
(24, 'dePVAigr', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(25, 'AFJWjTou', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(26, 'UaLgAOpI', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(27, 'rvSbQxiK', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(28, 'KJsjyOWK', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(29, 'gokEzugO', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(30, 'JWiHSkRL', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(31, 'fudTLYBt', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(32, 'ZmKySkFU', '\n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(33, 'tudaynha', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(34, 'lcciYfvR', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(35, 'fvHuZfGq', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(36, 'cwMXjwpE', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(37, 'OVUqkQwa', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(38, 'baitap', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        ', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(39, 'AMrJYeyN', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(40, 'UrvFzccJ', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(41, 'yHPJuoqR', '\n        \n          #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        ', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(42, 'alo', '\n        \n        \n        \n        \n        ', '123', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(43, 'alo2', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(44, 'aloaaaaaaa', ' #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        ', 'a', 5, 'java', 0, '2020-03-11 23:00:00'),
(45, 'aloaaaaaaaa', '\n        \n        \n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        \n        ', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(46, 'vantu', '\n        \n        \n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        \n        ', 'anhem', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(47, 'absd', '\n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        ', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(48, 'sIwavDpO', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(49, 'tyoajYdk', ' #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        \n        \n        \n        \n        \n        \n        \n        ', '', 5, 'c_cpp', 0, '2020-03-11 23:00:00'),
(50, 'aa', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        \n        \n        \n        \n        \n        \n        \n        ', 'acc', 5, 'java', 3, '2020-03-12 22:26:19'),
(51, 'aas', '\n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        ', '', 5, 'c_cpp', 1, '2020-03-12 22:27:31'),
(52, 'FGrPLHoO', '\n\n\nddsdsdssdsdsdsd\nsd\nsd\nsd\nsd\nsd\nsd\nsd\nsd\nsd\nsd\nds\nd\nsd\nsd\nsdds\ns\ns\ns\nds\na\nd', '', 5, 'c_cpp', 17, '2020-03-12 23:11:18'),
(53, 'ZfUiiXPc', '\n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        ', '', 5, 'c_cpp', 1, '2020-03-13 13:03:46'),
(54, 'LwYjVAzz', '\n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        ', '', 5, 'c_cpp', 1, '2020-03-13 13:04:03'),
(55, 'ZKEiBD', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        ', '', 5, 'c_cpp', 1, '2020-03-13 13:05:52'),
(56, 'AFRKkOns', '\n        \n         #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        ', '', 5, 'c_cpp', 16, '2020-03-13 13:43:27'),
(57, 'jFtJeM', '\n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        ', '', 5, 'c_cpp', 1, '2020-03-13 17:25:47'),
(58, 'tWuYBk', '\n        \n        #include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }\n        \n        ', '', 5, 'c_cpp', 2, '2020-03-13 17:40:12'),
(59, 'ZyIrZK', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 2, '2020-03-13 20:12:26'),
(60, 'vsGZMyEs', '#include <iostream>\n  using namespace std;\n    \n  int main()\n  {\n    cout << \'Hello World\' << endl;\n   \n    cin.get();\n    return 0;\n  }', '', 5, 'c_cpp', 1, '2020-03-13 20:14:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `datauser`
--

CREATE TABLE `datauser` (
  `nameOfType` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `soluong` int(20) NOT NULL,
  `timeupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `datauser`
--

INSERT INTO `datauser` (`nameOfType`, `soluong`, `timeupdate`) VALUES
('user', 48, '2020-03-13 20:14:39');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `datacode`
--
ALTER TABLE `datacode`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nameCode` (`nameCode`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `datacode`
--
ALTER TABLE `datacode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
