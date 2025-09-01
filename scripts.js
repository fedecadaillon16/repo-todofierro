// Inicializar el carrito desde localStorage o como array vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
  const button = event.target;
  const producto = {
    id: button.getAttribute('data-id'),
    nombre: button.getAttribute('data-nombre'),
    precio: parseFloat(button.getAttribute('data-precio')),
    cantidad: 1
  };

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.id === producto.id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push(producto);
  }

  guardarCarrito();
  actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito');
  const totalDiv = document.getElementById('total');
  carritoDiv.innerHTML = '';



  let total = 0;
  carrito.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('carrito-item');
    itemDiv.innerHTML = `
      <span>${item.nombre} (x${item.cantidad}) - $${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
      <button onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
    `;
    carritoDiv.appendChild(itemDiv);
    total += item.precio * item.cantidad;
  });

  totalDiv.textContent = `Total: $${total.toLocaleString('es-AR')}`;
}

// Añadir event listeners a los botones de agregar al carrito
document.querySelectorAll('.btn-carrito').forEach(button => {
  button.addEventListener('click', agregarAlCarrito);
});

// Añadir event listener al botón de vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

// Actualizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);