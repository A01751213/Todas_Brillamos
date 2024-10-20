/**
 * App Component
 * 
 * Este componente gestiona las rutas principales de la aplicación utilizando `react-router-dom`. Define el enrutamiento
 * para diferentes escenas como el inicio de sesión, el dashboard, el catálogo y los productos.
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - react-router-dom: Librería utilizada para gestionar la navegación entre diferentes rutas de la aplicación.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Router, Route y Routes para el enrutamiento
import Login from './scenes/Login'; // Importación del componente Login
import Dashboard from './scenes/dashboard/Dashboard'; // Importación del componente Dashboard
import Topbar from './scenes/global/Topbar'; // Importación del componente Topbar
import Catalogo from './scenes/Catalogo/catalogo'; // Importación del componente Catalogo
import Productos from './scenes/Productos/productos'; // Importación del componente Productos

/**
 * App
 * 
 * Este componente define el sistema de enrutamiento para la aplicación. Muestra la barra superior (Topbar)
 * y contiene las rutas para las diferentes páginas, incluyendo el inicio de sesión, el dashboard, el catálogo y los productos.
 * 
 * @returns {JSX.Element} El componente principal con las rutas definidas.
 */
function App() {
  return (
    <Router> {/* Componente Router para manejar la navegación */}
      <div>
        <Topbar /> {/* Barra superior visible en todas las rutas */}
        <Routes> {/* Definición de las rutas */}
          {/* Ruta para el inicio de sesión */}
          <Route path="/" element={<Login />} />
          {/* Ruta para el dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Ruta para el catálogo */}
          <Route path="/catalogo" element={<Catalogo />} />
          {/* Ruta para los productos */}
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
