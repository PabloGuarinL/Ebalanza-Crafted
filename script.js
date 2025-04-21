let carrito = {};
let totalCompra = 0;

function agregarAlCarrito(nombre, precio) {
  if (carrito[nombre]) {
    carrito[nombre].cantidad++;
  } else {
    carrito[nombre] = {
      precio: precio,
      cantidad: 1
    };
  }
  actualizarCarrito();
}

function eliminarDelCarrito(nombre) {
  if (carrito[nombre]) {
    carrito[nombre].cantidad--;
    if (carrito[nombre].cantidad <= 0) {
      delete carrito[nombre];
    }
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const contador = document.getElementById('contador');
  const totalElemento = document.getElementById('total-carrito');

  lista.innerHTML = '';
  let total = 0;
  let cantidadTotal = 0;

  for (const nombre in carrito) {
    const item = carrito[nombre];
    const li = document.createElement('li');

    li.innerHTML = `
      🕒 ${nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
      <button onclick="eliminarDelCarrito('${nombre}')" style="margin-left: 10px; color: red;">X</button>
    `;

    lista.appendChild(li);
    total += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;
  }

  contador.textContent = cantidadTotal;
  totalElemento.textContent = `Total: $${total.toFixed(2)}`;
}

function vaciarCarrito() {
  if (Object.keys(carrito).length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }

  if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
    carrito = {};
    guardarCarrito();
    actualizarCarrito();
  }
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
  const guardado = localStorage.getItem('carrito');
  if (guardado) {
    carrito = JSON.parse(guardado);
    actualizarCarrito();
  }
}

window.onload = cargarCarrito;
