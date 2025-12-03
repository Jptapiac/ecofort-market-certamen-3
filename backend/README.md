# 🔧 BACKEND - ECOFORT MARKET

## Descripción

Backend robusto y escalable de Ecofort Market construido con **Django 4.2** y **Django REST Framework 3.14**.

## 🚀 Características

- ✅ API REST completa y documentada
- ✅ CRUD para productos, categorías, clientes y contacto
- ✅ Autenticación y autorización
- ✅ Validaciones robustas
- ✅ CORS configurado
- ✅ Paginación automática
- ✅ Filtrado y búsqueda
- ✅ Tests unitarios incluidos
- ✅ Soporte para MySQL
- ✅ Manejo de imágenes con Pillow

## 📋 Requisitos

- Python 3.9+
- MySQL 8.0+
- pip (gestor de paquetes Python)

## 📦 Instalación

### 1. Crear ambiente virtual

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Instalar dependencias

```powershell
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

```powershell
# Copia el ejemplo
Copy-Item .env.example .env

# Edita .env con tus valores
# Notepad .env
```

### 4. Crear base de datos

```sql
CREATE DATABASE ecofort_market CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ecofort'@'localhost' IDENTIFIED BY 'ecofort2025';
GRANT ALL PRIVILEGES ON ecofort_market.* TO 'ecofort'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Aplicar migraciones

```powershell
cd ecofort_project
python manage.py migrate
```

### 6. Crear superusuario

```powershell
python manage.py createsuperuser
# Username: admin
# Email: admin@ecofort.cl
# Password: admin2025
```

### 7. Cargar datos iniciales (opcional)

```powershell
python manage.py shell
```

Dentro del shell:

```python
from apps.categorias.models import Categoria
from apps.productos.models import Producto

# Crear categorías
Categoria.objects.create(nombre="Papeles", slug="papeles", orden=1)
Categoria.objects.create(nombre="Personal Care", slug="personal-care", orden=2)

# Crear productos
# ... (ver documentación para ejemplos)

exit()
```

## 🎯 Uso

### Iniciar servidor

```powershell
python manage.py runserver 8000
```

El servidor estará disponible en: `http://localhost:8000`

### Endpoints principales

**API REST Base:**
```
GET    http://localhost:8000/api/productos/
GET    http://localhost:8000/api/categorias/
GET    http://localhost:8000/api/clientes/
POST   http://localhost:8000/api/contacto/mensajes/
```

**Admin Django:**
```
http://localhost:8000/admin/
Usuario: admin
Contraseña: admin2025
```

**Documentación:**
```
http://localhost:8000/api/docs/
```

## 📁 Estructura

```
ecofort_project/
├── ecofort_project/          # Configuración global
│   ├── settings.py           # Configuración Django
│   ├── urls.py               # Enrutamiento general
│   ├── wsgi.py               # Aplicación WSGI
│   └── asgi.py               # Aplicación ASGI
│
├── apps/                      # Aplicaciones Django
│   ├── productos/             # Módulo de productos
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── admin.py
│   │   └── tests.py
│   ├── categorias/            # Módulo de categorías
│   ├── clientes/              # Módulo de clientes
│   └── contacto/              # Módulo de contacto
│
├── media/                     # Archivos subidos
├── static/                    # Archivos estáticos
├── templates/                 # Plantillas HTML
├── manage.py                  # Herramienta CLI
├── requirements.txt           # Dependencias
├── .env                       # Variables de entorno
└── .env.example               # Ejemplo de .env
```

## 🔐 Seguridad

### Implementadas

- CSRF Protection
- SQL Injection Prevention (ORM)
- XSS Protection
- CORS Control
- Validaciones de entrada
- Password hashing
- Rate limiting (recomendado)

### Para Producción

1. Cambiar `SECRET_KEY`
2. Configurar `DEBUG = False`
3. Especificar `ALLOWED_HOSTS`
4. Activar HTTPS
5. Usar headers de seguridad
6. Implementar Rate Limiting
7. Configurar logging y monitoreo
8. Usar variables de entorno seguras

