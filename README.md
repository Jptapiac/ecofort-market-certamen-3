# 🌿 ECOFORT MARKET - Prototipo Web Completo

## 📋 Descripción

**Ecofort Market** es un prototipo profesional de plataforma e-commerce especializada en productos de higiene y limpieza industrial para empresas e instituciones en Talcahuano.

### ✨ Características Principales

- ✅ **Frontend Responsivo**: HTML5, CSS3, JavaScript vanilla
- ✅ **Backend Robusto**: Django + Django REST Framework
- ✅ **Base de Datos Optimizada**: MySQL con normalización 3FN
- ✅ **API REST Documentada**: Endpoints completos y validados
- ✅ **CRUD Completo**: Productos, categorías, clientes, contacto
- ✅ **Panel Admin Personalizado**: Gestión de contenido
- ✅ **Seguridad**: CORS, validaciones, sanitización
- ✅ **Tests Unitarios**: Cobertura de modelos
- ✅ **Documentación Completa**: Guías técnicas y de usuario

## 🚀 Quick Start

### Opción 1: Instalación Manual (Recomendado)

#### Requisitos
- Python 3.9+
- MySQL 8.0+
- Editor de código (VSCode)

#### Pasos

```powershell
# 1. Navegar al proyecto
cd "C:\Users\Josta\OneDrive - INACAP\Desktop\ecofort market"

# 2. Crear y activar ambiente virtual
python -m venv venv
.\venv\Scripts\Activate.ps1

# 3. Instalar dependencias backend
cd backend
pip install -r requirements.txt

# 4. Configurar base de datos
# Ejecutar en MySQL:
# CREATE DATABASE ecofort_market;
# CREATE USER 'ecofort'@'localhost' IDENTIFIED BY 'ecofort2025';
# GRANT ALL PRIVILEGES ON ecofort_market.* TO 'ecofort'@'localhost';

# 5. Aplicar migraciones
cd ecofort_project
python manage.py migrate
python manage.py createsuperuser

# 6. Iniciar servidor Django
python manage.py runserver 8000
```

En otra terminal:

```powershell
# 7. Servir frontend
cd frontend
python -m http.server 8080
```

**Acceso:**
- 🌐 Frontend: `http://localhost:8080`
- 🔧 API: `http://localhost:8000/api`
- 👨‍💼 Admin: `http://localhost:8000/admin`

### Opción 2: Script de Inicio Automático

Ejecuta en PowerShell desde la carpeta raíz:

```powershell
# Windows
.\run_ecofort_windows.ps1

# O manualmente:
.\init_backend.ps1
.\init_frontend.ps1
```

## 📁 Estructura del Proyecto

```
ecofort market/
├── frontend/                    # Frontend (HTML/CSS/JavaScript)
│   ├── index.html             # Página principal
│   ├── css/styles.css         # Estilos principales
│   ├── js/main.js            # Lógica frontend
│   └── img/                   # Imágenes
│
├── backend/                    # Backend Django
│   ├── ecofort_project/       # Proyecto Django
│   │   ├── manage.py
│   │   ├── .env               # Configuración
│   │   ├── ecofort_project/   # Settings
│   │   └── apps/
│   │       ├── productos/     # CRUD Productos
│   │       ├── categorias/    # CRUD Categorías
│   │       ├── clientes/      # CRUD Clientes
│   │       └── contacto/      # Formularios
│   ├── requirements.txt       # Dependencias Python
│   └── README.md
│
├── base_datos/                # Documentación BD
│   ├── MER.md
│   ├── script_creacion.sql
│   └── diccionario_datos.md
│
├── documentacion/             # Documentación técnica
│   ├── manual_tecnico.md
│   ├── manual_usuario.md
│   ├── plan_pruebas.md
│   ├── BPMN/
│   ├── UML/
│   └── mockups/
│
└── GUIA_INSTALACION.md       # Esta guía
```

## 🔌 Endpoints API Disponibles

### Productos
- `GET /api/productos/` - Listar todos
- `POST /api/productos/` - Crear
- `GET /api/productos/{id}/` - Obtener detalle
- `PUT /api/productos/{id}/` - Actualizar
- `DELETE /api/productos/{id}/` - Eliminar
- `GET /api/productos/destacados/` - Destacados
- `GET /api/productos/nuevos/` - Nuevos

### Categorías
- `GET /api/categorias/` - Listar
- `POST /api/categorias/` - Crear
- `PUT /api/categorias/{id}/` - Actualizar
- `DELETE /api/categorias/{id}/` - Eliminar

### Clientes
- `GET /api/clientes/` - Listar
- `POST /api/clientes/` - Crear
- `PUT /api/clientes/{id}/` - Actualizar
- `DELETE /api/clientes/{id}/` - Eliminar

