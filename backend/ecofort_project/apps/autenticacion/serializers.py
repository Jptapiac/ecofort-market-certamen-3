from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PerfilCliente

class PerfilClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilCliente
        fields = ['id', 'telefono', 'direccion', 'ciudad', 'fecha_registro']

class UsuarioSerializer(serializers.ModelSerializer):
    perfil = PerfilClienteSerializer(read_only=True, source='perfilcliente')
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'perfil']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Email o contraseña incorrectos")
        
        if not user.check_password(password):
            raise serializers.ValidationError("Email o contraseña incorrectos")
        
        data['user'] = user
        return data

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password_confirm', 'first_name', 'last_name']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Este email ya está registrado")
        
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso")
        
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=password,
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        
        PerfilCliente.objects.create(usuario=user)
        return user
