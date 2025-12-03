from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Cliente
from .serializers import ClienteSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para CRUD de Clientes
    """
    queryset = Cliente.objects.filter(es_activo=True)
    serializer_class = ClienteSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre', 'email', 'razon_social']
    ordering_fields = ['nombre', 'fecha_creacion', 'compra_minima']
    ordering = ['-fecha_creacion']
