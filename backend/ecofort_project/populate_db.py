import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecofort_project.settings')
django.setup()

from apps.categorias.models import Categoria
from apps.productos.models import Producto
from django.contrib.auth.models import User

# Crear usuario admin si no existe
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(username='admin', email='admin@ecofort.cl', password='admin2025')
    print("✅ Superusuario admin creado")

# Crear categorías si no existen
papeles, _ = Categoria.objects.get_or_create(nombre="Papeles", defaults={"descripcion": "Productos de papel"})
personal, _ = Categoria.objects.get_or_create(nombre="Personal Care", defaults={"descripcion": "Productos de cuidado personal"})
limpieza, _ = Categoria.objects.get_or_create(nombre="Limpieza", defaults={"descripcion": "Productos de limpieza"})
dispensadores, _ = Categoria.objects.get_or_create(nombre="Dispensadores", defaults={"descripcion": "Dispensadores automáticos"})
print("✅ Categorías creadas")

# Crear productos si no existen
productos = [
    ("Papel Higiénico Elite Premium", papeles, 5990, 4990),
    ("Desinfectante Profesional", limpieza, 8990, None),
    ("Jabón Líquido Espuma", personal, 6990, 5990),
    ("Toallero Dispensador", dispensadores, 35000, 29990),
    ("Limpiador de Pisos", limpieza, 7990, None),
    ("Guantes de Nitrilo", personal, 12990, 9990),
    ("Bolsas de Basura", limpieza, 4990, 3990),
    ("Servilletas de Papel", papeles, 3990, None),
]

for nombre, categoria, precio, descuento in productos:
    Producto.objects.get_or_create(
        nombre=nombre,
        defaults={
            "categoria": categoria,
            "precio": precio,
            "precio_descuento": descuento
        }
    )

print("✅ Productos cargados")
print("\n🎉 Base de datos lista para usar!")
print("   Admin: admin / admin2025")
