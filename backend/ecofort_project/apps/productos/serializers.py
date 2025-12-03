from rest_framework import serializers
from .models import Producto
from apps.categorias.serializers import CategoriaSerializer

class ProductoSerializer(serializers.ModelSerializer):
    """
    Serializador para productos con relación a categoría
    """
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    categoria_datos = CategoriaSerializer(source='categoria', read_only=True)
    tiene_descuento = serializers.BooleanField(read_only=True)
    porcentaje_descuento = serializers.IntegerField(read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'descripcion_corta', 'slug',
            'categoria', 'categoria_nombre', 'categoria_datos',
            'precio', 'precio_descuento', 'tiene_descuento', 'porcentaje_descuento',
            'imagen', 'imagenes_adicionales', 'cantidad_stock', 'especificaciones',
            'estado', 'es_destacado', 'es_nuevo', 'calificacion', 'numero_resenas',
            'fecha_creacion', 'fecha_actualizacion'
        ]
        read_only_fields = [
            'id', 'fecha_creacion', 'fecha_actualizacion', 'slug',
            'tiene_descuento', 'porcentaje_descuento'
        ]

    def validate_precio(self, value):
        """Validar que el precio sea positivo"""
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value

    def validate(self, data):
        """Validar que precio_descuento sea menor que precio"""
        if data.get('precio_descuento') and data.get('precio'):
            if data['precio_descuento'] >= data['precio']:
                raise serializers.ValidationError(
                    "El precio con descuento debe ser menor que el precio normal"
                )
        return data