## 🧪 Tests

### Ejecutar tests

```powershell
python manage.py test
```

### Tests específicos

```powershell
python manage.py test apps.productos
python manage.py test apps.productos.tests.ProductoModelTest
```

### Con cobertura

```powershell
pip install coverage

coverage run --source='.' manage.py test
coverage report
coverage html  # Genera reporte HTML
```

## 🛠️ Comandos Útiles

### Migraciones

```powershell
# Ver migraciones no aplicadas
python manage.py showmigrations

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Revertir migraciones
python manage.py migrate apps.productos 0001
```

### Management

```powershell
# Shell interactivo Django
python manage.py shell

# Recopilar archivos estáticos
python manage.py collectstatic

# Crear usuario
python manage.py createsuperuser

# Vaciar BD (CUIDADO)
python manage.py flush
```

## 📊 API Endpoints

### Productos

```
GET    /api/productos/                    # Listar todos
POST   /api/productos/                    # Crear nuevo
GET    /api/productos/{id}/               # Obtener detalle
PUT    /api/productos/{id}/               # Actualizar
DELETE /api/productos/{id}/               # Eliminar
GET    /api/productos/destacados/         # Destacados
GET    /api/productos/nuevos/             # Nuevos
GET    /api/productos/con_descuento/      # Con descuento
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
POST   /api/contacto/mensajes/                        # Enviar
GET    /api/contacto/mensajes/no_leidos/              # No leídos
POST   /api/contacto/mensajes/{id}/marcar_leido/      # Marcar leído
```

## 🔍 Parámetros de Query

### Búsqueda

```
GET /api/productos/?search=papel

Busca en: nombre, descripción, categoría
```

### Filtrado por Categoría

```
GET /api/productos/?categoria_id=1
```

### Ordenamiento

```
GET /api/productos/?ordering=nombre
GET /api/productos/?ordering=-precio

Opciones: nombre, precio, fecha_creacion, calificacion
```

### Paginación

```
GET /api/productos/?page=2

Por defecto: 20 items por página
```

## 🐛 Troubleshooting

### Error: "ModuleNotFoundError: No module named 'django'"

```powershell
pip install -r requirements.txt
```

### Error: "Can't connect to MySQL"

1. Verifica MySQL está ejecutándose
2. Verifica credenciales en `.env`
3. Verifica BD fue creada
4. Intenta con usuario root primero

### Error: "django.db.migrations.graph.CircularDependencyError"

```powershell
# Elimina archivos __pycache__
Remove-Item -Path "." -Filter "__pycache__" -Recurse -Force

# Intenta migraciones nuevamente
python manage.py migrate
```

### Error: "Port 8000 already in use"

```powershell
# Cambiar puerto
python manage.py runserver 8001
```

## 📚 Documentación

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Manual Técnico](../documentacion/manual_tecnico.md)
- [Plan de Pruebas](../documentacion/plan_pruebas.md)

## 🔄 Despliegue

### Opción 1: Gunicorn

```powershell
pip install gunicorn

gunicorn ecofort_project.wsgi:application --bind 0.0.0.0:8000
```

### Opción 2: uWSGI

```powershell
pip install uwsgi

uwsgi --http :8000 --wsgi-file ecofort_project/wsgi.py --master --processes 4
```

### Opción 3: Servidor de Producción

- **Nginx/Apache** como proxy reverso
- **Supervisor** para gestionar procesos
- **Let's Encrypt** para HTTPS
- **PostgreSQL** en producción

## 📝 Logs

Los logs se guardan en:
```
logs/django.log
```

Configurar en `settings.py` para detalles.

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feature/nueva-feature`
2. Realiza cambios
3. Commit: `git commit -am 'Add nueva-feature'`
4. Push: `git push origin feature/nueva-feature`
5. Pull Request

## 📝 Licencia

Proyecto académico - 2025

## 👨‍💼 Autor

**Ingeniero FullStack Senior**
Especialista en Django, DRF y APIs REST

---

**Última actualización:** 2025-01-15
**Versión:** 1.0
**Estado:** ✅ Listo para producción
