import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.scss'
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { APIs } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const pages = [
  {
    id: 1,
    name: 'Cajas'
  },
  {
    id: 2,
    name: 'Botellines'
  },
  {
    id: 3,
    name: 'Cosmeticos'
  },
  {
    id: 4,
    name: 'DXN'
  },
];
const settings = [
  {
    id: 1,
    name: 'Profile'
  },
  {
    id: 2,
    name: 'Account'
  },
  {
    id: 3,
    name: 'Dashboard',
  },
  {
    id: 4,
    name: 'Logout'
  }];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {

      navigate(`/search/${searchValue}`)
      setSearchValue('')
    }

  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <AppBar position="static" style={{ backgroundColor: "#6a1b9a" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {!isMobile && (
           <Link to="/">
                  <IconButton
                    edge="start"
                    size="large"
                    color="inherit"
                    // Agrega aquí los eventos o funciones que desees asociar con el icono
                  >
                    {/* Cambia 'ruta-de-tu-imagen' por la ruta real de tu imagen */}
                    <img
                      src="/producto-natural.png"
                      alt="Imagen"
                      style={{
                        borderRadius: '50%',
                        width: '50px', // Ajusta el ancho según tus necesidades
                        height: '50px', // Ajusta la altura según tus necesidades
                      }}
                    />
                  </IconButton>
                  </Link>
        )}
          {isMobile ? (
         
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
           <Tooltip title="Inicio">
           <Link to="/">
                  <IconButton
                    edge="start"
                    size="large"
                    color="inherit"
                    // Agrega aquí los eventos o funciones que desees asociar con el icono
                  >
                    {/* Cambia 'ruta-de-tu-imagen' por la ruta real de tu imagen */}
                    <img
                      src="/producto-natural.png"
                      alt="Imagen"
                      style={{
                        borderRadius: '50%',
                        width: '40px', // Ajusta el ancho según tus necesidades
                        height: '40px', // Ajusta la altura según tus necesidades
                      }}
                    />
                  </IconButton>
                  </Link>
                </Tooltip>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
   <div style={{ display: 'flex', alignItems: 'center',position: 'relative' }}>
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                minWidth: '150px', // Ancho mínimo
    maxWidth: '250px', // Ancho máximo
                padding: '4px 8px 4px 32px',  // Agregamos espacio a la izquierda para acomodar el icono.
                color: 'black',
              }}
            />
            <SearchIcon
              style={{
                color: 'gray',
                position: 'absolute',
                left: '8px',  // Ajusta la posición izquierda según sea necesario.
                top: '50%',   // Alinea verticalmente en el centro.
                transform: 'translateY(-50%)',  // Alinea verticalmente en el centro.
                cursor: 'pointer',
              }}
              onClick={() => {
                const enterKeyPressEvent = { key: 'Enter', keyCode: 13 };
                handleKeyPress(enterKeyPressEvent);
              }}
            />
          </div>
          <Box sx={{ display: 'flex', alignItems: 'left', textAlign:'left'}}>

              <IconButton
                edge="start"
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                
             
              >
                <MenuIcon />

              </IconButton>
              <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}

              PaperProps={{
                style: {
                  backgroundColor: 'rgba(106, 27, 154, 0.8)', // Cambia el color de fondo a rojo
                  padding: '1rem',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%', // Ajusta la altura para ocupar toda la pantalla
                },
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((item) => (
                <Link to={`/categoria/${item.name}`}><MenuItem key={item.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem></Link>
              ))}
            </Menu>
              <Tooltip title="Open settings">
                <CartWidget fontSize="small" />
              </Tooltip>
              </Box>
          </Box>
          </Box>
      
          ): (




         
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((item, index) => (
                <Button
                  key={item.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'blue', display: 'block' }}
                >
                  <Link to={`/categoria/${item.name}`}>  {index !== 0 && <span style={{ marginRight: '10px' }} />} {item.name} </Link>
                </Button>
              ))}
            </Box>
     )}


        
      
         

          {!isMobile && (

            <>    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', position: 'relative' }}>
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '4px 8px 4px 32px',  // Agregamos espacio a la izquierda para acomodar el icono.
                color: 'black',
              }}
            />
            <SearchIcon
              style={{
                color: 'gray',
                position: 'absolute',
                left: '8px',  // Ajusta la posición izquierda según sea necesario.
                top: '50%',   // Alinea verticalmente en el centro.
                transform: 'translateY(-50%)',  // Alinea verticalmente en el centro.
                cursor: 'pointer',
              }}
              onClick={() => {
                const enterKeyPressEvent = { key: 'Enter', keyCode: 13 };
                handleKeyPress(enterKeyPressEvent);
              }}
            />
          </div>
          <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <CartWidget />
              </Tooltip>
            </Box>
            </>
         
          )}


        </Toolbar>

      </Container>

    </AppBar>

  );
};
export default NavBar;



