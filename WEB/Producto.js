// @Juan Pablo Hernández - 202122707

// Función para obtener el listado de productos
async function obtenerProductos() {
    const response = await fetch('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json');
    const productos = await response.json();
    return productos;
  }
  
  // Función para obtener el listado de pedidos
  async function obtenerPedidos() {
    const response = await fetch('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json');
    const pedidos = await response.json();
    return pedidos;
  }
  
  // Función principal para determinar el producto más pedido
  async function determinarProductoMasPedido() {
    try {
      // Obtener el listado de productos y pedidos
      const productos = await obtenerProductos();
      const pedidos = await obtenerPedidos();
  
      // Crear un objeto para almacenar la cantidad de pedidos por producto
      const cantidadPorProducto = {};
  
      // Iterar sobre los pedidos para contar la cantidad de veces que se pide cada producto
      pedidos.forEach(pedido => {
        if (cantidadPorProducto[pedido.idproducto]) {
          cantidadPorProducto[pedido.idproducto]++;
        } else {
          cantidadPorProducto[pedido.idproducto] = 1;
        }
      });
  
      // Determinar el producto más pedido
      let productoMasPedidoId;
      let maxCantidad = 0;
      for (const idProducto in cantidadPorProducto) {
        if (cantidadPorProducto[idProducto] > maxCantidad) {
          maxCantidad = cantidadPorProducto[idProducto];
          productoMasPedidoId = idProducto;
        }
      }
  
      // Encontrar el nombre del producto más pedido
      const productoMasPedido = productos.find(producto => producto.idproducto === productoMasPedidoId);
  
      // Mostrar el resultado por consola
      console.log('El producto más pedido es: ${productoMasPedido.nombreProducto} (${maxCantidad} veces).');
    } catch (error) {
      console.error('Error al procesar los datos:', error);
    }
  }

  determinarProductoMasPedido();
  