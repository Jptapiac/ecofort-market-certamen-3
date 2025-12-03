"""
URL configuration for ecofort_project.
Enrutamiento principal de la API REST
Cada app tiene su propio archivo urls.py
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.documentation import include_docs_urls


@require_http_methods(["GET"])
def api_info(request):
    """Información de la API y endpoints disponibles"""
    return JsonResponse({
        "nombre": "Ecofort Market API",
        "version": "2.0",
        "estado": "Online ✅",
        "descripcion": "Platform de e-commerce sostenible",
        "endpoints": {
            "productos": "/api/productos/",
            "categorias": "/api/categorias/",
            "clientes": "/api/clientes/",
            "contacto": "/api/contacto/",
            "autenticacion": "/api/autenticacion/",
            "admin": "/admin/",
            "documentacion": "/api/docs/",
            "frontend": "http://localhost:8080"
        }
    })


urlpatterns = [
    path('', api_info, name='api-info'),
    path('admin/', admin.site.urls),
    
    # Cada app tiene su propio urls.py
    path('api/productos/', include('apps.productos.urls')),
    path('api/categorias/', include('apps.categorias.urls')),
    path('api/clientes/', include('apps.clientes.urls')),
    path('api/contacto/', include('apps.contacto.urls')),
    path('api/autenticacion/', include('apps.autenticacion.urls')),
    
    # Autenticación y documentación
    path('api-auth/', include('rest_framework.urls')),
    path('api/docs/', include_docs_urls(title='Ecofort Market API')),
]

# Servir media files en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
