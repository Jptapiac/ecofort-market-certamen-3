from django.test import TestCase
from .models import Cliente

class ClienteModelTest(TestCase):
    """Tests para el modelo Cliente"""
    
    def setUp(self):
        self.cliente = Cliente.objects.create(
            nombre='Empresa Test',
            email='empresa@test.com',
            tipo_cliente='empresa'
        )

    def test_cliente_creacion(self):
        """Test que el cliente se crea correctamente"""
        self.assertEqual(self.cliente.nombre, 'Empresa Test')
        self.assertTrue(self.cliente.es_activo)
