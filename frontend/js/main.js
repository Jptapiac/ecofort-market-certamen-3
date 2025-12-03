/**
 * Ecofort Market - Main JavaScript
 * Lógica frontend, consumo de API y funcionalidades interactivas
 */

const API_BASE_URL = 'http://localhost:8000/api';
let productosGlobal = [];
let carritoItems = [];

// ====== INICIALIZACIÓN ======

document.addEventListener('DOMContentLoaded', () => {
    // Solo cargar productos si NO estamos en la página de catálogo
    // (catalogo.js maneja los productos en esa página)
    const esPaginaCatalogo = window.location.pathname.includes('catalogo.html');
    if (!esPaginaCatalogo) {
        cargarProductos();
    }
    
    cargarCarrito();
    actualizarContadorCarrito();
    
    // Renderizar carrito cuando se abre el modal
    const carritoModal = document.getElementById('carritoModal');
    if (carritoModal) {
        carritoModal.addEventListener('show.bs.modal', () => {
            renderizarCarrito();
        });
    }
    
    // Verificar si hay que abrir el modal de registro
    if (sessionStorage.getItem('abrirRegistro') === 'true') {
        sessionStorage.removeItem('abrirRegistro');
        setTimeout(() => {
            const registroModal = new bootstrap.Modal(document.getElementById('registroModal'));
            registroModal.show();
        }, 500);
    }
});

// ====== FUNCIONES DE NAVEGACIÓN ======

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ====== CARGA DE PRODUCTOS ======

