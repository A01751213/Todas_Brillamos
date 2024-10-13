import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          400: "#dedede",  // Colores para modo oscuro
        },
      }
    : {
        primary: {
          400: "#d32f2f",  // Colores para modo claro
        },
      }),
});

export const colors = (mode) => tokens(mode);

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const colors = tokens(mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return [theme, colorMode];
};
