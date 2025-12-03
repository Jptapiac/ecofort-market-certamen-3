from django.contrib import admin
from .models import Producto

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'cantidad_stock', 'estado', 'es_destacado')
    list_filter = ('categoria', 'estado', 'es_destacado', 'es_nuevo', 'fecha_creacion')
    search_fields = ('nombre', 'descripcion')
    prepopulated_fields = {'slug': ('nombre',)}
    fieldsets = (
        ('Información Básica', {
            'fields': ('nombre', 'slug', 'descripcion', 'descripcion_corta')
        }),
        ('Categoría y Precios', {
            'fields': ('categoria', 'precio', 'precio_descuento')
        }),
        ('Imágenes', {
            'fields': ('imagen', 'imagenes_adicionales')
        }),
        ('Stock y Estado', {
            'fields': ('cantidad_stock', 'estado')
        }),
        ('Destacados y Calificación', {
            'fields': ('es_destacado', 'es_nuevo', 'calificacion', 'numero_resenas')
        }),
        ('Especificaciones', {
            'fields': ('especificaciones',)
        }),
    )
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')
