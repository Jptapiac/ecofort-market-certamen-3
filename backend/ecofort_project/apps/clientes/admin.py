from django.contrib import admin
from .models import Cliente

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'tipo_cliente', 'es_activo', 'fecha_creacion')
    list_filter = ('tipo_cliente', 'es_activo', 'fecha_creacion')
    search_fields = ('nombre', 'email', 'razon_social', 'rut')
