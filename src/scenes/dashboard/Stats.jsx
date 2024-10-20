/**
 * Stats Component
 * 
 * Este componente obtiene estadísticas de productos desde una API y visualiza dos gráficos:
 * - Cantidad de productos por categoría.
 * - Precio promedio de productos por categoría.
 * 
 * Se encarga de manejar los estados de carga y error, y de formatear los datos para su visualización.
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - @nivo/bar: Librería para renderizar gráficos de barras.
 */

import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'; // Gráfico de barras responsivo de Nivo

/**
 * Stats
 * 
 * Este componente realiza una petición a la API para obtener productos y muestra estadísticas en
 * forma de gráficos de barras utilizando `@nivo/bar`. Los gráficos muestran:
 * 1. Cantidad de productos por categoría.
 * 2. Precio promedio de productos por categoría.
 * 
 * @returns {JSX.Element} El componente Stats con gráficos de productos y precios.
 */
function Stats() {
  const [categoryData, setCategoryData] = useState([]); // Estado para los datos de categorías
  const [priceData, setPriceData] = useState([]); // Estado para los datos de precios
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  /**
   * useEffect para obtener los datos de productos al montar el componente.
   * Se encarga de realizar la petición HTTP y procesar los datos para los gráficos.
   */
  useEffect(() => {
    fetch('http://98.82.104.24:8080/api/products/') // API de productos
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`); // Lanza un error si la respuesta no es exitosa
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((products) => {
        // Procesar productos para contar la cantidad por categoría
        const categoryCounts = products.reduce((acc, product) => {
          acc[product.categoria] = (acc[product.categoria] || 0) + 1; // Contar productos por categoría
          return acc;
        }, {});

        // Formatear datos para el gráfico de categorías
        const formattedCategoryData = Object.entries(categoryCounts).map(([category, count]) => ({
          categoria: category,
          cantidad: count,
        }));

        // Procesar productos para calcular el precio promedio por categoría
        const priceAverage = products.reduce((acc, product) => {
          acc[product.categoria] = acc[product.categoria] || { total: 0, count: 0 };
          acc[product.categoria].total += product.precio;
          acc[product.categoria].count += 1;
          return acc;
        }, {});

        // Formatear datos para el gráfico de precios promedio
        const formattedPriceData = Object.entries(priceAverage).map(([category, { total, count }]) => ({
          categoria: category,
          promedio: total / count, // Calcular promedio de precio
        }));

        setCategoryData(formattedCategoryData); // Actualizar estado con los datos de categorías
        setPriceData(formattedPriceData); // Actualizar estado con los datos de precios
        setLoading(false); // Detener el estado de carga
      })
      .catch((error) => {
        setError(error.message); // Manejar error
        setLoading(false); // Detener el estado de carga
      });
  }, []);

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando estadísticas...</p>;
  }

  // Mostrar mensaje de error si la petición falla
  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      {/* Gráfico de cantidad de productos por categoría */}
      <h3 style={{ textAlign: 'center' }}>Distribución de Productos por Categoría</h3>
      <div style={{ height: 300, marginTop: '20px' }}> {/* Ajuste de altura */}
        <ResponsiveBar
          data={categoryData} // Datos para el gráfico de categorías
          keys={['cantidad']} // Clave para las barras
          indexBy="categoria" // Clave para el índice de las categorías
          margin={{ top: 50, right: 50, bottom: 100, left: 60 }} // Márgenes del gráfico
          padding={0.3} // Espaciado entre barras
          colors={"#F87753"} // Color personalizado para las barras
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45, // Rotación de las etiquetas en el eje X
            legend: 'Categoría', // Leyenda del eje X
            legendPosition: 'middle',
            legendOffset: 50,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0, // Rotación de las etiquetas en el eje Y
            legend: 'Cantidad de Productos', // Leyenda del eje Y
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12} // Evitar mostrar etiquetas si la barra es muy estrecha
          labelSkipHeight={12} // Evitar mostrar etiquetas si la barra es muy baja
          labelTextColor={{ from: 'color', modifiers: [['darker', 10]] }} // Color del texto de las etiquetas
        />
      </div>

      {/* Gráfico de precio promedio por categoría */}
      <h3 style={{ textAlign: 'center' }}>Precio Promedio de Productos por Categoría</h3>
      <div style={{ height: 300, marginTop: '20px' }}> {/* Ajuste de altura */}
        <ResponsiveBar
          data={priceData} // Datos para el gráfico de precios
          keys={['promedio']} // Clave para las barras
          indexBy="categoria" // Clave para el índice de las categorías
          margin={{ top: 50, right: 50, bottom: 100, left: 60 }} // Márgenes del gráfico
          padding={0.3} // Espaciado entre barras
          colors={"#F87753"} // Color personalizado para las barras
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45, // Rotación de las etiquetas en el eje X
            legend: 'Categoría', // Leyenda del eje X
            legendPosition: 'middle',
            legendOffset: 50,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0, // Rotación de las etiquetas en el eje Y
            legend: 'Precio Promedio', // Leyenda del eje Y
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12} // Evitar mostrar etiquetas si la barra es muy estrecha
          labelSkipHeight={12} // Evitar mostrar etiquetas si la barra es muy baja
          labelTextColor={{ from: 'color', modifiers: [['darker', 10]] }} // Color del texto de las etiquetas
        />
      </div>
    </div>
  );
}

export default Stats;