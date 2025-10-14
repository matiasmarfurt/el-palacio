-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2025 a las 23:11:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `el_palacio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_admin` int(11) NOT NULL,
  `nombre_admin` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña_admin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedido`
--

CREATE TABLE `detallepedido` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodopago`
--

CREATE TABLE `metodopago` (
  `id_metodopago` int(11) NOT NULL,
  `nombre_metodopago` varchar(255) NOT NULL,
  `descripcion_metodopago` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id_pago` int(11) NOT NULL,
  `id_metodopago` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `monto` double NOT NULL,
  `fecha_pago` date NOT NULL,
  `estado_pago` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` double NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `direccion_entrega` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` double NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`nombre`, `descripcion`, `precio`, `categoria`, `id`) VALUES
('Laptop Lenovo V15', 'Portátil de 15.6\" con Ryzen 5 y 8GB RAM', 599.99, 'Electrónica', 1),
('Mouse Logitech M170', 'Mouse inalámbrico con batería larga duración', 14.5, 'Accesorios', 2),
('Auriculares JBL Tune', 'Auriculares inalámbricos con micrófono', 44.9, 'Audio', 3),
('Silla Gamer Noganet', 'Silla ergonómica con soporte lumbar', 199.99, 'Muebles', 4),
('Teclado Redragon K552', 'Teclado mecánico retroiluminado', 59, 'Accesorios', 5),
('Smartphone Samsung A15', 'Celular con cámara triple y 128GB de memoria', 249, 'Telefonía', 6),
('Disco SSD Kingston 480GB', 'Unidad de estado sólido SATA3', 32.99, 'Almacenamiento', 7),
('Monitor LG 24\" IPS', 'Monitor Full HD con panel IPS', 129.99, 'Electrónica', 8),
('pan', 'lindo', 50, 'Comida', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `apellido_usuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `email`, `password`, `tipo`) VALUES
(11, 'juanito23', '', 'juanito23@gmail.com', '1234abcd', 'cliente'),
(12, 'carla_dev', '', 'carla.dev@hotmail.com', 'qwerty123', 'cliente'),
(13, 'adminmaster', '', 'admin@tienda.com', 'adminpass', 'cliente'),
(14, 'tomas_gamer', '', 'tomasg@correo.com', 'pass4321', 'cliente'),
(15, 'luli_art', '', 'luli.art@gmail.com', 'arte2025', 'cliente'),
(16, 'fernandoTech', '', 'fer.tech@yahoo.com', 'techlife!', 'cliente'),
(17, 'vale_mkt', '', 'vale.marketing@mail.com', 'mkt2025val', 'cliente'),
(18, 'fede_dev', '', 'fede@devmail.com', 'devrules99', 'cliente'),
(19, 'rocio_admin', '', 'rocio.adm@gmail.com', 'seguriD4D', 'cliente'),
(20, 'nico_test', '', 'nico.test@correo.com', 'test123test', 'cliente'),
(21, 'pepe', 'pepe', 'pepitorodriguez@correofalso.com', '$2y$10$aH.vCjWCS.4BKmtaghMqeeihvPImuiFMIYJfqjUawUsTanzY2KLVC', 'cliente'),
(23, 'pedro', 'julian', 'pepitorodriguez@correofalso.com', '$2y$10$hdZTnTTzEidFs16t4MllEeDRLYawJqUN/A6RlRPkHE8x6iPmN5oxm', 'cliente'),
(24, 'pedro', 'julian', 'pepitorodriguez@correofalso.com', '$2y$10$0i6cRnBEsX6tAAu3ENvONO0m9v74KlkhJbueNC8pU2djO9KtuRxSi', 'cliente'),
(25, 'pedro', 'julian', 'pepitorodriguez@correofalso.com', '$2y$10$22IhVscSJZrekcHAvJKQCeb5o1pObJeIq/3zC8cdKZ/KHCT.YOWXq', 'cliente'),
(26, 'pepe', 'pedro', 'pepitorodriguez@correofalso.com', '$2y$10$mdYQCQznReeF9gXtpGMz9.RisXyWaZo0uHBWhavVHpr2GywNGsiFC', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `personas` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `comentarios` text DEFAULT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'pendiente',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indices de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  ADD PRIMARY KEY (`id_metodopago`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_metodopago` (`id_metodopago`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  MODIFY `id_metodopago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

-- AUTO_INCREMENT de la tabla `reservas`
-- (si la tabla fue añadida al volcado, aseguramos PK y AUTO_INCREMENT)
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`);

ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_metodopago`) REFERENCES `metodopago` (`id_metodopago`),
  ADD CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
