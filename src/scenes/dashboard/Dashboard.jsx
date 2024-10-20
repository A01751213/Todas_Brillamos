/**
 * Dashboard Component
 * 
 * Este componente es la página principal del panel de administración, que contiene una barra superior (Topbar),
 * una barra lateral (Sidebar), una sección de estadísticas (Stats), una lista de productos (ProductList) y un gráfico (ProductChart).
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - @mui/material: Librería de Material-UI para el diseño de la interfaz.
 * - useMode y ColorModeContext: Hooks personalizados para manejar el modo de color (tema oscuro/claro) en la aplicación.
 */

import React from 'react';
import Sidebar from '../../components/Sidebar'; // Componente de barra lateral
import Stats from './Stats'; // Componente de estadísticas
import ProductList from './ProductList'; // Componente de lista de productos
import Topbar from '../global/Topbar'; // Componente de barra superior
import { Box, ThemeProvider } from "@mui/material"; // Material-UI Box para layout, ThemeProvider para aplicar el tema
import { useMode, ColorModeContext } from "../../theme"; // Hook y contexto para manejar el tema
import ProductChart from './IncomeChart'; // Componente para el gráfico de ingresos

/**
 * Dashboard
 * 
 * Este componente representa el panel principal de la aplicación. Integra la barra lateral,
 * la barra superior, las estadísticas, la lista de productos y un gráfico de ingresos. 
 * Además, permite cambiar el modo de color (oscuro o claro) mediante `useMode` y `ColorModeContext`.
 * 
 * @returns {JSX.Element} El componente Dashboard con el panel de control.
 */
function Dashboard() {
  const [theme, colorMode] = useMode(); // Hook personalizado que devuelve el tema actual y el modo de color

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> {/* Proveedor del tema personalizado */}
        <Box display="flex" flexDirection="column" height="100vh"> {/* Contenedor principal */}
          <Topbar /> {/* Barra superior */}
          <Box display="flex" flexGrow={1}>
            <Sidebar /> {/* Barra lateral */}
            <Box flexGrow={1} p={4}> {/* Contenedor principal con padding */}
              <Box
                bgcolor="#efefef"  // Fondo gris claro
                p={3}  // Padding interior
                borderRadius="10px"  // Bordes redondeados
                boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"  // Sombra para dar profundidad
                marginBottom={3}  // Espaciado inferior
              >
                <h1 style={{ textAlign: 'center' }}>¡Bienvenido De Nuevo!</h1> {/* Título de bienvenida */}
                <Box display="flex" justifyContent="space-between" mt={3}>
                  <Box width="70%" mr={2}> {/* Contenedor de estadísticas */}
                    <Stats /> {/* Componente de estadísticas */}
                  </Box>
                  <Box width="30%"> {/* Contenedor de la lista de productos */}
                    <ProductList /> {/* Componente de lista de productos */}
                  </Box>
                </Box>
                <Box mt={4}> {/* Espaciado superior para el gráfico */}
                  <ProductChart /> {/* Componente de gráfico de productos */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashboard;