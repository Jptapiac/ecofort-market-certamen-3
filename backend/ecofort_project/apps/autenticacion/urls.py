from django.urls import path
from . import views

app_name = 'autenticacion'

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('registro/', views.registro_view, name='registro'),
    path('perfil/', views.perfil_view, name='perfil'),
    path('logout/', views.logout_view, name='logout'),
    path('perfil/actualizar/', views.actualizar_perfil_view, name='actualizar_perfil'),
]
