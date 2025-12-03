from django.contrib import admin
from .models import Categoria

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'es_activo', 'orden', 'fecha_creacion')
    list_filter = ('es_activo', 'fecha_creacion')
    search_fields = ('nombre', 'descripcion')
    prepopulated_fields = {'slug': ('nombre',)}
    ordering = ('orden', 'nombre')
