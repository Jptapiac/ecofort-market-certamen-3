from django.db import models
from django.core.validators import EmailValidator

class MensajeContacto(models.Model):
    """
    Modelo para guardar mensajes de contacto desde el sitio web
    """
    ASUNTO_CHOICES = [
        ('consulta', 'Consulta General'),
        ('compra', 'Información de Compra'),
        ('distribuidor', 'Quiero ser Distribuidor'),
        ('reclamo', 'Reclamo'),
        ('otro', 'Otro'),
    ]

    nombre = models.CharField(
        max_length=255,
        help_text="Nombre del remitente"
    )
    email = models.EmailField(
        validators=[EmailValidator()],
        help_text="Email de contacto"
    )
    telefono = models.CharField(
        max_length=20,
        blank=True,
        help_text="Teléfono de contacto"
    )
    empresa = models.CharField(
        max_length=255,
        blank=True,
        help_text="Nombre de la empresa (opcional)"
    )
    asunto = models.CharField(
        max_length=20,
        choices=ASUNTO_CHOICES,
        default='consulta',
        help_text="Asunto del mensaje"
    )
    mensaje = models.TextField(
        help_text="Contenido del mensaje"
    )
    leido = models.BooleanField(
        default=False,
        help_text="Mensaje leído por administrador"
    )
    respondido = models.BooleanField(
        default=False,
        help_text="Se ha enviado respuesta"
    )
    respuesta = models.TextField(
        blank=True,
        null=True,
        help_text="Respuesta enviada"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    fecha_respuesta = models.DateTimeField(
        blank=True,
        null=True,
        help_text="Fecha en que se respondió"
    )

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Mensaje de Contacto'
        verbose_name_plural = 'Mensajes de Contacto'
        db_table = 'mensajes_contacto'

    def __str__(self):
        return f"{self.nombre} - {self.asunto}"
