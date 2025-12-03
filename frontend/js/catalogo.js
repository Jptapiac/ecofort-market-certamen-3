/**
 * Ecofor Market - Catálogo de Productos
 * Gestión de filtros, búsqueda y visualización de productos
 */

// Usar la URL de la API ya definida en main.js, o definir si no existe
if (typeof API_BASE_URL === 'undefined') {
    var API_BASE_URL = 'http://localhost:8000/api';
}
let productosCatalogo = [];
let productosFiltrados = [];

// Productos de demostración estilo Elite Professional
const productosDemo = [
    {
        id: 1,
        nombre: 'Toalla Interfoliada Doble Hoja 18 Pq x 200 Un Elite Professional',
        categoria: 'Papelería',
        subcategoria: 'Toallas de papel',
        departamento: 'papeleria',
        precio: 57990,
        precio_descuento: 31990,
        porcentaje_descuento: 45,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Toallas+Elite',
        precio_unidad: '$9 x unidad',
        tiene_descuento: true,
        es_mayorista: true,
        calificacion: 5
    },
    {
        id: 2,
        nombre: 'Papel Higiénico Rollo Doble Hoja 1 Pq x 6 Un x 250 Mts Elite Professional',
        categoria: 'Papelería',
        subcategoria: 'Papel Higiénico',
        departamento: 'papeleria',
        precio: 30990,
        precio_descuento: 19990,
        porcentaje_descuento: 35,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Papel+Higienico',
        precio_unidad: '$13 x metro',
        tiene_descuento: true,
        es_mayorista: false,
        calificacion: 4
    },
    {
        id: 3,
        nombre: 'Toalla Rollo Doble Hoja 1 Pq x 2 Un x 200 Mts Elite Professional',
        categoria: 'Papelería',
        subcategoria: 'Toallas de papel',
        departamento: 'papeleria',
        precio: 22990,
        precio_descuento: 15990,
        porcentaje_descuento: 30,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Toalla+Rollo',
        precio_unidad: '$40 x metro',
        tiene_descuento: true,
        es_mayorista: true,
        calificacion: 5
    },
    {
        id: 4,
        nombre: 'Papel Higiénico Rollo Doble Hoja 3 Pq x 16 Un x 20 Mts Elite Professional',
        categoria: 'Papelería',
        subcategoria: 'Papel Higiénico',
        departamento: 'papeleria',
        precio: 25990,
        precio_descuento: 15590,
        porcentaje_descuento: 40,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=PH+16+Rollos',
        precio_unidad: '$16 x metro',
        tiene_descuento: true,
        es_mayorista: false,
        calificacion: 4
    },
    {
        id: 5,
        nombre: 'Dispensador Automático de Jabón Sin Contacto',
        categoria: 'Dispensadores',
        subcategoria: 'Dispensador de jabones',
        departamento: 'dispensadores',
        precio: 45990,
        precio_descuento: 35990,
        porcentaje_descuento: 22,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Dispensador+Jabon',
        precio_unidad: null,
        tiene_descuento: true,
        es_mayorista: false,
        calificacion: 5
    },
    {
        id: 6,
        nombre: 'Dispensador de Papel Higiénico Jumbo',
        categoria: 'Dispensadores',
        subcategoria: 'Dispensador de papel higiénico',
        departamento: 'dispensadores',
        precio: 29990,
        precio_descuento: null,
        porcentaje_descuento: 0,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Dispensador+PH',
        precio_unidad: null,
        tiene_descuento: false,
        es_mayorista: false,
        calificacion: 4
    },
    {
        id: 7,
        nombre: 'Jabón Líquido Antibacterial 5 Litros',
        categoria: 'Cuidado Personal',
        subcategoria: 'Jabones Líquidos',
        departamento: 'cuidado-personal',
        precio: 15990,
        precio_descuento: 12990,
        porcentaje_descuento: 19,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Jabon+5L',
        precio_unidad: '$2.598 x litro',
        tiene_descuento: true,
        es_mayorista: true,
        calificacion: 5
    },
    {
        id: 8,
        nombre: 'Desinfectante Multiusos Concentrado 5L',
        categoria: 'Limpieza',
        subcategoria: 'Desinfectantes',
        departamento: 'limpieza',
        precio: 18990,
        precio_descuento: 14990,
        porcentaje_descuento: 21,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Desinfectante',
        precio_unidad: '$2.998 x litro',
        tiene_descuento: true,
        es_mayorista: true,
        calificacion: 4
    },
    {
        id: 9,
        nombre: 'Servilletas Premium Dobladas x 500 Un',
        categoria: 'Papelería',
        subcategoria: 'Servilletas',
        departamento: 'papeleria',
        precio: 8990,
        precio_descuento: 6990,
        porcentaje_descuento: 22,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Servilletas',
        precio_unidad: '$14 x unidad',
        tiene_descuento: true,
        es_mayorista: false,
        calificacion: 4
    },
    {
        id: 10,
        nombre: 'Guantes de Nitrilo Caja x 100 Unidades',
        categoria: 'EPP',
        subcategoria: 'Guantes',
        departamento: 'epp',
        precio: 12990,
        precio_descuento: 9990,
        porcentaje_descuento: 23,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Guantes+Nitrilo',
        precio_unidad: '$100 x unidad',
        tiene_descuento: true,
        es_mayorista: true,
        calificacion: 5
    },
    {
        id: 11,
        nombre: 'Mascarilla KN95 Caja x 50 Unidades',
        categoria: 'EPP',
        subcategoria: 'Mascarillas',
        departamento: 'epp',
        precio: 24990,
        precio_descuento: 18990,
        porcentaje_descuento: 24,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Mascarillas+KN95',
        precio_unidad: '$380 x unidad',
        tiene_descuento: true,
        es_mayorista: false,
        calificacion: 5
    },
    {
        id: 12,
        nombre: 'Cloro Concentrado 10L Industrial',
        categoria: 'Limpieza',
        subcategoria: 'Productos Químicos',
        departamento: 'quimicos',
        precio: 14990,
        precio_descuento: null,
        porcentaje_descuento: 0,
        imagen: 'https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Cloro+10L',
        precio_unidad: '$1.499 x litro',
        tiene_descuento: false,
        es_mayorista: true,
        calificacion: 4
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando catálogo...');
    
    // Cargar productos demo INMEDIATAMENTE para que se vea algo
    productosCatalogo = productosDemo;
    productosFiltrados = [...productosCatalogo];
    renderizarProductosCatalogo();
    console.log('✅ Productos demo cargados inmediatamente');
    
    // Luego intentar cargar desde la API (reemplazará los demos si tiene éxito)
    cargarProductosCatalogo();
    
    // Leer filtros desde sessionStorage
    const filtroProducto = sessionStorage.getItem('filtroProducto');
    const filtroCategoria = sessionStorage.getItem('filtroCategoria');
    
    // Aplicar filtro después de cargar productos
    setTimeout(() => {
        if (filtroProducto) {
            filtrarPorSubcategoria(filtroProducto);
            actualizarTituloCatalogo(filtroProducto);
            // Limpiar el filtro después de aplicarlo
            sessionStorage.removeItem('filtroProducto');
        } else if (filtroCategoria) {
            filtrarPorCategoria(filtroCategoria);
            actualizarTituloCatalogo(filtroCategoria);
            // Limpiar el filtro después de aplicarlo
            sessionStorage.removeItem('filtroCategoria');
        }
    }, 500);
});

