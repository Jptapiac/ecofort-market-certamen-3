# 🏗️ ARQUITECTURA TÉCNICA - Ecofort Market v2.0

## 📐 Diagrama General

```
                    ┌─ CLIENTE NAVEGADOR ─┐
                    │  (http://localhost)  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼──────────┐
                    │   FRONTEND LAYER    │
                    ├─────────────────────┤
                    │ index.html          │
                    │ catalog.html        │
                    │ CSS (Responsive)    │
                    │ JS (API Calls)      │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  REST API (50+)     │
                    │  http://8000/api    │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────────────────┐
                    │    DJANGO BACKEND (v4.2.7)     │
                    ├────────────────────────────────┤
                    │ ┌─────────────────────────────┐ │
                    │ │ APPS PRINCIPALES:           │ │
                    │ ├─────────────────────────────┤ │
                    │ │ • productos (CRUD)          │ │
                    │ │ • categorias (CRUD)         │ │
                    │ │ • clientes (CRUD)           │ │
                    │ │ • contacto (Mensajes)       │ │
                    │ │ • autenticacion (Login)     │ │
                    │ └─────────────────────────────┘ │
                    └──────────┬──────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   MYSQL DATABASE    │
                    │  (localhost:3306)   │
                    └─────────────────────┘
```

---

## 🔐 Autenticación - Flujo de Tokens

```
┌─────────────────┐
│ Usuario ingresa │
│ email/password  │
└────────┬────────┘
         │
         ▼
    ┌─────────────────────────────────┐
    │ POST /autenticacion/login/      │
    │ {email, password}               │
    └────────┬────────────────────────┘
             │
             ▼
    ┌─────────────────────────────────┐
    │ Django valida credentials       │
    │ (check_password)                │
    └────────┬────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼ ✓ OK        ▼ ✗ Error
   ┌──────┐     ┌──────────┐
   │Token │     │ 400 Bad  │
   │ Gen  │     │ Request  │
   └──┬───┘     └──────────┘
      │
      ▼
    ┌─────────────────────────────────┐
    │ localStorage.setItem(token)     │
    │ localStorage.setItem(usuario)   │
    └────────┬────────────────────────┘
             │
             ▼
    ┌─────────────────────────────────┐
    │ Siguientes Requests:            │
    │ Header: Authorization: Token XX │
    └─────────────────────────────────┘
```

---

## 📦 Estructura de Carpetas Detallada