### Contacto
- `POST /api/contacto/mensajes/` - Enviar mensaje
- `GET /api/contacto/mensajes/no_leidos/` - No leídos
- `POST /api/contacto/mensajes/{id}/marcar_leido/` - Marcar leído

## 🎨 Características Frontend

- **Navbar Responsiva**: Menú adaptable a móviles
- **Hero Section**: Banner principal impactante
- **Catálogo de Productos**: Grid dinámico con filtros
- **Sistema de Búsqueda**: Búsqueda en tiempo real
- **Carrito de Compras**: Almacenado en localStorage
- **Formulario de Contacto**: Integrado con API
- **Secciones Informativas**: Sobre nosotros, segmentos
- **Footer Completo**: Con redes sociales y enlaces
- **Animaciones Suaves**: Scroll y transiciones
- **Diseño Mobile-First**: 100% responsivo

## 🗄️ Base de Datos

### Tablas principales

- **categorias**: Categorización de productos
- **productos**: Catálogo de productos
- **clientes**: Registro de clientes B2B/B2C
- **mensajes_contacto**: Formularios de contacto

### Normalización: 3FN ✅

### Índices

- `categorias(nombre)` - Búsqueda rápida
- `productos(slug, categoria_id, estado)` - Rendimiento
- `clientes(email, tipo_cliente)` - Queries frecuentes

## 🔐 Seguridad Implementada

- ✅ Validación de entradas en serializers
- ✅ CORS configurado correctamente
- ✅ Sanitización de datos
- ✅ EmailValidator integrado
- ✅ Permisos por vista
- ✅ SQL Injection prevention (ORM Django)
- ✅ XSS protection (CSRF tokens)

## 🧪 Pruebas

### Ejecutar tests

```powershell
cd backend/ecofort_project
python manage.py test
```

### Cobertura de tests

- ✅ Model tests para Categorías
- ✅ Model tests para Productos
- ✅ Model tests para Clientes
- ✅ Serializer validations
- ✅ API endpoint validation

## 📊 Documentación Incluida

1. **Manual Técnico** - Arquitectura, BD, APIs
2. **Manual de Usuario** - Cómo usar el sistema
3. **Plan de Pruebas** - Casos y cobertura
4. **Diagramas UML** - Casos de uso, clases
5. **Modelo ER** - Entidad-relación BD
6. **BPMN** - Flujo de procesos
7. **Mockups** - Diseño visual

## ⚙️ Configuración Personalizada

### Cambiar puerto backend

En `manage.py runserver`:

```powershell
python manage.py runserver 8001
```

### Cambiar puerto frontend

```powershell
python -m http.server 8081
```

### Cambiar credenciales BD

Editar `.env` en `backend/ecofort_project/`:

```
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

## 🐛 Solución de Problemas

### Error: "ModuleNotFoundError"

```powershell
pip install -r backend/requirements.txt
```

### Error: "Can't connect to MySQL"

1. Verifica que MySQL esté activo
2. Verifica credenciales en `.env`
3. Crea la BD manualmente

### Error: CORS

Ya configurado, pero si persiste, verificar `CORS_ALLOWED_ORIGINS` en settings.py

### Frontend no conecta con API

1. Verificar que backend esté activo: `http://localhost:8000`
2. Verificar CORS habilitado
3. Abrir consola navegador (F12) para ver errores

## 📱 Secciones Principales

✅ **Inicio** - Hero section y destacados
✅ **Productos** - Catálogo completo
✅ **Categorías** - Filtrado por tipo
✅ **Segmentos** - Por tipo de cliente
✅ **Sobre Nosotros** - Información empresa
✅ **Contacto** - Formulario de contacto
✅ **Ubicación** - Mapa embebido
✅ **Newsletter** - Suscripción
✅ **Footer** - Enlaces y redes

## 🎯 Próximos Pasos

1. Agregar autenticación de usuarios
2. Sistema de carrito avanzado
3. Pasarela de pagos
4. Reportes y analytics
5. Sistema de reseñas
6. Chat en tiempo real
7. API mobile
8. Despliegue en servidor

## 👨‍💼 Autor

**Ingeniero FullStack Senior**
Especialista en: Django, DRF, Frontend Responsivo, Arquitectura Web

## 📝 Licencia

Proyecto académico - 2025

---

## 🚀 ¿Necesitas ayuda?

1. Revisa `GUIA_INSTALACION.md`
2. Consulta la documentación técnica
3. Verifica los ejemplos en `documentacion/`

**¡Felicidades! Tienes un prototipo web profesional listo para usar.** 🎉
#   E c o f o r - M a r k e t  
 