function filtrarPorSubcategoria(sub) {
    const mapeoSubcategorias = {
        'toallas': 'toallas',
        'panales': 'pañales',
        'sabanillas': 'sabanillas',
        'servilletas': 'servilletas',
        'higienicos': 'higiénico',
        'dispensadores': 'dispensador',
        'panuelos': 'pañuelos',
        'bobinas': 'bobinas',
        'palas': 'palas',
        'guantes': 'guantes',
        'escobillas': 'escobillas',
        'mascarillas': 'mascarillas',
        'escobillones': 'escobillones',
        'mopas': 'mopas',
        'bolsas-basura': 'bolsas basura',
        'pulverizadores': 'pulverizadores',
        'panos': 'paños',
        'basureros': 'basureros',
        'jabones': 'jabón',
        'lavalozas': 'lavalozas',
        'detergente': 'detergente',
        'insecticidas': 'insecticidas',
        'desodorantes': 'desodorantes',
        'desinfectantes': 'desinfectante',
        'desengrasantes': 'desengrasantes',
        'ceras': 'ceras',
        'limpiadores': 'limpiador',
        'vasos': 'vasos',
        'cubiertos': 'cubiertos',
        'bolsas-papel': 'bolsas papel',
        'envases': 'envases'
    };
    
    const termino = mapeoSubcategorias[sub] || sub;
    productosFiltrados = productosCatalogo.filter(p => 
        p.nombre.toLowerCase().includes(termino) ||
        p.subcategoria?.toLowerCase().includes(termino) ||
        p.categoria?.toLowerCase().includes(termino)
    );
    
    if (productosFiltrados.length === 0) {
        productosFiltrados = productosCatalogo;
    }
    
    renderizarProductosCatalogo();
}