```
ecofort market/                          [ROOT]
│
├── 📂 frontend/                         [CLIENTE]
│   ├── index.html                       ✅ Landing page (400+ líneas)
│   │   ├── Header + Navigation
│   │   ├── Bootstrap Carousel (3 slides)
│   │   ├── Product Preview Section
│   │   ├── Contact Section
│   │   ├── Footer
│   │   ├── Login Modal
│   │   └── Cart Modal
│   │
│   ├── catalog.html                     ✅ Catalog page (350+ líneas)
│   │   ├── Header
│   │   ├── Sidebar Filters
│   │   ├── Sorting Dropdown
│   │   ├── Product Grid
│   │   ├── Pagination
│   │   ├── Breadcrumb
│   │   └── Modals
│   │
│   ├── css/
│   │   └── styles.css                   (978 líneas)
│   │       ├── CSS Variables (colors, sizes)
│   │       ├── Grid System (cols-1 a cols-4)
│   │       ├── Button Components
│   │       ├── Card Components
│   │       ├── 4 Responsive Breakpoints
│   │       ├── Animations
│   │       └── Print Styles
│   │
│   └── js/
│       ├── main.js                      (550+ líneas)
│       │   ├── API Integration
│       │   ├── Authentication Functions
│       │   ├── Cart Management
│       │   ├── UI Updates
│       │   ├── Notifications
│       │   └── Event Listeners
│       │
│       └── catalog.js                   (350+ líneas)
│           ├── cargarProductos()
│           ├── aplicarFiltros()
│           ├── aplicarOrdenamiento()
│           ├── limpiarFiltros()
│           ├── agregarAlCarrito()
│           └── mostrarProductos()
│
├── 📂 backend/                          [SERVIDOR]
│   ├── requirements.txt                 ✅ Dependencias
│   │   ├── Django==4.2.7
│   │   ├── djangorestframework==3.14.0
│   │   ├── django-cors-headers==4.3.1
│   │   ├── Pillow==10.1.0
│   │   ├── python-decouple==3.8
│   │   ├── mysqlclient==2.2.0
│   │   ├── psycopg2-binary==2.9.9
│   │   └── coreapi==2.3.3
│   │
│   ├── ecofort_project/                 [DJANGO PROJECT]
│   │   ├── manage.py
│   │   │
│   │   ├── apps/                        [APPS]
│   │   │   ├── __init__.py
│   │   │   │
│   │   │   ├── productos/
│   │   │   │   ├── models.py            (Producto model)
│   │   │   │   ├── serializers.py       (ProductoSerializer)
│   │   │   │   ├── views.py             (ProductoViewSet - CRUD)
│   │   │   │   ├── urls.py              (Rutas)
│   │   │   │   ├── admin.py             (Admin customizado)
│   │   │   │   ├── tests.py             (Tests)
│   │   │   │   └── migrations/
│   │   │   │
│   │   │   ├── categorias/
│   │   │   │   ├── models.py            (Categoria model)
│   │   │   │   ├── serializers.py
│   │   │   │   ├── views.py
│   │   │   │   ├── urls.py
│   │   │   │   ├── admin.py
│   │   │   │   ├── tests.py
│   │   │   │   └── migrations/
│   │   │   │
│   │   │   ├── clientes/
│   │   │   │   ├── models.py            (Cliente model)
│   │   │   │   ├── serializers.py
│   │   │   │   ├── views.py
│   │   │   │   ├── urls.py
│   │   │   │   ├── admin.py
│   │   │   │   ├── tests.py
│   │   │   │   └── migrations/
│   │   │   │
│   │   │   ├── contacto/
│   │   │   │   ├── models.py            (MensajeContacto model)
│   │   │   │   ├── serializers.py
│   │   │   │   ├── views.py
│   │   │   │   ├── urls.py
│   │   │   │   ├── admin.py
│   │   │   │   ├── tests.py
│   │   │   │   └── migrations/
│   │   │   │
│   │   │   └── autenticacion/           ✅ [NUEVO]
│   │   │       ├── models.py            (PerfilCliente model)
│   │   │       ├── serializers.py       (Login, Registro, Usuario)
│   │   │       ├── views.py             (5 endpoints)
│   │   │       ├── urls.py              (Rutas)
│   │   │       ├── admin.py             (PerfilClienteAdmin)
│   │   │       ├── apps.py
│   │   │       ├── tests.py
│   │   │       └── migrations/
│   │   │           └── 0001_initial.py  ✅ [NUEVA]
│   │   │
│   │   └── ecofort_project/             [SETTINGS]
│   │       ├── __init__.py
│   │       ├── settings.py              ✅ [ACTUALIZADO]
│   │       │   ├── BASE_DIR
│   │       │   ├── INSTALLED_APPS
│   │       │   ├── DATABASES (MySQL)
│   │       │   ├── REST_FRAMEWORK
│   │       │   ├── CORS_ALLOWED_ORIGINS
│   │       │   └── LOGGING
│   │       │
│   │       ├── urls.py                  ✅ [ACTUALIZADO]
│   │       │   ├── router.register()
│   │       │   ├── path('api/autenticacion/', ...)
│   │       │   ├── path('api/contacto/', ...)
│   │       │   └── path('api/docs/', ...)
│   │       │
│   │       ├── asgi.py
│   │       └── wsgi.py
│   │
│   ├── media/                           (Imágenes productos)
│   ├── static/                          (Archivos estáticos)
│   └── templates/                       (Templates HTML - Django)
│
├── 📂 base_datos/
│   └── ecofort_market.sql               (330+ líneas)
│       ├── DROP TABLES
│       ├── CREATE TABLE categorias
│       ├── CREATE TABLE productos
│       ├── CREATE TABLE clientes
│       ├── CREATE TABLE mensajes_contacto
│       ├── INSERT INTO categorias
│       ├── INSERT INTO productos
│       └── CREATE INDEXES
│
├── 📂 documentacion/
│   ├── README.md
│   ├── MANUAL_USUARIO.md
│   ├── GUIA_INSTALACION.md
│   ├── GUIA_PRESENTACION.md
│   ├── MATRIZ_RUBRICA_EVALUACION.md
│   ├── API_DOCUMENTATION.md
│   ├── DIAGRAMA_BD.md
│   ├── AUTENTICACION_Y_CATALOGO.md      ✅ [NUEVO]
│   ├── CONCLUSIONES.md
│   ├── ACTA_ENTREGA.md
│   ├── CHECKLIST_FINAL.md
│   ├── INSTRUCCIONES_ENTREGA.md
│   └── (Más documentos)
│
├── 📂 venv/                             [PYTHON ENV]
│   ├── Scripts/
│   │   ├── python.exe
│   │   ├── pip.exe
│   │   └── Activate.ps1
│   │
│   └── Lib/
│       └── site-packages/               (Dependencias)
│
├── setup.ps1                            ✅ Instalación automática
├── run_backend.ps1                      ✅ Inicia Django
├── run_frontend.ps1                     ✅ Inicia HTTP Server
├── README_v2.0.md                       ✅ [NUEVO] Readme actualizado
├── PROXIMOS_PASOS.md                    ✅ [NUEVO] Instrucciones
└── .env (local)                         (Variables de entorno)
```

