from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Categoria
from .serializers import CategoriaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para CRUD de Categorías
    Proporciona endpoints: GET, POST, PUT, DELETE
    """
    queryset = Categoria.objects.filter(es_activo=True)
    serializer_class = CategoriaSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['nombre', 'orden', 'fecha_creacion']
    ordering = ['orden']
