/**
 * Productos Component
 * 
 * Este componente permite la gestión de productos. Proporciona funcionalidades para:
 * - Visualizar la lista de productos.
 * - Crear un nuevo producto.
 * - Editar productos existentes.
 * - Eliminar productos.
 * 
 * Maneja los estados de carga y errores, y utiliza la API para realizar peticiones de CRUD (Create, Read, Update, Delete).
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - @mui/material: Librería de Material-UI para construir componentes visuales como tablas y cuadros de diálogo.
 * - axios: Librería para realizar peticiones HTTP (GET, POST, PUT, DELETE).
 */

import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'; // Importación de componentes de Material-UI
import axios from 'axios'; // Importación de Axios para realizar las peticiones HTTP

/**
 * Productos
 * 
 * Este componente maneja la gestión de productos, permitiendo crear, editar y eliminar productos 
 * mediante peticiones a una API. Además, utiliza una tabla para mostrar la lista de productos.
 * 
 * @returns {JSX.Element} El componente Productos con funcionalidades CRUD.
 */
const Productos = () => {
  // Estados del componente
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos
  const [open, setOpen] = useState(false); // Estado para controlar la apertura del cuadro de diálogo de creación
  const [newProduct, setNewProduct] = useState({ nombre: '', descripcion: '', precio: 0, categoria: '', cantidad: 0, imagen: '', id_catalogo: 1 }); // Estado para manejar los datos del nuevo producto
  const [editProduct, setEditProduct] = useState(null); // Estado para manejar la edición de productos

  /**
   * fetchProducts
   * 
   * Función para obtener la lista de productos desde la API.
   */
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://98.82.104.24:8080/api/products/'); // Petición GET a la API
      setProducts(response.data); // Actualiza el estado con la lista de productos obtenidos
    } catch (error) {
      console.error('Error fetching products', error); // Manejo de errores
    }
  };

  /**
   * createProduct
   * 
   * Función para crear un nuevo producto mediante una petición POST a la API.
   * Después de crear el producto, cierra el cuadro de diálogo y actualiza la lista de productos.
   */
  const createProduct = async () => {
    try {
      await axios.post('http://98.82.104.24:8080/api/products/', newProduct); // Petición POST a la API para crear un nuevo producto
      setOpen(false); // Cierra el cuadro de diálogo
      setNewProduct({ nombre: '', descripcion: '', precio: 0, categoria: '', cantidad: 0, imagen: '', id_catalogo: 1 }); // Limpia el estado del nuevo producto
      fetchProducts(); // Actualiza la lista de productos
    } catch (error) {
      console.error('Error creating product', error); // Manejo de errores
    }
  };

  /**
   * updateProduct
   * 
   * Función para actualizar un producto mediante una petición PUT a la API.
   * Después de actualizar el producto, limpia el estado de edición y actualiza la lista de productos.
   * 
   * @param {number} id_producto - El ID del producto que se va a actualizar.
   */
  const updateProduct = async (id_producto) => {
    try {
      await axios.put(`http://98.82.104.24:8080/api/products/${id_producto}`, editProduct); // Petición PUT para actualizar un producto
      setEditProduct(null); // Limpia el estado de edición
      fetchProducts(); // Actualiza la lista de productos
    } catch (error) {
      console.error('Error updating product', error); // Manejo de errores
    }
  };

  /**
   * deleteProduct
   * 
   * Función para eliminar un producto mediante una petición DELETE a la API.
   * Después de eliminar el producto, actualiza la lista de productos.
   * 
   * @param {number} id_producto - El ID del producto que se va a eliminar.
   */
  const deleteProduct = async (id_producto) => {
    try {
      await axios.delete(`http://98.82.104.24:8080/api/products/${id_producto}`); // Petición DELETE para eliminar un producto
      fetchProducts(); // Actualiza la lista de productos
    } catch (error) {
      console.error('Error deleting product', error); // Manejo de errores
    }
  };

  // useEffect para obtener los productos al cargar el componente
  useEffect(() => {
    fetchProducts(); // Llama a fetchProducts cuando el componente se monta
  }, []);

  /**
   * truncate
   * 
   * Función para truncar un texto si excede una longitud máxima.
   * 
   * @param {string} str - El texto a truncar.
   * @param {number} maxLength - La longitud máxima permitida.
   * @returns {string} El texto truncado.
   */
  const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str; // Trunca el texto si excede el maxLength
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <h1>Gestión de Productos</h1>
      <Button
        variant="contained"
        onClick={() => setOpen(true)} // Abre el cuadro de diálogo para crear un nuevo producto
        sx={{ marginBottom: '20px', backgroundColor: '#d22973', color: 'white' }}
      >
        Crear nuevo producto
      </Button>
      
      {/* Caja con scroll y estilos para la tabla de productos */}
      <Box sx={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
        <Table sx={{ minWidth: 650, backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
          <TableHead sx={{ backgroundColor: '#d22973', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Categoría</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cantidad</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Imagen</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id_producto}>
                <TableCell>{product.id_producto}</TableCell>
                <TableCell>
                  {editProduct && editProduct.id_producto === product.id_producto ? (
                    <TextField
                      value={editProduct.nombre}
                      onChange={(e) => setEditProduct({ ...editProduct, nombre: e.target.value })}
                    />
                  ) : (
                    product.nombre
                  )}
                </TableCell>
                <TableCell>
                  {editProduct && editProduct.id_producto === product.id_producto ? (
                    <TextField
                      value={editProduct.descripcion}
                      onChange={(e) => setEditProduct({ ...editProduct, descripcion: e.target.value })}
                    />
                  ) : (
                    truncate(product.descripcion, 20) // Mostrar solo los primeros 20 caracteres
                  )}
                </TableCell>
                <TableCell>
                  {editProduct && editProduct.id_producto === product.id_producto ? (
                    <TextField
                      value={editProduct.precio}
                      onChange={(e) => setEditProduct({ ...editProduct, precio: e.target.value })}
                    />
                  ) : (
                    product.precio
                  )}
                </TableCell>
                <TableCell>
                  {editProduct && editProduct.id_producto === product.id_producto ? (
                    <TextField
                      value={editProduct.categoria}
                      onChange={(e) => setEditProduct({ ...editProduct, categoria: e.target.value })}
                    />
                  ) : (
                    product.categoria
                  )}
                </TableCell>
                <TableCell>
                  {editProduct && editProduct.id_producto === product.id_producto ? (
                    <TextField
                      value={editProduct.cantidad}
                      onChange={(e) => setEditProduct({ ...editProduct, cantidad: e.target.value })}
                    />
                  ) : (
                    product.cantidad
                  )}
                </TableCell>
                <TableCell>
                  {editProduct && editProduct.id_producto === product.id_producto ? (
                    <TextField
                      value={editProduct.imagen}
                      onChange={(e) => setEditProduct({ ...editProduct, imagen: e.target.value })}
                    />
                  ) : (
                    truncate(product.imagen, 20) // Mostrar solo los primeros 20 caracteres
                  )}
                </TableCell>
                <TableCell>
                  {editProduct && editProduct.id_producto === product.id_producto ? (
                    <Button
                      onClick={() => updateProduct(product.id_producto)}
                      sx={{ backgroundColor: '#d22973', color: 'white' }}
                    >
                      Guardar
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setEditProduct(product)}
                      sx={{ backgroundColor: '#d22973', color: 'white' }}
                    >
                      Editar
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteProduct(product.id_producto)}
                    sx={{ marginLeft: '10px', backgroundColor: '#ff4d4d', color: 'white' }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Diálogo para crear un nuevo producto */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Crear nuevo producto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={newProduct.nombre}
            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            value={newProduct.descripcion}
            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Precio"
            fullWidth
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Categoría"
            fullWidth
            value={newProduct.categoria}
            onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Cantidad"
            fullWidth
            value={newProduct.cantidad}
            onChange={(e) => setNewProduct({ ...newProduct, cantidad: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Imagen"
            fullWidth
            value={newProduct.imagen}
            onChange={(e) => setNewProduct({ ...newProduct, imagen: e.target.value })}
          />
          <TextField
            margin="dense"
            label="ID Catálogo"
            fullWidth
            value={newProduct.id_catalogo}
            onChange={(e) => setNewProduct({ ...newProduct, id_catalogo: e.target.value })}
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
            onClick={createProduct}
            sx={{ backgroundColor: '#d22973', color: 'white' }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Productos;