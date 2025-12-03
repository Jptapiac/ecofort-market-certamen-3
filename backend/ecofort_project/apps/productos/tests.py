from django.test import TestCase
from .models import Producto
from apps.categorias.models import Categoria

class ProductoModelTest(TestCase):
    """Tests para el modelo Producto"""
    
    def setUp(self):
        self.categoria = Categoria.objects.create(
            nombre='Papeles',
            descripcion='Productos de papel'
        )
        self.producto = Producto.objects.create(
            nombre='Papel Higiénico Elite',
            descripcion='Papel higiénico de alta calidad',
            categoria=self.categoria,
            precio=5990
        )

    def test_producto_creacion(self):
        """Test que el producto se crea correctamente"""
        self.assertEqual(self.producto.nombre, 'Papel Higiénico Elite')
        self.assertEqual(self.producto.precio, 5990)