function filtrarPorCategoria(cat) {
    const mapeoCategorias = {
        'papeleria': 'papelería',
        'aseo': 'aseo',
        'quimicos': 'limpieza',
        'desechables': 'desechable'
    };
    
    const termino = mapeoCategorias[cat] || cat;
    productosFiltrados = productosCatalogo.filter(p => 
        p.departamento?.toLowerCase().includes(cat) ||
        p.categoria?.toLowerCase().includes(termino)
    );
    
    if (productosFiltrados.length === 0) {
        productosFiltrados = productosCatalogo;
    }
    
    renderizarProductosCatalogo();
}

function actualizarTituloCatalogo(filtro) {
    const breadcrumb = document.querySelector('.breadcrumb-item.active');
    if (breadcrumb) {
        const nombreFormateado = filtro.charAt(0).toUpperCase() + filtro.slice(1).replace(/-/g, ' ');
        breadcrumb.textContent = nombreFormateado;
    }
}

async function cargarProductosCatalogo() {
    console.log('🔄 Intentando cargar productos desde API:', `${API_BASE_URL}/productos/`);
    try {
        const response = await fetch(`${API_BASE_URL}/productos/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('📡 Respuesta de la API:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('📦 Datos recibidos de la API');
            
            if (data.results && data.results.length > 0) {
                productosCatalogo = data.results;
                productosFiltrados = [...productosCatalogo];
                renderizarProductosCatalogo();
                console.log(`✅ ${productosCatalogo.length} productos de la API cargados y mostrados`);
            } else if (data.length > 0) {
                productosCatalogo = data;
                productosFiltrados = [...productosCatalogo];
                renderizarProductosCatalogo();
                console.log(`✅ ${productosCatalogo.length} productos de la API cargados y mostrados`);
            } else {
                console.warn('⚠️ La API no tiene productos, manteniendo demos');
            }
        } else {
            console.warn('❌ Error en respuesta API (status:', response.status, '), manteniendo demos');
        }
    } catch (error) {
        console.error('❌ Error al conectar con la API:', error.message);
        console.warn('Manteniendo productos demo');
    }
}

function renderizarProductosCatalogo() {
    const grid = document.getElementById('productosGrid');
    const contador = document.getElementById('totalProductos');
    
    if (!grid) return;
    
    contador.textContent = productosFiltrados.length;
    
    if (productosFiltrados.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                <p style="font-size: 1.2rem; color: #666;">😕 No se encontraron productos con los filtros seleccionados</p>
                <button onclick="limpiarFiltros()" class="btn btn-primary" style="margin-top: 1rem;">Limpiar Filtros</button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = productosFiltrados.map(producto => {
        // Determinar imagen (usar placeholder si no hay imagen)
        const imagen = producto.imagen || `https://via.placeholder.com/300x300/f8f9fa/004b9e?text=${encodeURIComponent(producto.nombre.substring(0, 20))}`;
        
        // Determinar precio (puede venir como string o number)
        const precioNumerico = typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio;
        const precioDescuentoNumerico = producto.precio_descuento ? 
            (typeof producto.precio_descuento === 'string' ? parseFloat(producto.precio_descuento) : producto.precio_descuento) 
            : null;
        
        // Categoría (puede venir como objeto o string)
        const categoriaNombre = producto.categoria_nombre || producto.categoria || 'General';
        
        // Calificación
        const calificacion = Math.floor(producto.calificacion || 4);
        
        return `
            <div class="product-card">
                ${producto.tiene_descuento ? `<div class="product-badge">${producto.porcentaje_descuento}% OFF</div>` : ''}
                
                <div class="product-image">
                    <img src="${imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300x300/f8f9fa/004b9e?text=Producto'">
                </div>
                
                <div class="product-info">
                    <div class="product-category">${categoriaNombre}</div>
                    <div class="product-name">${producto.nombre}</div>
                    
                    <div class="product-rating">
                        ${'★'.repeat(calificacion)}${'☆'.repeat(5 - calificacion)} (${producto.numero_resenas || 0})
                    </div>
                    
                    <div class="product-prices">
                        ${precioDescuentoNumerico ? `<span class="price-original">$${precioNumerico.toLocaleString('es-CL')}</span>` : ''}
                        <span class="price-current">$${(precioDescuentoNumerico || precioNumerico).toLocaleString('es-CL')}</span>
                    </div>
                    
                    ${producto.precio_unidad ? `<div class="price-unit">${producto.precio_unidad}</div>` : ''}
                    
                    ${producto.es_mayorista ? `<div class="wholesale-badge">Precios al por mayor</div>` : ''}
                    ${producto.es_destacado ? `<div class="wholesale-badge" style="background: #fff3cd; color: #856404;">⭐ Destacado</div>` : ''}
                    
                    <div class="product-actions">
                        <div class="qty-selector">
                            <button class="qty-btn" onclick="cambiarCantidadCat(${producto.id}, -1)">−</button>
                            <input type="text" class="qty-input" id="qty-${producto.id}" value="1" readonly>
                            <button class="qty-btn" onclick="cambiarCantidadCat(${producto.id}, 1)">+</button>
                        </div>
                        <button class="btn-buy" onclick="agregarAlCarritoCat(${producto.id})">
                            🛒 Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function cambiarCantidadCat(id, cambio) {
    const input = document.getElementById(`qty-${id}`);
    if (input) {
        let valor = parseInt(input.value) + cambio;
        if (valor < 1) valor = 1;
        if (valor > 99) valor = 99;
        input.value = valor;
    }
}

function agregarAlCarritoCat(id) {
    const producto = productosCatalogo.find(p => p.id === id);
    const cantidad = parseInt(document.getElementById(`qty-${id}`)?.value || 1);
    
    if (producto) {
        // Usar precio con descuento si está disponible
        const precioFinal = producto.precio_descuento ? 
            (typeof producto.precio_descuento === 'string' ? parseFloat(producto.precio_descuento) : producto.precio_descuento) :
            (typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio);
        
        // Usar función del main.js si existe
        if (typeof agregarAlCarrito === 'function') {
            for (let i = 0; i < cantidad; i++) {
                agregarAlCarrito(id, producto.nombre, precioFinal);
            }
        } else {
            mostrarNotificacionCat(`${producto.nombre} agregado al carrito`, 'success');
        }
    }
}

function aplicarFiltros() {
    const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]:checked');
    const precioMax = parseInt(document.getElementById('precioRange')?.value || 100000);
    
    const filtrosSeleccionados = Array.from(checkboxes).map(cb => cb.value);
    
    productosFiltrados = productosCatalogo.filter(producto => {
        // Filtro de precio
        const precioProducto = producto.precio_descuento ? 
            (typeof producto.precio_descuento === 'string' ? parseFloat(producto.precio_descuento) : producto.precio_descuento) :
            (typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio);
            
        if (precioProducto > precioMax) return false;
        
        // Si no hay filtros seleccionados, mostrar todo
        if (filtrosSeleccionados.length === 0) return true;
        
        // Obtener nombre de categoría
        const categoriaNombre = producto.categoria_nombre || producto.categoria || '';
        const nombreProducto = producto.nombre || '';
        const descripcion = producto.descripcion || '';
        
        // Filtrar por departamento o categoría
        const matchFiltro = filtrosSeleccionados.some(f => 
            nombreProducto.toLowerCase().includes(f) ||
            categoriaNombre.toLowerCase().includes(f) ||
            descripcion.toLowerCase().includes(f) ||
            producto.slug?.toLowerCase().includes(f)
        );
        
        return matchFiltro;
    });
    
    renderizarProductosCatalogo();
}

function actualizarPrecio() {
    const precio = document.getElementById('precioRange').value;
    document.getElementById('precioMax').textContent = `$${parseInt(precio).toLocaleString('es-CL')}`;
    aplicarFiltros();
}

function limpiarFiltros() {
    // Desmarcar todos los checkboxes
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Resetear precio
    document.getElementById('precioRange').value = 70000;
    document.getElementById('precioMax').textContent = '$70.000';
    
    // Resetear ordenamiento
    document.getElementById('sortSelect').value = 'relevancia';
    
    // Mostrar todos los productos
    productosFiltrados = [...productosCatalogo];
    renderizarProductosCatalogo();
}

function ordenarProductos() {
    const orden = document.getElementById('sortSelect').value;
    
    switch(orden) {
        case 'precio-menor':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-mayor':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre-az':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre-za':
            productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'mas-vendidos':
            productosFiltrados.sort((a, b) => (b.calificacion || 0) - (a.calificacion || 0));
            break;
        default:
            // Relevancia - orden original
            productosFiltrados = productosCatalogo.filter(p => productosFiltrados.includes(p));
    }
    
    renderizarProductosCatalogo();
}

function buscarProductosCatalogo() {
    const termino = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    if (!termino) {
        productosFiltrados = [...productosCatalogo];
    } else {
        productosFiltrados = productosCatalogo.filter(p => 
            p.nombre.toLowerCase().includes(termino) ||
            p.categoria.toLowerCase().includes(termino) ||
            p.subcategoria?.toLowerCase().includes(termino)
        );
    }
    
    renderizarProductosCatalogo();
}

function mostrarNotificacionCat(mensaje, tipo = 'info') {
    const bgColor = tipo === 'success' ? '#0B3C2F' : tipo === 'error' ? '#dc3545' : '#0B3C2F';
    
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(11, 60, 47, 0.3);
        font-weight: 500;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => notif.remove(), 3000);
}