async function cargarProductos() {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/`);
        if (!response.ok) {
            console.error('Error al cargar productos:', response.status);
            mostrarProductosDemo();
            return;
        }
        
        const data = await response.json();
        productosGlobal = data.results || data || [];
        
        if (productosGlobal.length === 0) {
            mostrarProductosDemo();
        } else {
            renderizarProductos(productosGlobal);
        }
    } catch (error) {
        console.warn('API no disponible, usando datos de demostración:', error);
        mostrarProductosDemo();
    }
}

function mostrarProductosDemo() {
    const productosDemo = [
        {
            id: 1,
            nombre: 'Papel Higiénico Elite Professional',
            categoria: 'Papeles',
            precio: 5990,
            precio_descuento: 4990,
            descripcion: 'Papel higiénico de alta calidad, suave y resistente',
            imagen: 'https://via.placeholder.com/300x300?text=Papel+Higienico',
            tiene_descuento: true,
            porcentaje_descuento: 17,
            calificacion: 4.5
        },
        {
            id: 2,
            nombre: 'Dispensador Automático',
            categoria: 'Dispensadores',
            precio: 29990,
            descripcion: 'Dispensador automático de jabón sin contacto',
            imagen: 'https://via.placeholder.com/300x300?text=Dispensador',
            tiene_descuento: false,
            porcentaje_descuento: 0,
            calificacion: 4.8
        },
        {
            id: 3,
            nombre: 'Desinfectante Multiusos',
            categoria: 'Limpieza',
            precio: 3990,
            descripcion: 'Desinfectante potente para todas las superficies',
            imagen: 'https://via.placeholder.com/300x300?text=Desinfectante',
            tiene_descuento: true,
            precio_descuento: 2990,
            porcentaje_descuento: 25,
            calificacion: 4.3
        },
        {
            id: 4,
            nombre: 'Jabón Antibacterial 500ml',
            categoria: 'Personal Care',
            precio: 2990,
            descripcion: 'Jabón líquido antibacterial de uso frecuente',
            imagen: 'https://via.placeholder.com/300x300?text=Jabon',
            tiene_descuento: false,
            porcentaje_descuento: 0,
            calificacion: 4.6
        },
        {
            id: 5,
            nombre: 'Servilletas Premium',
            categoria: 'Papeles',
            precio: 1990,
            precio_descuento: 1490,
            descripcion: 'Servilletas de papel premium, suaves y absorbentes',
            imagen: 'https://via.placeholder.com/300x300?text=Servilletas',
            tiene_descuento: true,
            porcentaje_descuento: 25,
            calificacion: 4.2
        },
        {
            id: 6,
            nombre: 'Toallas de Papel',
            categoria: 'Papeles',
            precio: 4990,
            descripcion: 'Toallas de papel resistentes y absorbentes',
            imagen: 'https://via.placeholder.com/300x300?text=Toallas',
            tiene_descuento: false,
            porcentaje_descuento: 0,
            calificacion: 4.7
        }
    ];
    
    productosGlobal = productosDemo;
    renderizarProductos(productosDemo);
}

function renderizarProductos(productos) {
    const grid = document.getElementById('productosGrid');
    if (!grid) return;
    
    if (productos.length === 0) {
        grid.innerHTML = `
            <div class="card" style="text-align: center; padding: 40px; color: #999; grid-column: 1 / -1;">
                No se encontraron productos
            </div>
        `;
        return;
    }
    
    grid.innerHTML = productos.slice(0, 8).map(producto => `
        <div class="producto-card">
            <div style="position: relative; overflow: hidden;">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-image">
                ${producto.es_nuevo ? '<div class="producto-badge" style="background-color: #4caf50; color: white;">NUEVO</div>' : ''}
            </div>
            <div class="producto-info">
                <div class="producto-categoria">${producto.categoria}</div>
                <div class="producto-nombre">${producto.nombre}</div>
                <div class="producto-descripcion">${producto.descripcion}</div>
                <div class="producto-precio">
                    $${producto.precio.toLocaleString('es-CL')}
                </div>
                <div class="producto-rating">
                    ${'⭐'.repeat(Math.round(producto.calificacion || 4))}
                    ${producto.numero_resenas ? `(${producto.numero_resenas} reseñas)` : ''}
                </div>
                <div class="producto-acciones">
                    <button class="producto-comprar" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">
                        Comprar
                    </button>
                    <button class="producto-info-btn" onclick="verDetalles(${producto.id})">
                        Info
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// ====== FILTRADO DE PRODUCTOS ======

function filtrarProductos() {
    const categoria = document.getElementById('filterCategoria')?.value || '';
    const precio = parseInt(document.getElementById('filterPrecio')?.value || 100000);
    
    // Actualizar display de precio
    const precioDisplay = document.getElementById('precioDisplay');
    if (precioDisplay) {
        precioDisplay.textContent = `Hasta: $${precio.toLocaleString('es-CL')}`;
    }
    
    let filtered = productosGlobal;
    
    if (categoria) {
        filtered = filtered.filter(p => p.categoria.toLowerCase().includes(categoria.toLowerCase()));
    }
    
    filtered = filtered.filter(p => {
        const precioActual = p.precio_descuento || p.precio;
        return precioActual <= precio;
    });
    
    renderizarProductos(filtered);
}

function buscarProductos() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    if (!searchTerm) {
        renderizarProductos(productosGlobal);
        return;
    }
    
    const filtered = productosGlobal.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm) ||
        p.descripcion.toLowerCase().includes(searchTerm) ||
        p.categoria.toLowerCase().includes(searchTerm)
    );
    
    renderizarProductos(filtered);
}

// ====== CARRITO DE COMPRAS ======

