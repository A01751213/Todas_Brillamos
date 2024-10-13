import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://98.82.104.24:8080/api/products/')  
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div style={{ fontSize: '14px', padding: '10px' }}>
      <h3>Lista de Productos</h3>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>{product.nombre}</li>
          ))
        ) : (
          <li>No hay productos disponibles.</li>
        )}
      </ul>
    </div>
  );
}

export default ProductList;
