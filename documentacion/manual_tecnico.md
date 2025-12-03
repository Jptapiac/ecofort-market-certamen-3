# 📘 MANUAL TÉCNICO - ECOFORT MARKET

## 1. ARQUITECTURA DEL SISTEMA

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR CLIENTE                    │
│  (HTML5, CSS3, JavaScript - Responsive Design)          │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTP/AJAX
                 │
         ┌───────▼────────────────────┐
         │    SERVIDOR WEB (8000)     │
         │  Django + DRF              │
         │  ├─ Enrutamiento (urls)    │
         │  ├─ Vistas/ViewSets        │
         │  ├─ Serializadores         │
         │  └─ Autenticación/CORS     │
         └───────┬────────────────────┘
                 │
                 │ ORM (Django ORM)
                 │
         ┌───────▼────────────────────┐
         │   BASE DE DATOS MySQL      │
         │  ├─ categorias             │
         │  ├─ productos              │
         │  ├─ clientes               │
         │  └─ mensajes_contacto      │
         └────────────────────────────┘
```

## 2. COMPONENTES PRINCIPALES

### 2.1 Frontend

**Tecnologías:**
- HTML5 semántico
- CSS3 con variables CSS y Flexbox/Grid
- JavaScript vanilla (sin dependencias)
- HTTP.server para servir archivos

**Características:**
- Responsive (móvil, tablet, desktop)
- Consumo de API REST
- LocalStorage para carrito
- Formularios validados
- Animaciones suaves

**Archivos:**
```
frontend/
├── index.html         # Página principal
├── css/
│   └── styles.css     # Estilos globales
├── js/
│   └── main.js        # Lógica frontend
└── img/               # Imágenes
```

### 2.2 Backend

**Tecnologías:**
- Python 3.9+
- Django 4.2.7
- Django REST Framework
- MySQL driver (mysqlclient)
- Pillow (para imágenes)

**Estructura:**
```
backend/ecofort_project/
├── ecofort_project/   # Configuración global
│   ├── settings.py    # Configuración Django
│   ├── urls.py        # Enrutamiento general
│   └── wsgi.py        # Aplicación WSGI
├── apps/              # Aplicaciones
│   ├── productos/     # CRUD Productos
│   ├── categorias/    # CRUD Categorías
│   ├── clientes/      # CRUD Clientes
│   └── contacto/      # Contacto
├── media/             # Archivos subidos
├── static/            # Archivos estáticos
├── manage.py          # Herramienta CLI
└── .env               # Variables ambiente
```

### 2.3 Base de Datos

**Motor:** MySQL 8.0+
**Característica:** Normalización 3FN
**Tablas:** 4 principales + vistas

## 3. FLUJO DE DATOS

### Consulta de Productos

```
1. Cliente accede a http://localhost:8080
   ↓
2. index.html carga CSS y JavaScript
   ↓
3. main.js ejecuta cargarProductos()
   ↓
4. Fetch GET http://localhost:8000/api/productos/
   ↓
5. Django REST enruta a ProductoViewSet.list()
   ↓
6. Vista obtiene queryset filtrado
   ↓
7. ProductoSerializer serializa datos
   ↓
8. JSON regresa al cliente
   ↓
9. JavaScript renderiza HTML dinámicamente
   ↓
10. Usuario ve productos en el navegador
```

### Envío de Contacto

```
1. Usuario completa formulario y envía
   ↓
2. enviarMensaje() previene comportamiento por defecto
   ↓
3. Fetch POST http://localhost:8000/api/contacto/mensajes/
   ↓
4. Django recibe datos JSON
   ↓
5. MensajeContactoSerializer valida datos
   ↓
6. Vista crea registro en BD
   ↓
7. Respuesta 201 Created al cliente
   ↓
8. Frontend muestra confirmación
```

## 4. ENDPOINTS API

### Productos

```
GET    /api/productos/
       Parámetros: search, categoria_id, ordering
       Respuesta: { count, next, previous, results[] }

GET    /api/productos/{id}/
       Respuesta: { id, nombre, precio, ... }

POST   /api/productos/
       Body: { nombre, descripcion, categoria, precio, ... }
       Respuesta: 201 Created

PUT    /api/productos/{id}/
       Body: { nombre, precio, ... }
       Respuesta: 200 OK

DELETE /api/productos/{id}/
       Respuesta: 204 No Content

GET    /api/productos/destacados/
       Respuesta: Productos con es_destacado=True

GET    /api/productos/nuevos/
       Respuesta: Productos con es_nuevo=True

GET    /api/productos/con_descuento/
       Respuesta: Productos con precio_descuento
```

### Categorías

```
GET    /api/categorias/
POST   /api/categorias/
GET    /api/categorias/{id}/
PUT    /api/categorias/{id}/
DELETE /api/categorias/{id}/
```

### Clientes

```
GET    /api/clientes/
POST   /api/clientes/
GET    /api/clientes/{id}/
PUT    /api/clientes/{id}/
DELETE /api/clientes/{id}/
```

### Contacto

```
POST   /api/contacto/mensajes/
       Body: { nombre, email, asunto, mensaje }
       Respuesta: 201 Created

GET    /api/contacto/mensajes/no_leidos/
       Respuesta: { no_leidos: number }

POST   /api/contacto/mensajes/{id}/marcar_leido/
       Respuesta: 200 OK
