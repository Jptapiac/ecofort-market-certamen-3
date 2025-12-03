# 📖 DICCIONARIO DE DATOS - ECOFORT MARKET

## 1. TABLA: CATEGORIAS

| Campo | Tipo | Tamaño | Nulo | Clave | Descripción |
|-------|------|--------|------|-------|-------------|
| id | BIGINT | - | No | PK | Identificador único de categoría (auto-incremental) |
| nombre | VARCHAR | 100 | No | UNIQUE | Nombre único de la categoría |
| descripcion | LONGTEXT | - | Sí | - | Descripción detallada de la categoría |
| slug | VARCHAR | 100 | No | UNIQUE | URL amigable para la categoría (ej: "papeles") |
| imagen | VARCHAR | 255 | Sí | - | Ruta de la imagen representativa |
| es_activo | BOOLEAN | - | No | - | Indica si la categoría está visible (DEFAULT: TRUE) |
| orden | INT | - | No | - | Orden de visualización en menú (DEFAULT: 0) |
| fecha_creacion | DATETIME | - | No | - | Fecha y hora de creación (AUTO-TIMESTAMP) |
| fecha_actualizacion | DATETIME | - | No | - | Fecha de última modificación (AUTO-UPDATE) |

**Índices:**
- `nombre` - Búsqueda rápida por nombre
- `slug` - Búsqueda por URL amigable
- `es_activo` - Filtrado de categorías activas
- `orden` - Ordenamiento visual

**Ejemplos de datos:**
```
id=1, nombre="Papeles", slug="papeles", es_activo=1, orden=1
id=2, nombre="Personal Care", slug="personal-care", es_activo=1, orden=2
```

---

## 2. TABLA: PRODUCTOS

| Campo | Tipo | Tamaño | Nulo | Clave | Descripción |
|-------|------|--------|------|-------|-------------|
| id | BIGINT | - | No | PK | Identificador único de producto |
| nombre | VARCHAR | 255 | No | - | Nombre del producto |
| descripcion | LONGTEXT | - | No | - | Descripción completa del producto |
| descripcion_corta | VARCHAR | 500 | Sí | - | Resumen para listados |
| slug | VARCHAR | 255 | No | UNIQUE | URL amigable del producto |
| categoria_id | BIGINT | - | No | FK | Referencia a categorias.id |
| precio | DECIMAL | 10,2 | No | - | Precio original en CLP (> 0) |
| precio_descuento | DECIMAL | 10,2 | Sí | - | Precio con descuento (si aplica) |
| imagen | VARCHAR | 255 | No | - | Ruta de imagen principal |
| imagenes_adicionales | VARCHAR | 1000 | Sí | - | URLs adicionales separadas por comas |
| cantidad_stock | INT | - | No | - | Stock disponible (>= 0) |
| especificaciones | LONGTEXT | - | Sí | - | Datos técnicos en formato JSON |
| estado | VARCHAR | 20 | No | - | 'activo', 'inactivo', 'descatalogado' |
| es_destacado | BOOLEAN | - | No | - | Mostrar en sección destacados (DEFAULT: FALSE) |
| es_nuevo | BOOLEAN | - | No | - | Marcar como producto nuevo (DEFAULT: FALSE) |
| calificacion | FLOAT | - | No | - | Puntuación promedio (0-5) |
| numero_resenas | INT | - | No | - | Cantidad de reseñas |
| fecha_creacion | DATETIME | - | No | - | Fecha de ingreso al catálogo |
| fecha_actualizacion | DATETIME | - | No | - | Última modificación |

**Restricciones:**
- `precio > 0` - El precio debe ser positivo
- `precio_descuento < precio` - Descuento debe ser menor que precio
- `cantidad_stock >= 0` - No puede ser negativo
- `categoria_id` referencia `categorias.id` con `ON DELETE PROTECT`

