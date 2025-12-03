from django.test import TestCase
from .models import Categoria

class CategoriaModelTest(TestCase):
    """Tests para el modelo Categoria"""
    
    def setUp(self):
        self.categoria = Categoria.objects.create(
            nombre='Papeles',
            descripcion='Productos de papel para higiene'
        )

    def test_categoria_creacion(self):
        """Test que la categoría se crea correctamente"""
        self.assertEqual(self.categoria.nombre, 'Papeles')
        self.assertTrue(self.categoria.es_activo)

    def test_slug_autogenerado(self):
        """Test que el slug se genera automáticamente"""
        self.assertEqual(self.categoria.slug, 'papeles')
