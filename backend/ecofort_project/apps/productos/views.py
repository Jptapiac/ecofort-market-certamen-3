from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Producto
from .serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para CRUD de Productos
    Endpoints disponibles:
    - GET /api/productos/ - Lista todos los productos
    - POST /api/productos/ - Crear nuevo producto
    - GET /api/productos/{id}/ - Obtener detalles
    - PUT /api/productos/{id}/ - Actualizar producto
    - DELETE /api/productos/{id}/ - Eliminar producto
    - GET /api/productos/destacados/ - Productos destacados
    - GET /api/productos/nuevos/ - Productos nuevos
    """
    queryset = Producto.objects.filter(estado='activo')
    serializer_class = ProductoSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre', 'descripcion', 'categoria__nombre']
    ordering_fields = ['nombre', 'precio', 'fecha_creacion', 'calificacion']
    ordering = ['-fecha_creacion']

    @action(detail=False, methods=['get'])
    def destacados(self, request):
        """Obtener productos destacados"""
        productos = self.queryset.filter(es_destacado=True)[:8]
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def nuevos(self, request):
        """Obtener productos nuevos"""
        productos = self.queryset.filter(es_nuevo=True)[:8]
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def con_descuento(self, request):
        """Obtener productos con descuento"""
        productos = self.queryset.filter(precio_descuento__isnull=False)[:8]
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        """Filtrar por categoría si se proporciona"""
        queryset = super().get_queryset()
        categoria_id = self.request.query_params.get('categoria_id')
        if categoria_id:
            queryset = queryset.filter(categoria_id=categoria_id)
        return queryset
