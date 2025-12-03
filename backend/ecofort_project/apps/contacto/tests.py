from django.test import TestCase
from .models import MensajeContacto

class MensajeContactoModelTest(TestCase):
    """Tests para el modelo MensajeContacto"""
    
    def setUp(self):
        self.mensaje = MensajeContacto.objects.create(
            nombre='Juan García',
            email='juan@example.com',
            mensaje='Este es un mensaje de prueba para contacto'
        )

    def test_mensaje_creacion(self):
        """Test que el mensaje se crea correctamente"""
        self.assertEqual(self.mensaje.nombre, 'Juan García')
        self.assertFalse(self.mensaje.leido)
