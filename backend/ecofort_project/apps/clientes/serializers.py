from rest_framework import serializers
from .models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    """
    Serializador para clientes
    """
    class Meta:
        model = Cliente
        fields = [
            'id', 'nombre', 'email', 'telefono', 'tipo_cliente',
            'rut', 'razon_social', 'direccion', 'ciudad', 'region',
            'codigo_postal', 'compra_minima', 'es_activo', 'notas',
            'fecha_creacion', 'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']

    def validate_email(self, value):
        """Validar email único"""
        cliente_id = self.instance.id if self.instance else None
        if Cliente.objects.filter(email=value).exclude(id=cliente_id).exists():
            raise serializers.ValidationError("Este email ya está registrado")
        return value
