-- ===============================================
-- ECOFORT MARKET - SCRIPT DE CREACIÓN BD
-- Base de Datos: ecofort_market
-- Collation: utf8mb4_unicode_ci
-- ===============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ecofort_market
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ecofort_market;

-- ===============================================
-- TABLA: categorias
-- ===============================================

CREATE TABLE IF NOT EXISTS categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion LONGTEXT,
    slug VARCHAR(100) NOT NULL UNIQUE,
    imagen VARCHAR(255),
    es_activo BOOLEAN DEFAULT TRUE,
    orden INT DEFAULT 0,
    fecha_creacion DATETIME AUTO_CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_nombre (nombre),
    INDEX idx_slug (slug),
    INDEX idx_es_activo (es_activo),
    INDEX idx_orden (orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: productos
-- ===============================================

CREATE TABLE IF NOT EXISTS productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion LONGTEXT NOT NULL,
    descripcion_corta VARCHAR(500),
    slug VARCHAR(255) NOT NULL UNIQUE,
    categoria_id BIGINT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio > 0),
    precio_descuento DECIMAL(10, 2),
    imagen VARCHAR(255) NOT NULL,
    imagenes_adicionales VARCHAR(1000),
    cantidad_stock INT DEFAULT 0 CHECK (cantidad_stock >= 0),
    especificaciones LONGTEXT,
    estado VARCHAR(20) DEFAULT 'activo',
    es_destacado BOOLEAN DEFAULT FALSE,
    es_nuevo BOOLEAN DEFAULT FALSE,
    calificacion FLOAT DEFAULT 0,
    numero_resenas INT DEFAULT 0,
    fecha_creacion DATETIME AUTO_CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) 
        REFERENCES categorias(id) ON DELETE PROTECT,
    
    INDEX idx_slug (slug),
    INDEX idx_categoria (categoria_id),
    INDEX idx_estado (estado),
    INDEX idx_es_destacado (es_destacado),
    INDEX idx_nombre (nombre),
    INDEX idx_fecha_creacion (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: clientes
-- ===============================================

CREATE TABLE IF NOT EXISTS clientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    tipo_cliente VARCHAR(20) DEFAULT 'particular',
    rut VARCHAR(20) UNIQUE,
    razon_social VARCHAR(255),
    direccion LONGTEXT,
    ciudad VARCHAR(100),
    region VARCHAR(100),
    codigo_postal VARCHAR(20),
    compra_minima DECIMAL(10, 2) DEFAULT 0 CHECK (compra_minima >= 0),
    es_activo BOOLEAN DEFAULT TRUE,
    notas LONGTEXT,
    fecha_creacion DATETIME AUTO_CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_tipo_cliente (tipo_cliente),
    INDEX idx_es_activo (es_activo),
    INDEX idx_rut (rut),
    INDEX idx_fecha_creacion (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: mensajes_contacto
-- ===============================================

CREATE TABLE IF NOT EXISTS mensajes_contacto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    empresa VARCHAR(255),
    asunto VARCHAR(20) DEFAULT 'consulta',
    mensaje LONGTEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    respondido BOOLEAN DEFAULT FALSE,
    respuesta LONGTEXT,
    fecha_creacion DATETIME AUTO_CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_respuesta DATETIME,
    
    INDEX idx_email (email),
    INDEX idx_asunto (asunto),
    INDEX idx_leido (leido),
    INDEX idx_fecha_creacion (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- INSERTS DE DATOS DE DEMOSTRACIÓN
-- ===============================================

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion, slug, orden) VALUES
('Papeles', 'Productos de papel para higiene', 'papeles', 1),
('Personal Care', 'Productos de cuidado personal', 'personal-care', 2),
('Limpieza', 'Productos de limpieza profesional', 'limpieza', 3),
('Dispensadores', 'Dispensadores profesionales', 'dispensadores', 4);

-- Insertar productos
INSERT INTO productos (nombre, descripcion, descripcion_corta, slug, categoria_id, precio, precio_descuento, imagen, cantidad_stock, estado, es_destacado) 
VALUES
(
    'Papel Higiénico Elite Professional',
    'Papel higiénico de alta calidad, suave, resistente y de larga duración para uso profesional',
    'Papel higiénico premium de 250 hojas',
    'papel-higienico-elite',
    1,
    5990,
    4990,
    'productos/papel_higienico.jpg',
    100,
    'activo',
    TRUE
),
(
    'Dispensador Automático de Jabón',
    'Dispensador automático de jabón sin contacto, ideal para baños corporativos',
    'Dispensador automático para baños',
    'dispensador-jabon-automatico',
    4,
    29990,
    NULL,
    'productos/dispensador.jpg',
    50,
    'activo',
    TRUE
),
(
    'Desinfectante Multiusos',
    'Desinfectante potente para todas las superficies, elimina virus y bacterias',
    'Desinfectante para todo tipo de superficies',
    'desinfectante-multiusos',
    3,
    3990,
    2990,
    'productos/desinfectante.jpg',
    200,
    'activo',
    FALSE
),
(
    'Jabón Antibacterial 500ml',
    'Jabón líquido antibacterial para manos, uso frecuente y seguro',
    'Jabón líquido antibacterial',
    'jabon-antibacterial',
    2,
    2990,
    NULL,
    'productos/jabon.jpg',
    150,
    'activo',
    TRUE
),
(
    'Servilletas Premium',
    'Servilletas de papel premium, suaves y muy absorbentes',
    'Servilletas 100 unidades',
    'servilletas-premium',
    1,
    1990,
    1490,
    'productos/servilletas.jpg',
    300,
    'activo',
    FALSE
);

-- Insertar clientes de ejemplo
INSERT INTO clientes (nombre, email, telefono, tipo_cliente, rut, razon_social) 
VALUES
('Empresa ABC Ltda.', 'contacto@empresaabc.cl', '+56 2 2123 4567', 'empresa', '12.345.678-9', 'ABC SpA'),
('Juan García', 'juan.garcia@email.com', '+56 9 8765 4321', 'particular', NULL, NULL),
('Distribuidora XYZ', 'ventas@xyz.cl', '+56 41 2654 8900', 'distribuidor', '98.765.432-1', 'XYZ Distribuidora');

-- ===============================================
-- VISTAS ÚTILES
-- ===============================================

-- Vista: Productos con información de categoría
CREATE OR REPLACE VIEW v_productos_categoria AS
SELECT 
    p.id,
    p.nombre,
    p.precio,
    p.precio_descuento,
    p.cantidad_stock,
    c.nombre AS categoria,
    p.es_destacado,
    p.fecha_creacion
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id
WHERE p.estado = 'activo';

-- Vista: Productos con descuento
CREATE OR REPLACE VIEW v_productos_descuento AS
SELECT 
    id,
    nombre,
    precio,
    precio_descuento,
    ROUND(((precio - precio_descuento) / precio * 100), 2) AS porcentaje_descuento
FROM productos
WHERE precio_descuento IS NOT NULL
AND estado = 'activo'
ORDER BY porcentaje_descuento DESC;

-- Vista: Resumen de contactos
CREATE OR REPLACE VIEW v_contactos_resumen AS
SELECT 
    DATE(fecha_creacion) AS fecha,
    COUNT(*) AS total_mensajes,
    SUM(CASE WHEN leido = FALSE THEN 1 ELSE 0 END) AS no_leidos,
    SUM(CASE WHEN respondido = TRUE THEN 1 ELSE 0 END) AS respondidos
FROM mensajes_contacto
GROUP BY DATE(fecha_creacion);

-- ===============================================
-- CREAR USUARIO PARA APLICACIÓN
-- ===============================================

-- Crear usuario específico para Django
CREATE USER IF NOT EXISTS 'ecofort'@'localhost' IDENTIFIED BY 'ecofort2025';
GRANT ALL PRIVILEGES ON ecofort_market.* TO 'ecofort'@'localhost';
FLUSH PRIVILEGES;

-- ===============================================
-- INFORMACIÓN DE LA BASE DE DATOS
-- ===============================================

-- Para ver las tablas creadas:
-- SHOW TABLES;
-- DESCRIBE categorias;
-- DESCRIBE productos;
-- DESCRIBE clientes;
-- DESCRIBE mensajes_contacto;

-- Para ver la información de las vistas:
-- SELECT * FROM v_productos_categoria;
-- SELECT * FROM v_productos_descuento;
-- SELECT * FROM v_contactos_resumen;

-- ===============================================
-- PROCEDIMIENTOS ALMACENADOS
-- ===============================================

-- Procedimiento: Obtener productos por categoría
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS sp_productos_por_categoria(
    IN p_categoria_id BIGINT
)
BEGIN
    SELECT 
        id,
        nombre,
        descripcion_corta,
        precio,
        precio_descuento,
        imagen,
        cantidad_stock
    FROM productos
    WHERE categoria_id = p_categoria_id
    AND estado = 'activo'
    ORDER BY fecha_creacion DESC;
END //

DELIMITER ;

-- Procedimiento: Actualizar stock de producto
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS sp_actualizar_stock(
    IN p_producto_id BIGINT,
    IN p_cantidad INT
)
BEGIN
    UPDATE productos
    SET cantidad_stock = cantidad_stock - p_cantidad
    WHERE id = p_producto_id
    AND cantidad_stock >= p_cantidad;
END //

DELIMITER ;

-- ===============================================
-- FIN DEL SCRIPT
-- ===============================================

-- Verificar integridad
-- SELECT COUNT(*) as total_categorias FROM categorias;
-- SELECT COUNT(*) as total_productos FROM productos;
-- SELECT COUNT(*) as total_clientes FROM clientes;
