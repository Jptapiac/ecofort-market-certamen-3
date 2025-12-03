from django.contrib import admin
from .models import PerfilCliente

@admin.register(PerfilCliente)
class PerfilClienteAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'telefono', 'ciudad', 'fecha_registro')
    list_filter = ('ciudad', 'fecha_registro')
    search_fields = ('usuario__username', 'usuario__email', 'telefono')
    readonly_fields = ('fecha_registro',)