function agregarAlCarrito(id, nombre, precio) {
    const item = {
        id,
        nombre,
        precio,
        cantidad: 1,
        timestamp: new Date().getTime()
    };
    
    // Verificar si ya existe en el carrito
    const existente = carritoItems.find(i => i.id === id);
    if (existente) {
        existente.cantidad++;
    } else {
        carritoItems.push(item);
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(`${nombre} agregado al carrito`, 'success');
}

function guardarCarrito() {
    localStorage.setItem('carritoEcofort', JSON.stringify(carritoItems));
}

function cargarCarrito() {
    const saved = localStorage.getItem('carritoEcofort');
    carritoItems = saved ? JSON.parse(saved) : [];
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-count');
    if (contador) {
        const total = carritoItems.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
    renderizarCarrito();
}

function renderizarCarrito() {
    const carritoContent = document.getElementById('carritoContent');
    if (!carritoContent) return;
    
    if (carritoItems.length === 0) {
        carritoContent.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #999;">
                <p style="font-size: 3rem;">🛒</p>
                <p>Tu carrito está vacío</p>
                <p><a href="#productos" data-bs-dismiss="modal">Ver productos</a></p>
            </div>
        `;
        return;
    }
    
    const total = carritoItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    carritoContent.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${carritoItems.map(item => `
                    <tr>
                        <td>${item.nombre}</td>
                        <td>$${item.precio.toLocaleString('es-CL')}</td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                                <span style="min-width: 30px; text-align: center;">${item.cantidad}</span>
                                <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                            </div>
                        </td>
                        <td>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">🗑️</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
                    <td colspan="2"><strong style="font-size: 1.2rem; color: var(--color-primary);">$${total.toLocaleString('es-CL')}</strong></td>
                </tr>
            </tfoot>
        </table>
    `;
}

function cambiarCantidad(id, cambio) {
    const item = carritoItems.find(i => i.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            guardarCarrito();
            actualizarContadorCarrito();
        }
    }
}

function eliminarDelCarrito(id) {
    carritoItems = carritoItems.filter(i => i.id !== id);
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion('Producto eliminado del carrito', 'info');
}

// ====== DETALLES DE PRODUCTO ======

function verDetalles(id) {
    const producto = productosGlobal.find(p => p.id === id);
    if (!producto) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div class="card" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="position: absolute; top: 10px; right: 10px; border: none; font-size: 24px; cursor: pointer;">
                ✕
            </button>
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
            <h2>${producto.nombre}</h2>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p style="margin-top: 20px;">
                <strong>Precio:</strong> <span style="font-size: 1.5rem; color: var(--color-primary); font-weight: bold;">
                    $${(producto.precio_descuento || producto.precio).toLocaleString('es-CL')}
                </span>
            </p>
            ${producto.especificaciones ? `<p><strong>Especificaciones:</strong> ${producto.especificaciones}</p>` : ''}
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio_descuento || producto.precio}); this.parentElement.parentElement.parentElement.remove()">
                    Agregar al Carrito
                </button>
                <button class="btn btn-outline" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ====== CONTACTO ======

async function enviarMensaje(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    
    const datos = {
        nombre,
        email,
        telefono,
        asunto,
        mensaje
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/contacto/mensajes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        
        if (response.ok) {
            mostrarNotificacion('Mensaje enviado exitosamente. Nos pondremos en contacto pronto.', 'success');
            event.target.reset();
        } else {
            mostrarNotificacion('Error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
        }
    } catch (error) {
        console.warn('API de contacto no disponible, guardando localmente:', error);
        guardarMensajeLocal(datos);
        mostrarNotificacion('Mensaje guardado. Nos pondremos en contacto pronto.', 'success');
        event.target.reset();
    }
}

function guardarMensajeLocal(datos) {
    const mensajes = JSON.parse(localStorage.getItem('mensajesLocales') || '[]');
    mensajes.push({ ...datos, timestamp: new Date().toISOString() });
    localStorage.setItem('mensajesLocales', JSON.stringify(mensajes));
}

async function suscribirse(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    mostrarNotificacion(`¡Gracias por suscribirse! Hemos enviado un email de confirmación a ${email}`, 'success');
    event.target.reset();
}

// ====== NOTIFICACIONES ======

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#0B3C2F' : tipo === 'error' ? '#dc3545' : '#0B3C2F'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(11, 60, 47, 0.3);
        z-index: 2000;
        animation: slideInUp 0.3s ease-out;
        max-width: 400px;
        font-weight: 500;
    `;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ====== UTILIDADES ======

// Animación de scroll suave ya está en CSS (scroll-behavior: smooth)

// Intersection Observer para animaciones al scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// Event listener para el input de búsqueda
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', () => {
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(buscarProductos, 300);
    });
}

// Mantener menú cerrado al hacer click en un enlace
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mainNav').classList.remove('active');
    });
});

console.log('✓ Ecofort Market - Frontend inicializado correctamente');

// ====== FUNCIONES AUXILIARES ======

function iniciarSesion() {
    realizarLogin();
}

function mostrarRegistro() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        bootstrap.Modal.getInstance(loginModal)?.hide();
    }
    const registroModal = new bootstrap.Modal(document.getElementById('registroModal'));
    registroModal.show();
}

