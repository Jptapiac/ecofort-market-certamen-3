from rest_framework import serializers
from .models import MensajeContacto

class MensajeContactoSerializer(serializers.ModelSerializer):
    """
    Serializador para mensajes de contacto
    """
    class Meta:
        model = MensajeContacto
        fields = [
            'id', 'nombre', 'email', 'telefono', 'empresa', 'asunto',
            'mensaje', 'leido', 'respondido', 'respuesta',
            'fecha_creacion', 'fecha_actualizacion', 'fecha_respuesta'
        ]
        read_only_fields = [
            'id', 'fecha_creacion', 'fecha_actualizacion',
            'leido', 'respondido', 'respuesta', 'fecha_respuesta'
        ]

    def validate_email(self, value):
        """Validar formato de email"""
        if '@' not in value:
            raise serializers.ValidationError("Email inválido")
        return value

    def validate_mensaje(self, value):
        """Validar que el mensaje tenga contenido"""
        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "El mensaje debe tener al menos 10 caracteres"
            )
        return value
