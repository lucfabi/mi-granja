// Archivo compartido para conectar Granja, Tienda y Padres
const CLAVE_DATOS = 'wealthRoots_datos_v1';

// Cargar datos guardados o iniciar con los valores por defecto (750 monedas, Nivel 5, 120 XP)
function obtenerDatosJuego() {
  const guardado = localStorage.getItem(CLAVE_DATOS);
  if (guardado) {
    return JSON.parse(guardado);
  }
  const inicial = {
    monedas: 750,
    nivel: 5,
    xp: 120,
    animales: [],      // Ej: ['Gallina', 'Cerdo']
    compras: [],       // Historial de lo que compra el niño
    tareasAsignadas: [] // Tareas nuevas creadas por los padres
  };
  localStorage.setItem(CLAVE_DATOS, JSON.stringify(inicial));
  return inicial;
}

function guardarDatosJuego(datos) {
  localStorage.setItem(CLAVE_DATOS, JSON.stringify(datos));
}

// 1. Sumar monedas cuando el padre aprueba una tarea en padres.html
function sumarMonedasPadre(cantidad, nombreTarea = 'Tarea aprobada') {
  const datos = obtenerDatosJuego();
  datos.monedas += Number(cantidad);
  datos.xp += 15;
  if (datos.xp >= 200) {
    datos.nivel += 1;
    datos.xp -= 200;
  }
  guardarDatosJuego(datos);
  return datos;
}

// 2. Comprar un animal o semilla en tienda.html
function comprarEnTienda(nombreItem, precio) {
  const datos = obtenerDatosJuego();
  if (datos.monedas < precio) {
    alert('¡No tienes suficientes monedas! Completa más tareas para ganar.');
    return false;
  }
  datos.monedas -= Number(precio);
  datos.xp += 20;
  if (datos.xp >= 200) {
    datos.nivel += 1;
    datos.xp -= 200;
  }
  datos.animales.push(nombreItem);
  datos.compras.unshift({
    item: nombreItem,
    precio: precio,
    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  guardarDatosJuego(datos);
  return true;
}