from django.contrib import admin
from .models import MensajeContacto

@admin.register(MensajeContacto)
class MensajeContactoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'asunto', 'leido', 'respondido', 'fecha_creacion')
    list_filter = ('asunto', 'leido', 'respondido', 'fecha_creacion')
    search_fields = ('nombre', 'email', 'mensaje')
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion', 'fecha_respuesta')