function ocultarRegistro() {
    const registroModal = document.getElementById('registroModal');
    if (registroModal) {
        bootstrap.Modal.getInstance(registroModal)?.hide();
    }
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

function procederAlPago() {
    alert('Pasarela de pago próximamente disponible');
}

// ====== AUTENTICACIÓN ======

let usuarioActual = null;
let tokenActual = null;

// Verificar si hay sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
    
    // Event listeners para login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            realizarLogin();
        });
    }
    
    // Botón de submit del modal login
    const loginButtons = document.querySelectorAll('[data-bs-target="#loginModal"] + .modal-footer .btn-primary');
    loginButtons.forEach(btn => {
        if (btn && btn.textContent.includes('Iniciar Sesión')) {
            btn.addEventListener('click', realizarLogin);
        }
    });
});

function verificarSesion() {
    const token = localStorage.getItem('ecofort_token');
    const usuario = localStorage.getItem('ecofort_usuario');
    
    if (token && usuario) {
        tokenActual = token;
        usuarioActual = JSON.parse(usuario);
        actualizarUILogueado();
    }
}

async function realizarLogin() {
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    
    if (!email || !password) {
        mostrarNotificacion('Por favor completa email y contraseña', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/autenticacion/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Guardar en localStorage PRIMERO
            localStorage.setItem('ecofort_token', data.token);
            localStorage.setItem('ecofort_usuario', JSON.stringify(data.usuario));
            
            // Actualizar variables globales
            tokenActual = data.token;
            usuarioActual = data.usuario;
            
            // Actualizar UI
            actualizarUILogueado();
            
            // Cerrar modal
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                const modal = bootstrap.Modal.getInstance(loginModal);
                if (modal) modal.hide();
            }
            
            // Limpiar formulario
            const form = document.getElementById('loginForm');
            if (form) form.reset();
            
            mostrarNotificacion(`¡Bienvenido ${data.usuario.username}!`, 'success');
        } else {
            mostrarNotificacion(data.errores?.non_field_errors?.[0] || 'Email o contraseña incorrectos', 'error');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        mostrarNotificacion('Error de conexión al servidor', 'error');
    }
}

