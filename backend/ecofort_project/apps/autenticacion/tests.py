from django.test import TestCase
from django.contrib.auth.models import User
from .models import PerfilCliente

class PerfilClienteTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_perfil_creation(self):
        perfil = PerfilCliente.objects.create(
            usuario=self.user,
            telefono='+56912345678',
            ciudad='Talcahuano'
        )
        self.assertEqual(perfil.usuario, self.user)
        self.assertEqual(perfil.telefono, '+56912345678')
