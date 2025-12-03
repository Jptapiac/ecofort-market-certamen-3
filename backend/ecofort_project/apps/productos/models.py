from django.db import models
from django.utils.text import slugify
from apps.categorias.models import Categoria

class Producto(models.Model):
    """
    Modelo de Producto para el catálogo de Ecofort Market
    Incluye información completa del producto y relación con categoría
    """
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('descatalogado', 'Descatalogado'),
    ]

    nombre = models.CharField(
        max_length=255,
        help_text="Nombre del producto"
    )
    descripcion = models.TextField(
        help_text="Descripción detallada del producto"
    )
    descripcion_corta = models.CharField(
        max_length=500,
        blank=True,
        help_text="Descripción breve para listados"
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
        help_text="URL amigable"
    )
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT,
        related_name='productos',
        help_text="Categoría a la que pertenece"
    )
    precio = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Precio en CLP"
    )
    precio_descuento = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        help_text="Precio con descuento"
    )
    imagen = models.ImageField(
        upload_to='productos/%Y/%m/',
        help_text="Imagen principal del producto"
    )
    imagenes_adicionales = models.CharField(
        max_length=1000,
        blank=True,
        help_text="URLs de imágenes adicionales separadas por comas"
    )
    cantidad_stock = models.IntegerField(
        default=0,
        help_text="Stock disponible"
    )
    especificaciones = models.TextField(
        blank=True,
        help_text="Especificaciones técnicas en formato JSON"
    )
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='activo',
        help_text="Estado del producto"
    )
    es_destacado = models.BooleanField(
        default=False,
        help_text="Mostrar en sección destacados"
    )
    es_nuevo = models.BooleanField(
        default=False,
        help_text="Marcar como producto nuevo"
    )
    calificacion = models.FloatField(
        default=0,
        help_text="Calificación promedio (0-5)"
    )
    numero_resenas = models.IntegerField(
        default=0,
        help_text="Número de reseñas"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        db_table = 'productos'
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['categoria']),
            models.Index(fields=['estado']),
        ]

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    @property
    def tiene_descuento(self):
        return self.precio_descuento is not None and self.precio_descuento < self.precio

    @property
    def porcentaje_descuento(self):
        if self.tiene_descuento:
            return round(((self.precio - self.precio_descuento) / self.precio) * 100)
        return 0