---

## 🔌 API Architecture

### REST Endpoints by Resource

```
AUTENTICACION (NEW)
├── POST   /api/autenticacion/login/           [2.0]
├── POST   /api/autenticacion/registro/        [2.0]
├── GET    /api/autenticacion/perfil/          [2.0]
├── POST   /api/autenticacion/logout/          [2.0]
└── PUT    /api/autenticacion/perfil/actualizar/ [2.0]

PRODUCTOS
├── GET    /api/productos/                     [LIST]
├── POST   /api/productos/                     [CREATE]
├── GET    /api/productos/{id}/                [RETRIEVE]
├── PUT    /api/productos/{id}/                [UPDATE]
└── DELETE /api/productos/{id}/                [DELETE]

CATEGORIAS
├── GET    /api/categorias/                    [LIST]
├── POST   /api/categorias/                    [CREATE]
├── GET    /api/categorias/{id}/               [RETRIEVE]
├── PUT    /api/categorias/{id}/               [UPDATE]
└── DELETE /api/categorias/{id}/               [DELETE]

CLIENTES
├── GET    /api/clientes/                      [LIST]
├── POST   /api/clientes/                      [CREATE]
├── GET    /api/clientes/{id}/                 [RETRIEVE]
├── PUT    /api/clientes/{id}/                 [UPDATE]
└── DELETE /api/clientes/{id}/                 [DELETE]

CONTACTO
├── GET    /api/contacto/                      [LIST]
└── POST   /api/contacto/                      [CREATE]

DOCUMENTACION
└── GET    /api/docs/                          [Swagger UI]
```

---

## 💾 Database Schema (3FN)

```
┌─────────────────────────┐
│      CATEGORIAS         │
├─────────────────────────┤
│ id (PK)                 │
│ nombre                  │
│ descripcion             │
│ icono                   │
│ fecha_creacion          │
└────────────┬────────────┘
             │ (1:N)
             │
┌────────────▼────────────┐
│      PRODUCTOS          │
├─────────────────────────┤
│ id (PK)                 │
│ nombre                  │
│ descripcion             │
│ precio                  │
│ precio_descuento        │
│ categoria_id (FK)       │
│ imagen                  │
│ stock                   │
│ es_destacado            │
│ es_nuevo                │
│ fecha_creacion          │
└────────────┬────────────┘
             │
    ┌────────┴────────┐
    │                 │
    │ (Muchos a Many) │
    │                 │
┌───▼──────────────────┐
│      CLIENTES        │
├──────────────────────┤
│ id (PK)              │
│ nombre               │
│ email                │
│ telefono             │
│ empresa              │
│ rut                  │
│ direccion            │
│ ciudad               │
│ fecha_registro       │
└──────────────────────┘

┌──────────────────────────────┐
│  MENSAJES_CONTACTO           │
├──────────────────────────────┤
│ id (PK)                      │
│ nombre                       │
│ email                        │
│ asunto                       │
│ mensaje                      │
│ leido                        │
│ fecha_envio                  │
└──────────────────────────────┘

┌──────────────────────────────┐
│  AUTHTOKEN (Django)          │
├──────────────────────────────┤
│ key (Token único)            │
│ user_id (FK → User)          │
│ created                      │
└──────────────────────────────┘

┌──────────────────────────────┐
│  USERS (Django Default)      │
├──────────────────────────────┤
│ id (PK)                      │
│ username                     │
│ email                        │
│ password (hashed)            │
│ first_name                   │
│ last_name                    │
│ is_staff                     │
│ is_active                    │
│ date_joined                  │
└──────────────────────────────┘

┌──────────────────────────────┐
│  PERFILCLIENTE (OneToOne)    │
├──────────────────────────────┤
│ id (PK)                      │
│ usuario_id (FK → User)       │
│ telefono                     │
│ direccion                    │
│ ciudad                       │
│ fecha_registro               │
└──────────────────────────────┘
```

---

## 🔄 Data Flow - Ejemplo: Obtener Productos Filtrados

