from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def acceso(request):
    return render(request, 'acceso.html')

def padres(request):
    return render(request, 'padres.html')

def granja(request):
    return render(request, 'granja.html')

def tienda(request):
    return render(request, 'tienda.html')