**Índices:**
- `slug` - Búsqueda por URL
- `categoria_id` - Filtrado por categoría
- `estado` - Filtrado de productos activos
- `es_destacado` - Búsqueda de destacados
- `nombre` - Búsqueda por nombre
- `fecha_creacion` - Ordenamiento por antigüedad

**Valores posibles (estado):**
- `'activo'` - Producto disponible
- `'inactivo'` - Temporalmente no disponible
- `'descatalogado'` - Descontinuado

**Ejemplo:**
```
id=1
nombre="Papel Higiénico Elite Professional"
categoria_id=1
precio=5990.00
precio_descuento=4990.00
estado='activo'
es_destacado=1
cantidad_stock=100
```

---

## 3. TABLA: CLIENTES

| Campo | Tipo | Tamaño | Nulo | Clave | Descripción |
|-------|------|--------|------|-------|-------------|
| id | BIGINT | - | No | PK | Identificador único de cliente |
| nombre | VARCHAR | 255 | No | - | Nombre o razón social |
| email | VARCHAR | 255 | No | UNIQUE | Email del cliente (único) |
| telefono | VARCHAR | 20 | Sí | - | Teléfono de contacto |
| tipo_cliente | VARCHAR | 20 | No | - | 'empresa', 'particular', 'distribuidor' |
| rut | VARCHAR | 20 | Sí | UNIQUE | RUT del cliente (formato: XX.XXX.XXX-X) |
| razon_social | VARCHAR | 255 | Sí | - | Razón social para empresas |
| direccion | LONGTEXT | - | Sí | - | Dirección completa |
| ciudad | VARCHAR | 100 | Sí | - | Ciudad (ej: "Talcahuano") |
| region | VARCHAR | 100 | Sí | - | Región (ej: "Bío Bío") |
| codigo_postal | VARCHAR | 20 | Sí | - | Código postal |
| compra_minima | DECIMAL | 10,2 | No | - | Monto mínimo de compra en CLP (>= 0) |
| es_activo | BOOLEAN | - | No | - | Si el cliente está activo (DEFAULT: TRUE) |
| notas | LONGTEXT | - | Sí | - | Observaciones internas |
| fecha_creacion | DATETIME | - | No | - | Fecha de registro |
| fecha_actualizacion | DATETIME | - | No | - | Última modificación |

**Restricciones:**
- `compra_minima >= 0` - No puede ser negativo
- `email` único en la tabla
- `rut` único (si se proporciona)

**Índices:**
- `email` - Búsqueda por correo
- `tipo_cliente` - Filtrado por tipo
- `es_activo` - Filtrado de clientes activos
- `rut` - Búsqueda por RUT

**Tipos de cliente:**
- `'empresa'` - Cliente empresa/institucional
- `'particular'` - Cliente individual
- `'distribuidor'` - Distribuidor mayorista

**Ejemplo:**
```
id=1
nombre="Empresa ABC Ltda."
email="contacto@abc.cl"
tipo_cliente='empresa'
rut="12.345.678-9"
razon_social="ABC Servicios SpA"
compra_minima=50000.00
es_activo=1
```

---

## 4. TABLA: MENSAJES_CONTACTO

| Campo | Tipo | Tamaño | Nulo | Clave | Descripción |
|-------|------|--------|------|-------|-------------|
| id | BIGINT | - | No | PK | Identificador único de mensaje |
| nombre | VARCHAR | 255 | No | - | Nombre del remitente |
| email | VARCHAR | 255 | No | - | Email del remitente |
| telefono | VARCHAR | 20 | Sí | - | Teléfono de contacto |
| empresa | VARCHAR | 255 | Sí | - | Empresa (opcional) |
| asunto | VARCHAR | 20 | No | - | Tipo de consulta |
| mensaje | LONGTEXT | - | No | - | Contenido del mensaje (mín 10 caracteres) |
| leido | BOOLEAN | - | No | - | Si fue leído por administrador (DEFAULT: FALSE) |
| respondido | BOOLEAN | - | No | - | Si se envió respuesta (DEFAULT: FALSE) |
| respuesta | LONGTEXT | - | Sí | - | Texto de la respuesta |
| fecha_creacion | DATETIME | - | No | - | Cuándo se envió el mensaje |
| fecha_actualizacion | DATETIME | - | No | - | Última actualización |
| fecha_respuesta | DATETIME | - | Sí | - | Cuándo se respondió |

