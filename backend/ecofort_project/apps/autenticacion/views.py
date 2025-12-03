from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import PerfilCliente
from .serializers import (
    UsuarioSerializer,
    LoginSerializer,
    RegistroSerializer,
    PerfilClienteSerializer
)

@api_view(['POST'])
def login_view(request):
    """
    Login endpoint
    Requiere: email, password
    Retorna: usuario info + token
    """
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        usuario_serializer = UsuarioSerializer(user)
        
        return Response({
            'success': True,
            'token': token.key,
            'usuario': usuario_serializer.data,
            'mensaje': f'Bienvenido {user.first_name or user.username}'
        }, status=status.HTTP_200_OK)
    
    return Response({
        'success': False,
        'errores': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registro_view(request):
    """
    Registro endpoint
    Requiere: email, username, password, password_confirm
    Retorna: usuario info + token
    """
    serializer = RegistroSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        
        usuario_serializer = UsuarioSerializer(user)
        
        return Response({
            'success': True,
            'token': token.key,
            'usuario': usuario_serializer.data,
            'mensaje': 'Registro exitoso. ¡Bienvenido a Ecofort Market!'
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'errores': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def perfil_view(request):
    """
    Obtener perfil del usuario autenticado
    """
    if not request.user.is_authenticated:
        return Response({
            'success': False,
            'error': 'No autenticado'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    usuario_serializer = UsuarioSerializer(request.user)
    return Response({
        'success': True,
        'usuario': usuario_serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_view(request):
    """
    Logout endpoint - Invalida el token del usuario
    """
    if request.user.is_authenticated:
        request.user.auth_token.delete()
        return Response({
            'success': True,
            'mensaje': 'Sesión cerrada'
        }, status=status.HTTP_200_OK)
    
    return Response({
        'success': False,
        'error': 'No autenticado'
    }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['PUT'])
def actualizar_perfil_view(request):
    """
    Actualizar datos del perfil del usuario
    """
    if not request.user.is_authenticated:
        return Response({
            'success': False,
            'error': 'No autenticado'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    user = request.user
    
    # Actualizar datos del usuario
    if 'first_name' in request.data:
        user.first_name = request.data['first_name']
    if 'last_name' in request.data:
        user.last_name = request.data['last_name']
    if 'email' in request.data:
        user.email = request.data['email']
    
    user.save()
    
    # Actualizar perfil cliente
    try:
        perfil = user.perfilcliente
        if 'telefono' in request.data:
            perfil.telefono = request.data['telefono']
        if 'direccion' in request.data:
            perfil.direccion = request.data['direccion']
        if 'ciudad' in request.data:
            perfil.ciudad = request.data['ciudad']
        perfil.save()
    except PerfilCliente.DoesNotExist:
        PerfilCliente.objects.create(usuario=user)
    
    usuario_serializer = UsuarioSerializer(user)
    
    return Response({
        'success': True,
        'usuario': usuario_serializer.data,
        'mensaje': 'Perfil actualizado correctamente'
    }, status=status.HTTP_200_OK)
