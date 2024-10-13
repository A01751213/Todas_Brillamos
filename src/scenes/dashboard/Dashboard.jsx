import React from 'react';
import Sidebar from '../../components/Sidebar';
import Stats from './Stats';
import ProductList from './ProductList';
import Topbar from '../global/Topbar';
import { Box, ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "../../theme";
import IncomeChart from './IncomeChart';

function Dashboard() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box display="flex" flexDirection="column" height="100vh">
          <Topbar />
          <Box display="flex" flexGrow={1}>
            <Sidebar />
            <Box flexGrow={1} p={4}>
              <Box
                bgcolor="#efefef"
                p={3}
                borderRadius="10px"
                boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
              >
                <h1 style={{ textAlign: 'center' }}>Bienvenido al Dashboard</h1>
                <Box display="flex" justifyContent="space-between" mt={3}>
                  <Box width="70%">
                    <Stats />
                  </Box>
                  <Box width="25%">
                    <ProductList />
                  </Box>
                </Box>
                <Box mt={4}>
                  <IncomeChart />
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
