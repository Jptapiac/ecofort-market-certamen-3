from rest_framework import serializers
from .models import Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    """
    Serializador para la API de Categorías
    """
    class Meta:
        model = Categoria
        fields = [
            'id', 'nombre', 'descripcion', 'slug', 'imagen',
            'es_activo', 'orden', 'fecha_creacion', 'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion', 'slug']
