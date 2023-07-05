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
import {Link} from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.scss'


const pages = [
  {
    id:1,
    name: 'Cajas'
  },
  {
    id:2,
    name: 'Botellines'
  },
  {
    id:3,
    name: 'Cosmeticos'
  },
];
const settings = [
  {
    id:1,
    name:  'Profile'
  },
  {
    id:2,
    name: 'Account'
  },
  {
    id:3,
    name: 'Dashboard',
  },
  {
    id:4,
    name: 'Logout'
  }];

const NavBar= () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
 
    <AppBar position="static" style={{backgroundColor: "#6a1b9a"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
                <Link to="/new-ecomerce"><h2>LEO</h2></Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                style: {
                  backgroundColor: '#6a1b9a', // Cambia el color de fondo a rojo
                  padding: '1rem',
                },
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((item) => ( 
               <Link to={`/categoria/${ item.name }`}><MenuItem key={item.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem></Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to="/new-ecomerce">LEO</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((item) => (
              <Button
                key={item.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'blue', display: 'block' }}
              >
               <Link to={`/categoria/${ item.name }` }>  {item.name} </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            
              <CartWidget></CartWidget >
                   
              
            </Tooltip>
            </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton color="primary"  style={{ color: 'rgb(255, 0, 0)' }}  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
              
            </Tooltip>
     
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
            
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((item) => (
                <MenuItem key={item.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   
  );
};
export default NavBar;



