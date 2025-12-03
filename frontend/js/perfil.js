// perfil.js - Gestión del perfil de usuario

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacionPerfil();
    
    // Event listener para el formulario
    const perfilForm = document.getElementById('perfilForm');
    if (perfilForm) {
        perfilForm.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarCambiosPerfil();
        });
    }
});

// Verificar si el usuario está autenticado
function verificarAutenticacionPerfil() {
    const token = localStorage.getItem('ecofort_token');
    const usuario = localStorage.getItem('ecofort_usuario');
    
    if (!token || !usuario) {
        // No está autenticado, redirigir al inicio
        mostrarNotificacion('Debes iniciar sesión para ver tu perfil', 'warning');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return;
    }
    
    // Cargar datos del perfil
    cargarDatosPerfil();
}

// Cargar datos del perfil desde el servidor
async function cargarDatosPerfil() {
    const token = localStorage.getItem('ecofort_token');
    const loadingDiv = document.getElementById('loadingPerfil');
    const contentDiv = document.getElementById('perfilContent');
    
    try {
        const response = await fetch(`${API_BASE_URL}/autenticacion/perfil/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar el perfil');
        }
        
        const data = await response.json();
        
        if (data.success) {
            mostrarDatosPerfil(data.usuario);
        } else {
            throw new Error('Error al obtener datos del perfil');
        }
    } catch (error) {
        console.error('Error al cargar perfil:', error);
        mostrarNotificacion('Error al cargar tu perfil', 'error');
        
        // Si falla, intentar usar datos del localStorage
        const usuarioLocal = localStorage.getItem('ecofort_usuario');
        if (usuarioLocal) {
            const usuario = JSON.parse(usuarioLocal);
            mostrarDatosPerfil(usuario);
        } else {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    } finally {
        loadingDiv.style.display = 'none';
        contentDiv.style.display = 'block';
    }
}

// Mostrar datos del perfil en el formulario
function mostrarDatosPerfil(usuario) {
    // Header del perfil
    const initials = getInitials(usuario.first_name, usuario.last_name, usuario.username);
    document.getElementById('avatarInitials').textContent = initials;
    document.getElementById('perfilUsername').textContent = usuario.username;
    document.getElementById('perfilEmailDisplay').textContent = usuario.email;
    
    // Datos del formulario
    document.getElementById('firstName').value = usuario.first_name || '';
    document.getElementById('lastName').value = usuario.last_name || '';
    document.getElementById('email').value = usuario.email || '';
    document.getElementById('username').value = usuario.username || '';
    
    // Datos del perfil (si existen)
    if (usuario.perfil) {
        document.getElementById('telefono').value = usuario.perfil.telefono || '';
        document.getElementById('direccion').value = usuario.perfil.direccion || '';
        document.getElementById('ciudad').value = usuario.perfil.ciudad || '';
        
        // Fecha de registro
        if (usuario.perfil.fecha_registro) {
            const fecha = new Date(usuario.perfil.fecha_registro);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('fechaRegistro').textContent = fechaFormateada;
        }
    }
}

// Obtener iniciales para el avatar
function getInitials(firstName, lastName, username) {
    if (firstName && lastName) {
        return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    } else if (firstName) {
        return firstName.charAt(0).toUpperCase();
    } else if (username) {
        return username.charAt(0).toUpperCase();
    }
    return 'U';
}

// Guardar cambios del perfil
async function guardarCambiosPerfil() {
    const token = localStorage.getItem('ecofort_token');
    
    // Obtener datos del formulario
    const datosActualizados = {
        first_name: document.getElementById('firstName').value.trim(),
        last_name: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        ciudad: document.getElementById('ciudad').value.trim()
    };
    
    // Validaciones básicas
    if (!datosActualizados.first_name) {
        mostrarNotificacion('El nombre es obligatorio', 'warning');
        return;
    }
    
    if (!datosActualizados.last_name) {
        mostrarNotificacion('El apellido es obligatorio', 'warning');
        return;
    }
    
    if (!datosActualizados.email) {
        mostrarNotificacion('El email es obligatorio', 'warning');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datosActualizados.email)) {
        mostrarNotificacion('Por favor ingresa un email válido', 'warning');
        return;
    }
    
    // Deshabilitar botón mientras se procesa
    const btnGuardar = document.querySelector('.btn-guardar');
    const textoOriginal = btnGuardar.innerHTML;
    btnGuardar.disabled = true;
    btnGuardar.innerHTML = '⏳ Guardando...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/autenticacion/perfil/actualizar/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(datosActualizados)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Actualizar localStorage con los nuevos datos
            localStorage.setItem('ecofort_usuario', JSON.stringify(data.usuario));
            
            // Actualizar la UI
            mostrarDatosPerfil(data.usuario);
            
            // Notificación de éxito
            mostrarNotificacion('✅ ' + data.mensaje, 'success');
            
            // Actualizar el nombre en el header si está visible
            if (typeof actualizarUILogueado === 'function') {
                actualizarUILogueado();
            }
        } else {
            // Mostrar errores del servidor
            let mensajeError = 'Error al actualizar el perfil';
            if (data.errores) {
                const errores = Object.values(data.errores).flat();
                mensajeError = errores.join(', ');
            }
            mostrarNotificacion(mensajeError, 'error');
        }
    } catch (error) {
        console.error('Error al guardar cambios:', error);
        mostrarNotificacion('Error de conexión. Intenta de nuevo', 'error');
    } finally {
        // Rehabilitar botón
        btnGuardar.disabled = false;
        btnGuardar.innerHTML = textoOriginal;
    }
}

// Cerrar sesión desde el perfil
async function cerrarSesionPerfil() {
    // Confirmar antes de cerrar sesión
    if (!confirm('¿Estás seguro que deseas cerrar sesión?')) {
        return;
    }
    
    const token = localStorage.getItem('ecofort_token');
    const apiUrl = typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'http://localhost:8000/api';
    
    try {
        // Llamar al endpoint de logout si hay token
        if (token) {
            await fetch(`${apiUrl}/autenticacion/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            console.log('✅ Sesión cerrada en el servidor');
        }
    } catch (error) {
        console.error('⚠️ Error al cerrar sesión en el servidor:', error);
        // Continuar de todas formas con el cierre de sesión local
    }
    
    // Limpiar localStorage SIEMPRE
    localStorage.removeItem('ecofort_token');
    localStorage.removeItem('ecofort_usuario');
    console.log('🗑️ LocalStorage limpiado');
    
    // Mostrar notificación
    if (typeof mostrarNotificacion === 'function') {
        mostrarNotificacion('Sesión cerrada correctamente', 'success');
    }
    
    // Redirigir INMEDIATAMENTE (no esperar)
    console.log('🔄 Redirigiendo a index.html...');
    window.location.href = 'index.html';
}

// Función de notificación (reutilizar de main.js si existe, sino crear una básica)
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Si existe la función en main.js, usarla
    if (typeof window.mostrarNotificacion === 'function') {
        window.mostrarNotificacion(mensaje, tipo);
        return;
    }
    
    // Crear una notificación básica
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Colores según tipo
    const colores = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notif.style.background = colores[tipo] || colores.info;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación
if (!document.getElementById('notif-styles')) {
    const style = document.createElement('style');
    style.id = 'notif-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

