
        const productos = document.querySelectorAll('.producto-card');
        const carritoContainer = document.getElementById('carrito-container');
        const carritoTotal = document.getElementById('carrito-total');
        const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        function actualizarCarrito() {
            carritoContainer.innerHTML = '';
            if (carrito.length === 0) {
                carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
                carritoTotal.querySelector('h3').textContent = 'Total: $0.00';
                return;
            }

            let total = 0;
            carrito.forEach(producto => {
                const item = document.createElement('div');
                item.classList.add('carrito-item');
                item.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>Cantidad: <input type="number" min="1" value="${producto.cantidad}" class="cantidad-input"></p>
                    <p>Precio: $${producto.precio}</p>
                    <button class="btn-eliminar">Eliminar</button>
                `;

                total += producto.cantidad * producto.precio;
                carritoContainer.appendChild(item);

                item.querySelector('.cantidad-input').addEventListener('change', e => {
                    producto.cantidad = parseInt(e.target.value);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarCarrito();
                });

                item.querySelector('.btn-eliminar').addEventListener('click', () => {
                    carrito = carrito.filter(p => p.id !== producto.id);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarCarrito();
                });
            });

            carritoTotal.querySelector('h3').textContent = `Total: $${total.toFixed(2)}`;
        }

        productos.forEach(producto => {
            producto.querySelector('.btn-agregar').addEventListener('click', () => {
                const id = parseInt(producto.dataset.id);
                const nombre = producto.dataset.nombre;
                const precio = parseFloat(producto.dataset.precio);

                const existente = carrito.find(p => p.id === id);
                if (existente) {
                    existente.cantidad++;
                } else {
                    carrito.push({ id, nombre, precio, cantidad: 1 });
                }

                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });

            producto.querySelector('.btn-descripcion').addEventListener('click', () => {
                alert(`Descripción ampliada de ${producto.dataset.nombre}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
            });
        });

        vaciarCarritoBtn.addEventListener('click', () => {
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        });

        actualizarCarrito();
       

   
        const finalizarCompraBtn = document.getElementById('finalizar-compra');
    
        finalizarCompraBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Añade productos antes de finalizar la compra.');
                return;
            }
    
            let mensaje = 'Has finalizado tu compra con los siguientes productos:\n\n';
            carrito.forEach(producto => {
                mensaje += `- ${producto.nombre} (Cantidad: ${producto.cantidad}, Precio: $${producto.precio})\n`;
            });
    
            const total = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
            mensaje += `\nTotal a pagar: $${total.toFixed(2)}`;
            alert(mensaje);
    
            // Vaciar el carrito después de finalizar la compra
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        });
       