**Índices:**
- `email` - Búsqueda por correo
- `asunto` - Filtrado por tipo
- `leido` - Filtrado de pendientes
- `fecha_creacion` - Ordenamiento

**Asuntos válidos:**
- `'consulta'` - Consulta general
- `'compra'` - Información de compra
- `'distribuidor'` - Quiero ser distribuidor
- `'reclamo'` - Reclamo
- `'otro'` - Otro

**Validaciones:**
- Email válido (contiene @)
- Mensaje >= 10 caracteres
- Email y asunto requeridos

**Ejemplo:**
```
id=1
nombre="Juan García"
email="juan@email.com"
asunto='consulta'
mensaje="Quisiera obtener más información sobre..."
leido=0
respondido=0
fecha_creacion=2025-01-15 14:30:00
```

---

## Estadísticas de Uso

### Campos por Tabla
- **categorias**: 9 campos
- **productos**: 19 campos
- **clientes**: 16 campos
- **mensajes_contacto**: 13 campos

### Tipos de Datos Utilizados
- VARCHAR: Para textos cortos
- LONGTEXT: Para descripciones largas
- DECIMAL(10,2): Para moneda (precios)
- INT: Para cantidades
- BIGINT: Para IDs (escalable)
- BOOLEAN: Para flags
- DATETIME: Para timestamps

### Relaciones
- **1:N** CATEGORIAS → PRODUCTOS
- **INDEPENDIENTES**: CLIENTES, MENSAJES_CONTACTO

---

## Restricciones y Validaciones

| Campo | Validación | Motivo |
|-------|-----------|--------|
| precio | > 0 | No puede haber precios negativos |
| cantidad_stock | >= 0 | Stock no puede ser negativo |
| compra_minima | >= 0 | Monto mínimo no puede ser negativo |
| mensaje | >= 10 caracteres | Evita mensajes muy cortos |
| email | Formato válido | Correo verificable |

---

## Consultas Comunes

### Obtener productos activos por categoría
```sql
SELECT p.* FROM productos p
WHERE p.estado = 'activo'
AND p.categoria_id = 1
ORDER BY p.fecha_creacion DESC;
```

### Productos con descuento
```sql
SELECT id, nombre, precio, precio_descuento,
ROUND(((precio - precio_descuento) / precio * 100), 2) as descuento_pct
FROM productos
WHERE precio_descuento IS NOT NULL
ORDER BY descuento_pct DESC;
```

### Mensajes no respondidos
```sql
SELECT * FROM mensajes_contacto
WHERE respondido = FALSE
ORDER BY fecha_creacion ASC;
```

### Clientes activos por tipo
```sql
SELECT tipo_cliente, COUNT(*) as cantidad
FROM clientes
WHERE es_activo = TRUE
GROUP BY tipo_cliente;
```

---

## Notas Importantes

1. **Caracteres Especiales**: Usar UTF-8 (utf8mb4_unicode_ci)
2. **Fechas**: Formato DATETIME (YYYY-MM-DD HH:MM:SS)
3. **Moneda**: CLP (pesos chilenos) con 2 decimales
4. **RUT Chileno**: Formato XX.XXX.XXX-X o XXXXXXXXX
5. **Auditoria**: Todas las tablas registran fecha_creacion y fecha_actualizacion
6. **Soft Delete**: Se recomienda usar `es_activo` en lugar de eliminar

---

**Última actualización: 2025-01-15**
**Versión: 1.0**
