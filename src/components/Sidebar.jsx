import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 740,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          backgroundColor: 'rgba(210, 41, 114, 0.9)',
        },
      }}
    >
      <div style={{ padding: '10px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          <DashboardIcon /> DASHBOARD
        </Typography>
      </div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Estadísticas" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Ventas" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
