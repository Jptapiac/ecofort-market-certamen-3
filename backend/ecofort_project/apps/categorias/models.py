from django.db import models
from django.utils.text import slugify

class Categoria(models.Model):
    """
    Modelo de Categoría de Productos
    Agrupa productos similares
    """
    nombre = models.CharField(
        max_length=100,
        unique=True,
        help_text="Nombre único de la categoría"
    )
    descripcion = models.TextField(
        blank=True,
        null=True,
        help_text="Descripción detallada de la categoría"
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
        help_text="URL amigable"
    )
    imagen = models.ImageField(
        upload_to='categorias/',
        blank=True,
        null=True,
        help_text="Imagen representativa de la categoría"
    )
    es_activo = models.BooleanField(
        default=True,
        help_text="Si la categoría está visible en el sitio"
    )
    orden = models.IntegerField(
        default=0,
        help_text="Orden de visualización"
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden', 'nombre']
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'
        db_table = 'categorias'

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)