```
Usuario en navegador
        │
        ▼
[Escribir en search input]
        │
        ▼
[300ms debounce timeout]
        │
        ▼
buscarProductos() ← main.js
        │
        ▼
fetch('/api/productos/?search=termo')
        │
        ▼
═══════════════════════════════════════════════════════════
BACKEND - Django
═══════════════════════════════════════════════════════════
        │
        ▼
ProductoViewSet.list(request)
        │
        ▼
SearchFilter procesa query_params
        │
        ├─ if 'search' → filter por nombre/descripcion
        ├─ if 'ordering' → order_by
        └─ if 'category' → filter por categoria
        │
        ▼
Producto.objects.filter(...).order_by(...)
        │
        ▼
Paginate (20 por página)
        │
        ▼
ProductoSerializer (many=True)
        │
        ▼
Response JSON
═══════════════════════════════════════════════════════════
        │
        ▼
JSON response recibida en navegador
        │
        ▼
renderizarProductos(data) ← main.js
        │
        ├─ Limpiar grid anterior
        ├─ Para cada producto:
        │  ├─ Crear tarjeta HTML
        │  ├─ Agregar imagen
        │  ├─ Agregar precio
        │  └─ Agregar botón compra
        │
        ▼
Productos mostrados en página
```

---

## 🔒 Security Layers

```
Frontend Validation
    │ (input type, required, pattern)
    │
    ▼
HTTPS/CORS
    │ (Browser enforces cross-origin)
    │
    ▼
Backend Validation
    │ (Serializer validators)
    │
    ▼
Database Validation
    │ (NOT NULL, UNIQUE, FK constraints)
    │
    ▼
Authentication Check
    │ (Token validation)
    │
    ▼
Authorization Check
    │ (Permission classes)
    │
    ▼
Business Logic
    │ (Model methods, custom validation)
    │
    ▼
Response Sanitization
    │ (No sensitive data leaked)
    │
    ▼
HTTPS Encryption
    │ (In production)
    │
    ▼
Client Receives Safe Data
```

---

## 📊 Componentes del Sistema

| Componente | Tecnología | Versión | Función |
|-----------|-----------|---------|----------|
| **Backend Framework** | Django | 4.2.7 | Server REST API |
| **API Framework** | Django REST | 3.14.0 | Serialization |
| **Database** | MySQL | 8.0+ | Data Storage |
| **Frontend Runtime** | Vanilla JS | ES6+ | Client Logic |
| **UI Framework** | Bootstrap | 5.3.0 | Components |
| **Python** | Python | 3.8.10 | Runtime |
| **Auth** | Token Auth | DRF | Session Management |
| **CORS** | django-cors | 4.3.1 | Cross-origin |
| **Image Handling** | Pillow | 10.1.0 | Media Files |
| **Env Config** | python-decouple | 3.8 | Settings |
| **Documentation** | DRF Docs | 3.14.0 | API Docs |

---

## 🎯 Flujo Completo de Uso

```
1. INICIO
   usuario → http://localhost:8080

2. FRONTEND
   index.html carga
   → main.js se ejecuta
   → verificarSesion() (consulta localStorage)
   → cargarProductos() (GET /api/productos/)

3. CARRUSEL
   usuario ve carousel de 3 slides
   → puede navegar manualmente

4. CATÁLOGO
   usuario → click "CATÁLOGO"
   → redirect a catalog.html
   → catalog.js se ejecuta
   → cargarProductos() con datos demo

5. FILTROS
   usuario → selecciona filtros
   → aplicarFiltros() se dispara
   → productos se filtran en tiempo real

6. AGREGAR CARRITO
   usuario → "Añadir al Carrito"
   → agregarAlCarrito(id, nombre, precio)
   → carritoItems[]++ 
   → localStorage.setItem('ecofort_carrito')
   → badge muestra cantidad

7. LOGIN
   usuario → click 👤
   → loginModal abre
   → ingresa email/password
   → click "Iniciar Sesión"
   → POST /api/autenticacion/login/
   → token guardado en localStorage
   → UI actualiza mostrar username

8. BACKEND
   Django recibe request
   → Serializers validan datos
   → Models aplican lógica
   → Database guarda/recupera
   → Response JSON retorna

9. SINCRONIZACIÓN
   Estado actualizado en localStorage
   UI re-renderiza
   Usuario ve cambios
```

---

Arquitectura diseñada para:
✅ **Escalabilidad** - Microservicios listos
✅ **Mantenibilidad** - Código modular
✅ **Seguridad** - Múltiples capas
✅ **Performance** - Caché y optimización
✅ **Usabilidad** - UX intuitivo

---

**Documento Generado:** 3 de Febrero, 2025
**Versión:** 2.0 - Arquitectura Completa
