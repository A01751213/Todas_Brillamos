/**
 * Catalogo Component
 * 
 * Este componente gestiona la visualización, creación, edición y eliminación de catálogos. 
 * Utiliza Material-UI para el diseño de la interfaz y Axios para realizar peticiones HTTP a un backend.
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - @mui/material: Librería de Material-UI para construir componentes visuales como botones, tablas y cuadros de diálogo.
 * - axios: Librería para realizar peticiones HTTP (GET, POST, PUT, DELETE).
 */

import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'; // Importa componentes de Material-UI
import axios from 'axios'; // Importa Axios para realizar peticiones HTTP

/**
 * Catalogo
 * 
 * Este componente permite gestionar catálogos a través de una tabla interactiva, que incluye 
 * opciones para crear, editar y eliminar catálogos mediante una API.
 * 
 * @returns {JSX.Element} El componente Catalogo con funcionalidades CRUD.
 */
const Catalogo = () => {
  // Estado para manejar la lista de catálogos, el diálogo de creación, y los catálogos en edición
  const [catalogs, setCatalogs] = useState([]); // Almacena la lista de catálogos
  const [open, setOpen] = useState(false); // Controla la apertura del diálogo para crear un nuevo catálogo
  const [newCatalog, setNewCatalog] = useState({ nombre: '', descripcion: '' }); // Maneja los datos del nuevo catálogo
  const [editCatalog, setEditCatalog] = useState(null); // Almacena el catálogo que se está editando

  /**
   * fetchCatalogs
   * 
   * Función que obtiene la lista de catálogos desde la API.
   * Se ejecuta al montar el componente y cada vez que hay cambios en los catálogos.
   */
  const fetchCatalogs = async () => {
    try {
      const response = await axios.get('http://98.82.104.24:8080/api/catalogs/'); // Petición GET para obtener los catálogos
      setCatalogs(response.data); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error('Error fetching catalogs', error); // Manejo de errores
    }
  };

  /**
   * createCatalog
   * 
   * Función que envía una petición POST a la API para crear un nuevo catálogo.
   * Luego cierra el diálogo y refresca la lista de catálogos.
   */
  const createCatalog = async () => {
    try {
      await axios.post('http://98.82.104.24:8080/api/catalogs/', {
        nombre: newCatalog.nombre,
        descripcion: newCatalog.descripcion,
      }); // Petición POST para crear un nuevo catálogo
      setOpen(false); // Cierra el diálogo
      setNewCatalog({ nombre: '', descripcion: '' }); // Limpia los campos del formulario
      fetchCatalogs(); // Actualiza la lista de catálogos
    } catch (error) {
      console.error('Error creating catalog', error); // Manejo de errores
    }
  };

  /**
   * updateCatalog
   * 
   * Función que envía una petición PUT a la API para actualizar un catálogo existente.
   * Luego refresca la lista de catálogos.
   * 
   * @param {number} id_catalogo - ID del catálogo a actualizar.
   */
  const updateCatalog = async (id_catalogo) => {
    try {
      await axios.put(`http://98.82.104.24:8080/api/catalogs/${id_catalogo}`, editCatalog); // Petición PUT para actualizar el catálogo
      setEditCatalog(null); // Limpia el estado de edición
      fetchCatalogs(); // Refresca la lista de catálogos
    } catch (error) {
      console.error('Error updating catalog', error); // Manejo de errores
    }
  };

  /**
   * deleteCatalog
   * 
   * Función que envía una petición DELETE a la API para eliminar un catálogo existente.
   * Luego refresca la lista de catálogos.
   * 
   * @param {number} id_catalogo - ID del catálogo a eliminar.
   */
  const deleteCatalog = async (id_catalogo) => {
    try {
      await axios.delete(`http://98.82.104.24:8080/api/catalogs/${id_catalogo}`); // Petición DELETE para eliminar el catálogo
      fetchCatalogs(); // Refresca la lista de catálogos
    } catch (error) {
      console.error('Error deleting catalog', error); // Manejo de errores
    }
  };

  // useEffect para obtener los catálogos al cargar el componente
  useEffect(() => {
    fetchCatalogs(); // Llama a la función para obtener los catálogos al montar el componente
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Catálogos
      </Typography>

      <Button
        variant="contained"
        onClick={() => setOpen(true)} // Abre el diálogo para crear un nuevo catálogo
        sx={{ marginBottom: '20px', backgroundColor: '#d22973', color: 'white' }}
      >
        Crear nuevo catálogo
      </Button>

      {/* Caja con scroll para la tabla de catálogos */}
      <Box sx={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '10px', padding: '10px' }}>
        <Table sx={{ minWidth: 650, backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
          <TableHead sx={{ backgroundColor: '#d22973', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {catalogs.length > 0 ? (
              catalogs.map((catalog) => (
                <TableRow key={catalog.id_catalogo}>
                  <TableCell>{catalog.id_catalogo}</TableCell>
                  <TableCell>
                    {editCatalog && editCatalog.id_catalogo === catalog.id_catalogo ? (
                      <TextField
                        value={editCatalog.nombre}
                        onChange={(e) => setEditCatalog({ ...editCatalog, nombre: e.target.value })}
                      />
                    ) : (
                      catalog.nombre
                    )}
                  </TableCell>
                  <TableCell>
                    {editCatalog && editCatalog.id_catalogo === catalog.id_catalogo ? (
                      <TextField
                        value={editCatalog.descripcion}
                        onChange={(e) => setEditCatalog({ ...editCatalog, descripcion: e.target.value })}
                      />
                    ) : (
                      catalog.descripcion
                    )}
                  </TableCell>
                  <TableCell>
                    {editCatalog && editCatalog.id_catalogo === catalog.id_catalogo ? (
                      <Button
                        onClick={() => updateCatalog(catalog.id_catalogo)}
                        sx={{ backgroundColor: '#d22973', color: 'white' }}
                      >
                        Guardar
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setEditCatalog(catalog)}
                        sx={{ backgroundColor: '#d22973', color: 'white' }}
                      >
                        Editar
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteCatalog(catalog.id_catalogo)}
                      sx={{ marginLeft: '10px', backgroundColor: '#ff4d4d', color: 'white' }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No hay catálogos disponibles.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Diálogo para crear un nuevo catálogo */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Crear nuevo catálogo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={newCatalog.nombre}
            onChange={(e) => setNewCatalog({ ...newCatalog, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            value={newCatalog.descripcion}
            onChange={(e) => setNewCatalog({ ...newCatalog, descripcion: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{ backgroundColor: '#ddd', color: '#333' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={createCatalog}
            sx={{ backgroundColor: '#d22973', color: 'white' }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Catalogo;
