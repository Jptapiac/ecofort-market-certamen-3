from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import MensajeContacto
from .serializers import MensajeContactoSerializer

class MensajeContactoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar mensajes de contacto
    """
    queryset = MensajeContacto.objects.all()
    serializer_class = MensajeContactoSerializer

    def create(self, request, *args, **kwargs):
        """Crear nuevo mensaje de contacto"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'detail': 'Mensaje enviado exitosamente'},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['get'])
    def no_leidos(self, request):
        """Obtener mensajes no leídos"""
        mensajes = self.queryset.filter(leido=False).count()
        return Response({'no_leidos': mensajes})

    @action(detail=True, methods=['post'])
    def marcar_leido(self, request, pk=None):
        """Marcar mensaje como leído"""
        mensaje = self.get_object()
        mensaje.leido = True
        mensaje.save()
        return Response({'detail': 'Mensaje marcado como leído'})
