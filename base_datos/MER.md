# 📊 MODELO ENTIDAD-RELACIÓN (MER) - ECOFORT MARKET

## Entidades Principales

### 1. CATEGORIAS
```
┌─────────────────────┐
│   CATEGORIAS        │
├─────────────────────┤
│ id (PK)            │
│ nombre (UNIQUE)    │
│ descripcion        │
│ slug (UNIQUE)      │
│ imagen             │
│ es_activo          │
│ orden              │
│ fecha_creacion     │
│ fecha_actualizacion│
└─────────────────────┘
```

**Índices:**
- PRIMARY KEY: id
- UNIQUE: nombre, slug
- INDEX: es_activo, orden

---

### 2. PRODUCTOS
```
┌──────────────────────────────┐
│        PRODUCTOS             │
├──────────────────────────────┤
│ id (PK)                      │
│ nombre                       │
│ descripcion                  │
│ descripcion_corta            │
│ slug (UNIQUE)                │
│ categoria_id (FK)            │
│ precio                       │
│ precio_descuento (NULLABLE)  │
│ imagen                       │
│ imagenes_adicionales         │
│ cantidad_stock               │
│ especificaciones (JSON)      │
│ estado                       │
│ es_destacado                 │
│ es_nuevo                     │
│ calificacion                 │
│ numero_resenas               │
│ fecha_creacion               │
│ fecha_actualizacion          │
└──────────────────────────────┘
     │
     │ (FK)
     │
   [CATEGORIAS]
```

**Relación:** PRODUCTOS (N) --- (1) CATEGORIAS

**Índices:**
- PRIMARY KEY: id
- FOREIGN KEY: categoria_id → categorias(id)
- UNIQUE: slug
- INDEX: slug, categoria_id, estado

---

### 3. CLIENTES
```
┌──────────────────────────────┐
│        CLIENTES              │
├──────────────────────────────┤
│ id (PK)                      │
│ nombre                       │
│ email (UNIQUE)               │
│ telefono                     │
│ tipo_cliente                 │
│ rut (UNIQUE, NULLABLE)       │
│ razon_social (NULLABLE)      │
│ direccion                    │
│ ciudad                       │
│ region                       │
│ codigo_postal                │
│ compra_minima                │
│ es_activo                    │
│ notas                        │
│ fecha_creacion               │
│ fecha_actualizacion          │
└──────────────────────────────┘
```

**Índices:**
- PRIMARY KEY: id
- UNIQUE: email, rut
- INDEX: email, tipo_cliente

---

### 4. MENSAJES_CONTACTO
```
┌──────────────────────────────┐
│    MENSAJES_CONTACTO         │
├──────────────────────────────┤
│ id (PK)                      │
│ nombre                       │
│ email                        │
│ telefono (NULLABLE)          │
│ empresa (NULLABLE)           │
│ asunto                       │
│ mensaje                      │
│ leido                        │
│ respondido                   │
│ respuesta (NULLABLE)         │
│ fecha_creacion               │
│ fecha_actualizacion          │
│ fecha_respuesta (NULLABLE)   │
└──────────────────────────────┘
```

**Índices:**
- PRIMARY KEY: id
- INDEX: email, asunto, leido

---

## Diagrama de Relaciones

```
┌─────────────────────┐
│   CATEGORIAS        │
│   (Papeles,         │
│    Personal Care,   │
│    Limpieza,        │
│    Dispensadores)   │
└────────┬────────────┘
         │ (1)
         │
    (N)  │
         ├─────────────────┐
         │                 │
    ┌────▼─────────────────────┐
    │      PRODUCTOS           │
    │ (Papel Higiénico,        │
    │  Dispensador,            │
    │  Jabón, etc.)            │
    └──────────────────────────┘

┌──────────────────────┐
│     CLIENTES         │
│ (Empresas, Personas, │
│  Distribuidores)     │
└──────────────────────┘

┌──────────────────────┐
│ MENSAJES_CONTACTO    │
│ (Consultas, Reclamos,│
│  Solicitudes)        │
└──────────────────────┘
```

---

## Normalización

### Primera Forma Normal (1FN)
✅ Todos los atributos contienen valores atómicos
✅ No hay grupos repetitivos
✅ Cada fila tiene un identificador único

### Segunda Forma Normal (2FN)
✅ Cumple 1FN
✅ No hay dependencias parciales de la clave
✅ Todas las propiedades dependen completamente de la clave primaria

### Tercera Forma Normal (3FN)
✅ Cumple 2FN
✅ No hay dependencias transitivas
✅ Datos normalizados sin redundancia

---

## Estadísticas Estimadas

| Tabla | Registros | Tamaño Aprox |
|-------|-----------|-------------|
| categorias | 10-50 | 10 KB |
| productos | 100-1000 | 500 KB |
| clientes | 50-5000 | 2 MB |
| mensajes_contacto | 100-10000 | 5 MB |

---

## Tipología de Campos

| Tipo | Usos | Ejemplo |
|------|------|---------|
| CharField | Textos cortos | nombre, email, teléfono |
| TextField | Textos largos | descripción, mensaje |
| DecimalField | Precios | precio, compra_minima |
| IntegerField | Cantidades | stock, calificación |
| BooleanField | Flags | es_activo, leido |
| DateTimeField | Marcas de tiempo | fecha_creacion |
| ImageField | Imágenes | imagen, fotografía |
| ForeignKey | Relaciones | categoria_id |
| SlugField | URLs amigables | slug |

---

## Claves y Restricciones

### Primary Keys (PK)
- Todos los registros tienen `id` auto-generado

### Foreign Keys (FK)
- `productos.categoria_id` → `categorias.id`
- Restricción: ON DELETE PROTECT (evita eliminar categoría con productos)

### Unique Constraints (UNIQUE)
- `categorias.nombre`
- `categorias.slug`
- `productos.slug`
- `clientes.email`
- `clientes.rut`

### Check Constraints
- `productos.precio > 0`
- `productos.cantidad_stock >= 0`
- `clientes.compra_minima >= 0`

---

## Scripts SQL

Ver archivo: `script_creacion.sql`

---

## Diccionario de Datos

Ver archivo: `diccionario_datos.md`

---

## Consideraciones de Diseño

1. **Flexibilidad**: Campos NULLABLE para datos opcionales
2. **Auditoria**: fecha_creacion y fecha_actualizacion en todas las tablas
3. **Búsqueda**: slug y texto para búsqueda rápida
4. **Escalabilidad**: Índices optimizados para consultas frecuentes
5. **Integridad**: Foreign keys previenen datos huérfanos
6. **Seguridad**: Datos sensibles normalizados

---

**Diagrama completo MER en formato visual disponible en carpeta `/documentacion/diagrama_MER.png`**
