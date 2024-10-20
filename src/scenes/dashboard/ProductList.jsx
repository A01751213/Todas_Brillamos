/**
 * ProductList Component
 * 
 * Este componente obtiene una lista de productos desde una API y los muestra en una lista.
 * Se encarga de manejar tres estados principales:
 * - Carga: muestra un mensaje mientras los datos se están obteniendo.
 * - Error: muestra un mensaje si hay algún error en la petición.
 * - Sin productos: muestra un mensaje cuando no hay productos disponibles.
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - fetch: Método para realizar la petición HTTP a la API.
 */

import React, { useEffect, useState } from 'react';

/**
 * ProductList
 * 
 * Este componente realiza una petición a la API para obtener productos y los muestra en una lista.
 * Muestra mensajes de carga, error, o un mensaje cuando no hay productos disponibles.
 * 
 * @returns {JSX.Element} El componente ProductList que muestra la lista de productos.
 */
function ProductList() {
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null);     // Estado para manejar errores

  /**
   * useEffect para obtener la lista de productos cuando el componente se monta.
   * La petición se realiza una vez cuando el componente se renderiza por primera vez.
   */
  useEffect(() => {
    setLoading(true); // Inicia el estado de carga
    fetch('http://98.82.104.24:8080/api/products/') // Petición GET para obtener los productos desde la API
      .then((response) => {
        if (!response.ok) {
          // Lanza un error si la respuesta HTTP no es satisfactoria (estatus >= 400)
          throw new Error('Error al obtener los productos');
        }
        return response.json(); // Convierte la respuesta a formato JSON
      })
      .then((data) => {
        setProducts(data); // Actualiza el estado con los productos obtenidos
        setLoading(false); // Detiene el estado de carga
      })
      .catch((error) => {
        setError(error.message); // Actualiza el estado con el mensaje de error
        setLoading(false);       // Detiene el estado de carga
      });
  }, []); // Este hook se ejecuta solo una vez cuando el componente se monta

  return (
    <div style={{ fontSize: '14px', padding: '10px' }}>
      <h3>Lista de Productos</h3>

      {loading && <p>Cargando productos...</p>}   {/* Muestra un mensaje de carga mientras los datos están siendo obtenidos */}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error si ocurre un error */}

      {/* Lista de productos */}
      <ul style={{ textAlign: 'justify' }}> {/* Justifica el texto de la lista */}
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id_producto}>
              {/* Muestra el nombre, precio y cantidad de cada producto */}
              {product.nombre} - Precio: ${product.precio} - Cantidad: {product.cantidad}
            </li>
          ))
        ) : !loading && !error ? (
          <li>No hay productos disponibles.</li> // Muestra un mensaje si no hay productos disponibles
        ) : null}
      </ul>
    </div>
  );
}

export default ProductList;
