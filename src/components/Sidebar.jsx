/**
 * Sidebar Component
 * 
 * Este componente representa una barra lateral fija (Drawer) que contiene un menú de navegación
 * para una aplicación. Utiliza Material-UI para la interfaz visual y react-router-dom para la navegación.
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - @mui/material: Librería de Material-UI para construir componentes visuales.
 * - @mui/icons-material: Iconos de Material-UI utilizados en el menú.
 * - react-router-dom: Hook `useNavigate` para manejar la navegación entre rutas.
 */

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'; // Importa los componentes de Material-UI
import DashboardIcon from '@mui/icons-material/Dashboard'; // Icono para el encabezado del Dashboard
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para navegar entre rutas
import ImportContactsIcon from '@mui/icons-material/ImportContacts'; // Icono del Catálogo
import InventoryIcon from '@mui/icons-material/Inventory'; // Icono de Productos

/**
 * Sidebar
 * 
 * Este componente contiene un Drawer (barra lateral) que muestra diferentes opciones de navegación.
 * Incluye un encabezado con el icono del Dashboard y dos opciones de menú: "Catálogo" y "Productos".
 * 
 * @returns {JSX.Element} El componente Sidebar con opciones de navegación.
 */
function Sidebar() {
  const navigate = useNavigate(); // Hook para la navegación entre rutas

  return (
    <Drawer
      variant="permanent"
      anchor="left" // La barra lateral está anclada al lado izquierdo de la pantalla
      sx={{
        width: 150, // Ancho del contenedor del Drawer
        flexShrink: 0, // Evita que el Drawer cambie de tamaño
        '& .MuiDrawer-paper': {
          width: 200, // Ancho del contenido del Drawer
          boxSizing: 'border-box', // Define cómo se ajusta el contenido del Drawer
          backgroundColor: 'rgba(210, 41, 114, 0.9)', // Color de fondo personalizado del Drawer
        },
      }}
    >
      <div style={{ padding: '10px' }}>
        {/* Encabezado del Drawer con un icono de Dashboard */}
        <Typography variant="h5" align="center" gutterBottom>
          <DashboardIcon /> DASHBOARD
        </Typography>
      </div>

      <List>
        {/* Elementos del menú de navegación */}
        {/* Componente ListItem para la opción de "Catálogo" */}
        <ListItem button onClick={() => navigate('/catalogo')}>
          <ListItemIcon>
            <ImportContactsIcon /> {/* Icono del catálogo */}
          </ListItemIcon>
          <ListItemText primary="Catálogo" /> {/* Texto del catálogo */}
        </ListItem>
        
        {/* Componente ListItem para la opción de "Productos" */}
        <ListItem button onClick={() => navigate('/productos')}>
          <ListItemIcon>
            <InventoryIcon /> {/* Icono de productos */}
          </ListItemIcon>
          <ListItemText primary="Productos" /> {/* Texto de productos */}
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
