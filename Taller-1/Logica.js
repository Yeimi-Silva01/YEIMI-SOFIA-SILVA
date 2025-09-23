const readline = require("readline");

const interfazConsola = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const listaProductos = [ //scope global
  { nombre: "Arroz", precio: 3000 },
  { nombre: "Leche", precio: 3000 },
  { nombre: "Huevos", precio: 500 },
  { nombre: "Pan", precio: 300 },
  { nombre: "Queso", precio: 10000 },
  { nombre: "Azucar", precio: 2200 },
  { nombre: "Sal", precio: 2000 },
  { nombre: "Café", precio: 3200 }, 
  { nombre: "Frijoles", precio: 5000 },
  { nombre: "Cereal", precio: 2500 },
  { nombre: "Aceite", precio: 3000 },
  { nombre: "Harina", precio: 3000 }
];

//scope global
let carritoDeCompras = [];
let totalCompra = 0;

function mostrarMenuPrincipal() { //scope de función
  console.log("\n== Lista de productos disponibles (unidad) ==");
  for (let indiceProducto = 0; indiceProducto < listaProductos.length; indiceProducto++) { //scope de bloque
    console.log(`${indiceProducto + 1}. ${listaProductos[indiceProducto].nombre} - $${listaProductos[indiceProducto].precio}`);
  }

  interfazConsola.question("\nElige un producto (número) o 0 para finalizar: ", (opcionProducto) => {
    let indiceProductoSeleccionado = parseInt(opcionProducto) - 1;

    if (opcionProducto === "0") {
      mostrarResumenCompra();
      return;
    }

    if (isNaN(indiceProductoSeleccionado) || indiceProductoSeleccionado < 0 || indiceProductoSeleccionado >= listaProductos.length) {
      console.log("❌ Opción inválida.");
      mostrarMenuPrincipal();
    } else {
      interfazConsola.question("Cantidad: ", (respuestaCantidad) => {
        let cantidadSeleccionada = parseInt(respuestaCantidad);

        if (isNaN(cantidadSeleccionada) || cantidadSeleccionada <= 0) {
          console.log("❌ Cantidad inválida.");
          mostrarMenuPrincipal();
        } else {
          let productoSeleccionado = listaProductos[indiceProductoSeleccionado];
          let costoParcial = productoSeleccionado.precio * cantidadSeleccionada;

          carritoDeCompras.push({
            nombre: productoSeleccionado.nombre,
            cantidad: cantidadSeleccionada,
            subtotal: costoParcial
          });

          totalCompra += costoParcial;

          console.log(`✔ Agregaste ${cantidadSeleccionada} x ${productoSeleccionado.nombre} = $${costoParcial}`);
          mostrarCarrito();
          mostrarOpcionesPostAgregar();
        }
      });
    }
  });
}

function mostrarCarrito() { //scope de función, hoisting
  console.log("\n=== Carrito de compras ===");
  if (carritoDeCompras.length === 0) {
    console.log("Carrito vacío.");
  } else {
    for (let indiceProducto = 0; indiceProducto < carritoDeCompras.length; indiceProducto++) { //scope de bloque
      console.log(`${indiceProducto + 1}. ${carritoDeCompras[indiceProducto].cantidad} x ${carritoDeCompras[indiceProducto].nombre} = $${carritoDeCompras[indiceProducto].subtotal}`);
    }
    console.log("Subtotal: $" + totalCompra);
  }
}

function mostrarOpcionesPostAgregar() {
  interfazConsola.question("\n¿Qué deseas hacer? \n1. Agregar más productos \n2. Eliminar un producto \n3. Finalizar compra \nElige una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        mostrarMenuPrincipal();
        break;
      case "2":
        eliminarProductoDelCarrito();
        break;
      case "3":
        mostrarResumenCompra();
        break;
      default:
        console.log("❌ Opción inválida.");
        mostrarOpcionesPostAgregar();
    }
  });
}

function eliminarProductoDelCarrito() {
  mostrarCarrito();
  interfazConsola.question("\nNúmero del producto a eliminar (0 para cancelar): ", (opcionEliminar) => {
    let indiceProductoEliminar = parseInt(opcionEliminar) - 1;

    if (opcionEliminar === "0") {
      mostrarOpcionesPostAgregar();
      return;
    }

    if (isNaN(indiceProductoEliminar) || indiceProductoEliminar < 0 || indiceProductoEliminar >= carritoDeCompras.length) {
      console.log("❌ Entrada inválida.");
      eliminarProductoDelCarrito();
    } else {
      let productoEliminado = carritoDeCompras.splice(indiceProductoEliminar, 1)[0];
      totalCompra -= productoEliminado.subtotal;
      console.log(`🗑️ Eliminado ${productoEliminado.cantidad} x ${productoEliminado.nombre}`);
      mostrarCarrito();
      mostrarOpcionesPostAgregar();
    }
  });
}

function mostrarResumenCompra() {
  console.log("\n== Resumen de la compra ==");
  if (carritoDeCompras.length === 0) {
    console.log("Carrito vacío. No hay nada para comprar.");
    interfazConsola.close();
  } else {
    for (let indiceProducto = 0; indiceProducto < carritoDeCompras.length; indiceProducto++) {
      console.log(`${carritoDeCompras[indiceProducto].cantidad} x ${carritoDeCompras[indiceProducto].nombre} = $${carritoDeCompras[indiceProducto].subtotal}`);
    }
    console.log("TOTAL: $" + totalCompra);
    elegirMetodoPago();
  }
}

function elegirMetodoPago() {
  interfazConsola.question("\nMétodo de pago:\n1. Efectivo\n2. Tarjeta\n3. Trasferencia\nElige una opción: ", (opcionPago) => {
    switch (opcionPago) {
      case "1":
        console.log("✅ Pago en efectivo realizado.");
        break;
      case "2":
        console.log("✅ Pago con tarjeta realizado.");
        break;
      case "3":
        console.log("✅ Pago con tarjeta realizado.");
        break;
      default:
        console.log("❌ Opción inválida.");
        elegirMetodoPago();
        return;
    }
    console.log("🎉 ¡Gracias por su compra!");
    interfazConsola.close();
  });
}

console.log("== Bienvenido/a al Cajero del Supermercado ==");
mostrarMenuPrincipal(); //hoisting