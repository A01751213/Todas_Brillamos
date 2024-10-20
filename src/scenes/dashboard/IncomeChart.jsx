/**
 * IncomeChart Component
 * 
 * Este componente renderiza un gráfico de barras que muestra la cantidad de productos por categoría.
 * Utiliza la librería `@nivo/bar` para crear un gráfico responsivo y realiza una petición a la API para obtener los datos.
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - @nivo/bar: Librería para renderizar gráficos de barras con una interfaz flexible y personalizable.
 * - fetch: Método para realizar la petición HTTP a la API.
 */

import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'; // Componente gráfico de barras de Nivo

/**
 * IncomeChart
 * 
 * Este componente obtiene los datos de productos de una API, los procesa para contar la cantidad
 * de productos por categoría, y los visualiza en un gráfico de barras.
 * 
 * @returns {JSX.Element} El componente IncomeChart que contiene el gráfico de productos por categoría.
 */
function IncomeChart() {
  const [data, setData] = useState([]); // Estado para almacenar los datos formateados del gráfico
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores en la petición

  // useEffect para obtener los datos de productos desde la API cuando el componente se monta
  useEffect(() => {
    fetch('http://98.82.104.24:8080/api/products/') // API de productos
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text(); // Si la respuesta no es exitosa, lanza un error con el mensaje
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((products) => {
        // Procesar los productos para contar cuántos hay por categoría
        const categoryCounts = products.reduce((acc, product) => {
          acc[product.categoria] = (acc[product.categoria] || 0) + 1; // Contador de productos por categoría
          return acc;
        }, {});

        // Formatear los datos para el gráfico
        const formattedData = Object.entries(categoryCounts).map(([category, count]) => ({
          categoria: category,
          cantidad: count,
        }));

        setData(formattedData); // Actualizar el estado con los datos formateados
        setLoading(false); // Cambiar el estado de carga a falso
      })
      .catch((error) => {
        setError(error.message); // Manejo de errores
        setLoading(false); // Cambiar el estado de carga a falso
      });
  }, []);

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando gráfico de productos...</p>;
  }

  // Mostrar mensaje de error si la petición falla
  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div style={{ height: 450 }}> {/* Estilo para aumentar la altura del contenedor del gráfico */}
      <h3 style={{ textAlign: 'center' }}>Cantidad de Productos por Categoría</h3> {/* Título centrado */}
      <ResponsiveBar
        data={data} // Datos a visualizar
        keys={['cantidad']} // Clave del valor de las barras
        indexBy="categoria" // Clave del índice para las categorías
        margin={{ top: 50, right: 50, bottom: 100, left: 60 }} // Márgenes del gráfico
        padding={0.3} // Espaciado entre barras
        colors={"#F87753"} // Color personalizado para las barras
        axisBottom={{
          tickSize: 5, // Tamaño de las marcas en el eje X
          tickPadding: 5, // Espaciado del texto en el eje X
          tickRotation: -45, // Rotación de las etiquetas del eje X
          legend: 'Categoría', // Leyenda del eje X
          legendPosition: 'middle', // Posición de la leyenda
          legendOffset: 50, // Desplazamiento de la leyenda
        }}
        axisLeft={{
          tickSize: 5, // Tamaño de las marcas en el eje Y
          tickPadding: 5, // Espaciado del texto en el eje Y
          tickRotation: 0, // Rotación de las etiquetas del eje Y
          legend: 'Cantidad de Productos', // Leyenda del eje Y
          legendPosition: 'middle', // Posición de la leyenda
          legendOffset: -40, // Desplazamiento de la leyenda
        }}
        labelSkipWidth={12} // Evita mostrar etiquetas si el ancho de la barra es menor a 12px
        labelSkipHeight={12} // Evita mostrar etiquetas si la altura de la barra es menor a 12px
        labelTextColor={{ from: 'color', modifiers: [['darker', 10]] }} // Color del texto de las etiquetas basado en el color de la barra
      />
    </div>
  );
}

export default IncomeChart;