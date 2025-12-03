from django.db import models
from django.contrib.auth.models import User

class PerfilCliente(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True)
    ciudad = models.CharField(max_length=100, blank=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Perfil de {self.usuario.username}"
    
    class Meta:
        verbose_name = "Perfil Cliente"
        verbose_name_plural = "Perfiles Clientes"
