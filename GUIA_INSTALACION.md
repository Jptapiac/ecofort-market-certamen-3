# GUÍA DE INSTALACIÓN Y CONFIGURACIÓN - ECOFORT MARKET

## Requisitos Previos

- **Python 3.9+**
- **MySQL 8.0+** (o MariaDB)
- **Git** (opcional)
- **Visual Studio Code** o editor de código

## 1. PREPARACIÓN DEL ENTORNO

### 1.1 Crear carpeta del proyecto (si no existe)

```powershell
cd "C:\Users\Josta\OneDrive - INACAP\Desktop\ecofort market"
```

### 1.2 Crear y activar ambiente virtual

```powershell
# Crear ambiente virtual
python -m venv venv

# Activar (Windows - PowerShell)
.\venv\Scripts\Activate.ps1

# Si tienes error de permisos, ejecuta esto primero:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 2. CONFIGURACIÓN DE BASE DE DATOS

### 2.1 Crear base de datos MySQL

```sql
-- Abrir MySQL y ejecutar:
CREATE DATABASE ecofort_market CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ecofort'@'localhost' IDENTIFIED BY 'ecofort2025';
GRANT ALL PRIVILEGES ON ecofort_market.* TO 'ecofort'@'localhost';
FLUSH PRIVILEGES;
```

Alternativa: Usar HeidiSQL o MySQL Workbench para crear la base de datos gráficamente.

### 2.2 Actualizar archivo `.env`

En `backend\ecofort_project\.env`:

```
DB_ENGINE=django.db.backends.mysql
DB_NAME=ecofort_market
DB_USER=ecofort
DB_PASSWORD=ecofort2025
DB_HOST=localhost
DB_PORT=3306
```

## 3. INSTALACIÓN DEL BACKEND

### 3.1 Instalar dependencias

```powershell
# Desde la carpeta backend
cd backend

# Instalar paquetes
pip install -r requirements.txt
```

Si tienes problemas con mysqlclient, intenta:

```powershell
pip install mysqlclient==2.2.0
# O
pip install PyMySQL
```

### 3.2 Crear migraciones de base de datos

```powershell
cd ecofort_project

# Hacer migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate
```

### 3.3 Crear superusuario (administrador)

```powershell
python manage.py createsuperuser
# Ingresa: Username, Email, Contraseña
# Ejemplo: admin / admin@ecofort.cl / Admin@2025
```

### 3.4 Crear datos de demostración (opcional)

```powershell
python manage.py shell
```

Dentro del shell:

```python
from apps.categorias.models import Categoria
from apps.productos.models import Producto

# Crear categorías
papeles = Categoria.objects.create(nombre="Papeles", descripcion="Productos de papel")
personal = Categoria.objects.create(nombre="Personal Care", descripcion="Cuidado personal")
limpieza = Categoria.objects.create(nombre="Limpieza", descripcion="Productos de limpieza")
dispensadores = Categoria.objects.create(nombre="Dispensadores", descripcion="Dispensadores profesionales")

# Crear productos
Producto.objects.create(
    nombre="Papel Higiénico Elite",
    descripcion="Papel higiénico de alta calidad",
    categoria=papeles,
    precio=5990,
    precio_descuento=4990,
    imagen="productos/papel.jpg",
    cantidad_stock=100
)

print("✓ Datos de demostración creados")
exit()
```

### 3.5 Iniciar servidor Django

```powershell
python manage.py runserver 8000
```

**Backend estará disponible en:** `http://localhost:8000`

## 4. CONFIGURACIÓN DEL FRONTEND

### 4.1 Abrir el frontend

```powershell
# En otra terminal (manteniendo el backend activo)
cd frontend

# Opción 1: Usar Python como servidor (necesitas python en PATH)
python -m http.server 8080

# Opción 2: Si tienes Node.js instalado:
npx http-server -p 8080

# Opción 3: Manualmente - click derecho en index.html > Abrir con navegador
```

**Frontend estará disponible en:** `http://localhost:8080` o abre el archivo `index.html` directamente

## 5. VALIDAR LA INSTALACIÓN

### Backend - Verificar API

```
GET  http://localhost:8000/api/productos/
GET  http://localhost:8000/api/categorias/
GET  http://localhost:8000/api/clientes/
POST http://localhost:8000/api/contacto/mensajes/
```

### Admin Django

```
URL: http://localhost:8000/admin/
Usuario: admin
Contraseña: (la que creaste)
```

### Frontend

```
URL: http://localhost:8080
```

## 6. SOLUCIÓN DE PROBLEMAS

### Error: "No module named 'django'"

```powershell
pip install -r requirements.txt
```

### Error: "Can't connect to MySQL"

1. Verifica que MySQL esté ejecutándose:
   - Windows: `Services` > busca MySQL
   - O ejecuta: `mysql -u root -p`

2. Actualiza credenciales en `.env`

3. Intenta con usuario root primero

### Error: "django_db.ProgrammingError"

```powershell
python manage.py migrate --run-syncdb
```

### CORS Error en Frontend

Ya está configurado en settings.py, pero si persiste:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:3000',
]
```

### Puerto ya en uso

Para cambiar puerto:

```powershell
# Backend
python manage.py runserver 8001

# Frontend
python -m http.server 8081
```

## 7. PRUEBAS

### Ejecutar tests backend

```powershell
python manage.py test
```

### Test manual API con curl

```powershell
# Obtener productos
curl http://localhost:8000/api/productos/

# Enviar mensaje
curl -X POST http://localhost:8000/api/contacto/mensajes/ `
  -H "Content-Type: application/json" `
  -d "{\"nombre\":\"Juan\",\"email\":\"juan@test.com\",\"mensaje\":\"Test\"}"
```

## 8. ESTRUCTURA DE CARPETAS

```
ecofort market/
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── img/
│   └── index.html
├── backend/
│   ├── ecofort_project/
│   │   ├── ecofort_project/
│   │   ├── apps/
│   │   │   ├── productos/
│   │   │   ├── categorias/
│   │   │   ├── clientes/
│   │   │   └── contacto/
│   │   ├── media/
│   │   ├── static/
│   │   ├── .env
│   │   ├── manage.py
│   │   └── db.sqlite3
│   ├── requirements.txt
│   └── README.md
├── base_datos/
│   ├── MER.md
│   ├── script_creacion.sql
│   └── diccionario_datos.md
└── documentacion/
    ├── manual_tecnico.md
    ├── manual_usuario.md
    ├── plan_pruebas.md
    └── README.md
```

## 9. DESARROLLO FUTURO

Para agregar nuevas funcionalidades:

1. **Crear app**: `python manage.py startapp nombre_app`
2. **Crear modelos**: En `models.py`
3. **Crear serializers**: En `serializers.py`
4. **Crear views**: En `views.py`
5. **Migrar**: `python manage.py makemigrations && python manage.py migrate`

## 10. DESPLIEGUE EN PRODUCCIÓN (Referencia)

```bash
# Collectar statics
python manage.py collectstatic

# Usar gunicorn
pip install gunicorn
gunicorn ecofort_project.wsgi:application --bind 0.0.0.0:8000
```

---

**¡Felicidades! Ecofort Market está listo para funcionar.**

Para más ayuda, revisa la documentación técnica en `/documentacion/`