```

## 5. MODELOS DE DATOS

### Producto

```python
class Producto(models.Model):
    nombre: str (255)
    descripcion: str (largo)
    categoria: FK → Categoria
    precio: decimal (10,2)
    precio_descuento: decimal (10,2) optional
    imagen: ImageField
    cantidad_stock: int
    estado: enum (activo, inactivo, descatalogado)
    es_destacado: bool
    fecha_creacion: datetime
    fecha_actualizacion: datetime
    
    @property
    tiene_descuento: bool
    porcentaje_descuento: int
```

### Categoría

```python
class Categoria(models.Model):
    nombre: str (100) unique
    descripcion: str (largo)
    slug: str (100) unique
    imagen: ImageField optional
    es_activo: bool = True
    orden: int = 0
```

### Cliente

```python
class Cliente(models.Model):
    nombre: str (255)
    email: str (255) unique
    telefono: str (20)
    tipo_cliente: enum (empresa, particular, distribuidor)
    rut: str (20) unique optional
    direccion: str (largo)
    compra_minima: decimal
    es_activo: bool = True
```

### MensajeContacto

```python
class MensajeContacto(models.Model):
    nombre: str (255)
    email: str (255)
    asunto: enum (consulta, compra, distribuidor, reclamo, otro)
    mensaje: str (largo)
    leido: bool = False
    respondido: bool = False
    respuesta: str (largo) optional
    fecha_creacion: datetime
```

## 6. CONFIGURACIÓN

### settings.py - Secciones Principales

```python
# Base de datos
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ecofort_market',
        'USER': 'ecofort',
        'PASSWORD': 'ecofort2025',
    }
}

# Apps instaladas
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'apps.productos',
    'apps.categorias',
    'apps.clientes',
    'apps.contacto',
]

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [SearchFilter, OrderingFilter],
}

# CORS
CORS_ALLOWED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:8000',
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

### .env - Variables de Entorno

```
SECRET_KEY=django-insecure-ecofort-market-talcahuano-2025
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_ENGINE=django.db.backends.mysql
DB_NAME=ecofort_market
DB_USER=ecofort
DB_PASSWORD=ecofort2025
DB_HOST=localhost
DB_PORT=3306

CORS_ALLOWED_ORIGINS=http://localhost:8080
```

## 7. INSTALACIÓN Y DESPLIEGUE

### Instalación Local

```bash
# 1. Crear ambiente virtual
python -m venv venv

# 2. Activar ambiente
.\venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate      # Linux/Mac

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Configurar BD
# Ejecutar script_creacion.sql en MySQL

# 5. Aplicar migraciones
cd backend/ecofort_project
python manage.py migrate

# 6. Crear superusuario
python manage.py createsuperuser

# 7. Iniciar servidor
python manage.py runserver 8000
```

### Despliegue en Producción

```bash
# Usar Gunicorn
pip install gunicorn

# Recopilar archivos estáticos
python manage.py collectstatic --noinput

# Ejecutar con Gunicorn
gunicorn ecofort_project.wsgi:application --bind 0.0.0.0:8000

# Usar Nginx como proxy reverso
# Configurar HTTPS con Let's Encrypt
# Usar variables de entorno para credenciales
```

## 8. SEGURIDAD

### Implementadas

- ✅ CSRF Protection (tokens automáticos)
- ✅ SQL Injection Prevention (ORM Django)
- ✅ XSS Protection (escapado de HTML)
- ✅ Validación de entrada (serializers)
- ✅ CORS configurado
- ✅ Sanitización de datos
- ✅ Permisos por vistas
- ✅ Password hashing (Django Auth)

### Recomendaciones Producción

1. Cambiar SECRET_KEY
2. DEBUG = False
3. ALLOWED_HOSTS específico
4. HTTPS obligatorio
5. Usar headers de seguridad
6. Rate limiting
7. Logging y monitoreo
8. Backups automáticos BD

## 9. RENDIMIENTO

### Optimizaciones Implementadas

- Índices en campos frecuentes
- Paginación (20 items/página)
- Lazy loading de imágenes
- Caching de CSS/JS
- Minificación recomendada
- Compresión GZIP

### Recomendaciones

1. CDN para imágenes estáticas
2. Cache de bases de datos
3. Compresión de assets
4. Lazy loading de componentes
5. API throttling
6. Monitoreo de performance

## 10. MANTENIMIENTO

### Backups

```bash
# Backup de BD
mysqldump -u ecofort -p ecofort_market > backup.sql

# Restaurar
mysql -u ecofort -p ecofort_market < backup.sql
```

### Actualizaciones

```bash
# Django
pip install --upgrade django

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Recopilar statics
python manage.py collectstatic
```

### Logs

Se recomienda:
1. Logs en archivo
2. Rotación de logs
3. Monitoreo centralizado
4. Alertas de errores

## 11. TROUBLESHOOTING

### Error: "ModuleNotFoundError"
→ Activar ambiente virtual e instalar dependencias

### Error: "Can't connect to MySQL"
→ Verificar servicio MySQL activo y credenciales

### Error: CORS
→ Verificar CORS_ALLOWED_ORIGINS en settings.py

### Error: Imágenes no cargan
→ Verificar ruta MEDIA_URL y MEDIA_ROOT

### Performance lento
→ Revisar índices, usar Django Debug Toolbar, cachear

## 12. RECURSOS ÚTILES

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Python Documentation](https://docs.python.org/)

---

**Versión:** 1.0
**Última actualización:** 2025-01-15
**Autor:** Ingeniero FullStack Senior
