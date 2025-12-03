from django.db import models
from django.core.validators import EmailValidator

class Cliente(models.Model):
    """
    Modelo de Cliente
    Almacena información de clientes B2B y B2C
    """
    TIPO_CLIENTE_CHOICES = [
        ('empresa', 'Empresa'),
        ('particular', 'Particular'),
        ('distribuidor', 'Distribuidor'),
    ]

    nombre = models.CharField(
        max_length=255,
        help_text="Nombre o razón social del cliente"
    )
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        help_text="Email del cliente"
    )
    telefono = models.CharField(
        max_length=20,
        blank=True,
        help_text="Teléfono de contacto"
    )
    tipo_cliente = models.CharField(
        max_length=20,
        choices=TIPO_CLIENTE_CHOICES,
        default='particular',
        help_text="Tipo de cliente"
    )
    rut = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        unique=True,
        help_text="RUT del cliente"
    )
    razon_social = models.CharField(
        max_length=255,
        blank=True,
        help_text="Razón social para empresas"
    )
    direccion = models.TextField(
        blank=True,
        help_text="Dirección del cliente"
    )
    ciudad = models.CharField(
        max_length=100,
        blank=True,
        help_text="Ciudad"
    )
    region = models.CharField(
        max_length=100,
        blank=True,
        help_text="Región"
    )
    codigo_postal = models.CharField(
        max_length=20,
        blank=True,
        help_text="Código postal"
    )
    compra_minima = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Monto mínimo de compra en CLP"
    )
    es_activo = models.BooleanField(
        default=True,
        help_text="Cliente activo"
    )
    notas = models.TextField(
        blank=True,
        help_text="Notas internas sobre el cliente"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
        db_table = 'clientes'
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['tipo_cliente']),
        ]

    def __str__(self):
        return self.nombre
