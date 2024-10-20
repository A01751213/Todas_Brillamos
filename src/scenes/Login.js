/**
 * Login Component
 * 
 * Este componente gestiona el proceso de inicio de sesión. Permite a los usuarios ingresar su correo electrónico
 * y contraseña, y realiza una validación de las credenciales. Si las credenciales son correctas, redirige al usuario
 * al dashboard; de lo contrario, muestra un mensaje de error.
 * 
 * Librerías utilizadas:
 * - React: Framework principal para la creación del componente.
 * - react-router-dom: Librería utilizada para la navegación programática dentro de la aplicación.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación

/**
 * Login
 * 
 * Este componente representa un formulario de inicio de sesión. Si el correo y la contraseña ingresados son
 * correctos, el usuario es redirigido al dashboard; de lo contrario, se muestra un mensaje de error.
 * 
 * @returns {JSX.Element} El componente de inicio de sesión con validación básica.
 */
function Login() {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigate = useNavigate(); // Hook para redirigir al usuario

  /**
   * handleSubmit
   * 
   * Función que se ejecuta cuando el formulario es enviado. Valida las credenciales y redirige
   * al dashboard si son correctas, o muestra una alerta si son incorrectas.
   * 
   * @param {object} e - Evento de formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Validación simple de credenciales
    if (email === 'admin@zazil.com' && password === 'zazil123') {
      navigate('/dashboard'); // Redirige al dashboard si las credenciales son correctas
    } else {
      alert('Credenciales incorrectas'); // Muestra un mensaje de alerta si son incorrectas
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}> {/* Maneja el envío del formulario */}
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="email" // Campo para el correo electrónico
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo
        />
        <input
          type="password"
          placeholder="password" // Campo para la contraseña
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
        />
        <button type="submit">Entrar</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
}

export default Login;