import React from 'react';
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useLocation } from "react-router-dom";  // Importamos useLocation para detectar la ruta
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
  console.log("Topbar component loaded"); // Log para verificar que el componente se está cargando

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const location = useLocation();  // Obtenemos la ubicación actual

  // Verificamos si estamos en la página de login para ocultar los íconos
  const isLoginPage = location.pathname === '/';

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      <Box /> {/* Lo usamos despues */}
      
      {/* Íconos del Topbar: Solo se muestran si NO estamos en la página de login */}
      {!isLoginPage && (
        <Box display="flex" alignItems="center">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Topbar;