async function realizarRegistro(email, username, password, passwordConfirm, nombre = '', apellido = '') {
    try {
        const response = await fetch(`${API_BASE_URL}/autenticacion/registro/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                password_confirm: passwordConfirm,
                first_name: nombre,
                last_name: apellido
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            tokenActual = data.token;
            usuarioActual = data.usuario;
            
            localStorage.setItem('ecofort_token', tokenActual);
            localStorage.setItem('ecofort_usuario', JSON.stringify(usuarioActual));
            
            actualizarUILogueado();
            mostrarNotificacion(data.mensaje, 'success');
            return true;
        } else {
            mostrarNotificacion(data.errores?.email?.[0] || data.errores?.username?.[0] || 'Error al registrarse', 'error');
            return false;
        }
    } catch (error) {
        console.error('Error al registrarse:', error);
        mostrarNotificacion('Error de conexión al servidor', 'error');
        return false;
    }
}

async function crearCuenta() {
    const email = document.getElementById('regEmail')?.value;
    const username = document.getElementById('regUsername')?.value;
    const password = document.getElementById('regPassword')?.value;
    const passwordConfirm = document.getElementById('regPasswordConfirm')?.value;
    const nombre = document.getElementById('regNombre')?.value || '';
    const apellido = document.getElementById('regApellido')?.value || '';
    
    if (!email || !username || !password || !passwordConfirm) {
        mostrarNotificacion('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        mostrarNotificacion('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (password.length < 6) {
        mostrarNotificacion('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/autenticacion/registro/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                password_confirm: passwordConfirm,
                first_name: nombre,
                last_name: apellido
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Guardar en localStorage
            localStorage.setItem('ecofort_token', data.token);
            localStorage.setItem('ecofort_usuario', JSON.stringify(data.usuario));
            
            // Actualizar variables globales
            tokenActual = data.token;
            usuarioActual = data.usuario;
            
            // Actualizar UI
            actualizarUILogueado();
            
            // Cerrar modal de registro
            const registroModal = document.getElementById('registroModal');
            if (registroModal) {
                const modal = bootstrap.Modal.getInstance(registroModal);
                if (modal) modal.hide();
            }
            
            // Limpiar formulario
            const form = document.getElementById('registroForm');
            if (form) form.reset();
            
            mostrarNotificacion(`¡Bienvenido ${data.usuario.username}! Cuenta creada exitosamente.`, 'success');
        } else {
            const errorMsg = data.errores?.email?.[0] || data.errores?.username?.[0] || data.errores?.password?.[0] || 'Error al registrarse';
            mostrarNotificacion(errorMsg, 'error');
        }
    } catch (error) {
        console.error('Error al registrarse:', error);
        mostrarNotificacion('Error de conexión al servidor', 'error');
    }
}

function actualizarUILogueado() {
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userLoginBtn = document.getElementById('userLoginBtn');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    
    if (usuarioActual && tokenActual) {
        // Usuario logueado - mostrar dropdown menu
        if (userNameDisplay) {
            userNameDisplay.innerHTML = usuarioActual.username || 'Usuario';
        }
        if (userLoginBtn) {
            // Cambiar a dropdown
            userLoginBtn.removeAttribute('data-bs-toggle');
            userLoginBtn.removeAttribute('data-bs-target');
            userLoginBtn.setAttribute('data-bs-toggle', 'dropdown');
            userLoginBtn.setAttribute('aria-expanded', 'false');
            userLoginBtn.onclick = null;
            userLoginBtn.title = 'Mi cuenta';
            userLoginBtn.classList.remove('btn-outline-primary');
            userLoginBtn.classList.add('btn-success');
            userLoginBtn.style.cursor = 'pointer';
        }
        // Remover display:none del menú para que Bootstrap pueda manejarlo
        if (userDropdownMenu) {
            userDropdownMenu.style.removeProperty('display');
        }
    } else {
        // Usuario no logueado
        if (userNameDisplay) {
            userNameDisplay.innerHTML = 'Iniciar Sesión';
        }
        if (userLoginBtn) {
            userLoginBtn.removeAttribute('data-bs-toggle');
            userLoginBtn.removeAttribute('aria-expanded');
            userLoginBtn.setAttribute('data-bs-toggle', 'modal');
            userLoginBtn.setAttribute('data-bs-target', '#loginModal');
            userLoginBtn.onclick = null;
            userLoginBtn.title = 'Iniciar Sesión';
            userLoginBtn.classList.remove('btn-success');
            userLoginBtn.classList.add('btn-outline-primary');
        }
        // Bootstrap maneja automáticamente la visibilidad del dropdown
        if (userDropdownMenu) {
            userDropdownMenu.style.removeProperty('display');
        }
    }
}

// Función para cerrar sesión desde el dropdown
async function cerrarSesionDropdown(event) {
    if (event) event.preventDefault();
    
    // Confirmar
    if (!confirm('¿Estás seguro que deseas cerrar sesión?')) {
        return;
    }
    
    try {
        if (tokenActual) {
            await fetch(`${API_BASE_URL}/autenticacion/logout/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${tokenActual}`,
                    'Content-Type': 'application/json',
                }
            });
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
    
    // Limpiar datos
    localStorage.removeItem('ecofort_token');
    localStorage.removeItem('ecofort_usuario');
    tokenActual = null;
    usuarioActual = null;
    
    // Redirigir a inicio INMEDIATAMENTE (sin esperar)
    window.location.replace('index.html');
}

function verPerfil() {
    mostrarNotificacion('Perfil de usuario próximamente disponible', 'info');
}

function verMisPedidos() {
    mostrarNotificacion('Historial de pedidos próximamente disponible', 'info');
}

async function cerrarSesion() {
    try {
        if (tokenActual) {
            await fetch(`${API_BASE_URL}/autenticacion/logout/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${tokenActual}`,
                    'Content-Type': 'application/json',
                }
            });
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
    
    // Limpiar datos
    localStorage.removeItem('ecofort_token');
    localStorage.removeItem('ecofort_usuario');
    tokenActual = null;
    usuarioActual = null;
    
    // Actualizar UI
    actualizarUILogueado();
    mostrarNotificacion('Sesión cerrada');
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notif = document.createElement('div');
    const bgColor = tipo === 'success' ? '#0B3C2F' : (tipo === 'error' ? '#dc3545' : '#0B3C2F');
    
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 15px rgba(11, 60, 47, 0.3);
        font-weight: 500;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}
