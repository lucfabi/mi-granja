from django.contrib import admin
from django.urls import path, include
from hello_world.core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('acceso/', views.acceso, name='acceso'),
    path('padres/', views.padres, name='padres'),
    path('granja/', views.granja, name='granja'),
    path('tienda/', views.tienda, name='tienda'),
    path('__reload__/', include('django_browser_reload.urls')),
]