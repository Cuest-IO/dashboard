// Core
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Parts
import Box from "@mui/material/Box";
// Parts
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A1EF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: '1024px'
        }
      }
    }
  }
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header/>
      <Box
        component="nav"
        sx={{ width: { sm: '240px' }, flexShrink: { sm: 0 } }}
      >
        <Sidebar/>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - 240px)`,
          ml: '240px',
          backgroundColor: '#f9f9f9',
      }}
      >
        <Outlet/>
      </Box>
    </ThemeProvider>
  )
}

export default Layout
