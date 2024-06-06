import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.scss';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@mui/styles';
import { APIs } from '../../constants/constants';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  accordion: {
    width: '100%',
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'rgba(106, 27, 154, 0.8)',
  },
  accordionSummary: {
    backgroundColor: 'rgba(106, 27, 154, 0.8)',
    border: 'none',
  },
  accordionDetails: {
    backgroundColor: 'rgba(106, 27, 154, 0.8)',
    border: 'none',
  },
  button: {
    width: '100%',
    textAlign: 'left',
    backgroundColor: 'rgba(106, 27, 154, 0.8)',
    border: 'none',
  },
  popper: {
    zIndex: 1300, // Ajusta este valor según sea necesario
    marginTop: '25px', 
  },
  menu: {
    zIndex: 1300, // Ajusta este valor según sea necesario
  },
  menuItem: {
    margin: '20px 0', // Ajusta este valor según sea necesario
  }

}));

const pages = [
  {
    id: 1,
    name: 'Cajas',
    subcategories: ['Subcat1', 'Subcat2', 'Subcat3']
  },
  {
    id: 2,
    name: 'Botellines',
    subcategories: ['Subcat4', 'Subcat5', 'Subcat6']
  },
  {
    id: 3,
    name: 'Cosmeticos',
    subcategories: ['Subcat7', 'Subcat8', 'Subcat9']
  },
  {
    id: 4,
    name: 'DXN',
    subcategories: ['Subcat10', 'Subcat11', 'Subcat12']
  }
];

const NavBar = () => {
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [openCategory, setOpenCategory] = useState([]);
  const anchorRefs = useRef([]);

  useEffect(() => {
    // Fetch categories and subcategories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(APIs.CATEGORY); // Reemplaza con la URL de tu API
        console.log("data",response);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  console.log("categorias de back",categories);
  const handleToggle = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleClose = (event) => {
    if (anchorRefs.current[openCategory] && anchorRefs.current[openCategory].contains(event.target)) {
      return;
    }
    setOpenCategory(null);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenCategory(null);
    }
  };

  useEffect(() => {
    if (openCategory !== null && anchorRefs.current[openCategory]) {
      anchorRefs.current[openCategory].focus();
    }
  }, [openCategory]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubcategoryClick = (subcategory, category) => {
    console.log("category", category)
    console.log("subcategory",subcategory);
    navigate(`/categoria/${category}/${subcategory}`);
    setExpanded(false); // Cerrar el menú hamburguesa al seleccionar una subcategoría
    setAnchorElNav(null); // Cerrar el menú hamburguesa al seleccionar una subcategoría
  };
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search/${searchValue}`);
      setSearchValue('');
    }
  };
  return (
    <AppBar position="static" style={{ backgroundColor: "#6a1b9a", left: isMobile ? '0px' : '', paddingLeft: isMobile ? '0px' : '' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isMobile && (
            <Link to="/">
              <IconButton
                edge="start"
                size="large"
                color="inherit"
              >
                <img
                  src="/producto-natural.png"
                  alt="Imagen"
                  style={{
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                  }}
                />
              </IconButton>
            </Link>
          )}

          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Tooltip title="Inicio">
                <Link to="/">
                  <IconButton
                    edge="start"
                    size="large"
                    color="inherit"
                  >
                    <img
                      src="/producto-natural.png"
                      alt="Imagen"
                      style={{
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                      }}
                    />
                  </IconButton>
                </Link>
              </Tooltip>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <InputBase
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      minWidth: '150px',
                      maxWidth: '250px',
                      padding: '4px 8px 4px 32px',
                      color: 'black',
                    }}
                  />
                  <SearchIcon
                    style={{
                      color: 'gray',
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const enterKeyPressEvent = { key: 'Enter', keyCode: 13 };
                      handleSearchKeyPress(enterKeyPressEvent);
                    }}
                  />
                </div>
                <IconButton
                  edge="start"
                  size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(event) => setAnchorElNav(event.currentTarget)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={() => setAnchorElNav(null)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  PaperProps={{
                    style: {
                      backgroundColor: 'rgba(126, 41, 173, 0.8)',
                      padding: '1rem',
                      width: '100%',
                      height: '100vh',
                      top: 0,
                      left: 0,
                      margin: 0,
                    },
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    backgroundColor: 'rgba(106, 27, 154, 0.8)'
                  }}
                  className={classes.menu}
                >
                  {categories.map((item) => (
                    <Accordion
                      key={item.id}
                      expanded={expanded === item.id}
                      onChange={handleAccordionChange(item.id)}
                      style={{ backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${item.id}-content`}
                        id={`${item.id}-header`}
                        style={{ backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}
                      >
                        <Typography>{item.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordionDetails}>
                        {item.subcategory.map((subcategory) => (
                          <Button
                            key={subcategory.id}
                            onClick={() => handleSubcategoryClick(subcategory.id, item.name)}
                            className={classes.button}
                          >
                            {subcategory.name}
                          </Button>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Menu>
                <Tooltip title="Open settings">
                    <CartWidget fontSize="small" />
                  </Tooltip>
              </Box>
           
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', gap: '1rem' }}>
                {categories.map((page, index) => (
                  <div key={page.id}>
                    <Button
                      ref={(el) => (anchorRefs.current[index] = el)}
                      onClick={() => handleToggle(index)}
                      color="inherit"
                      className={classes.button}
                    >
                      {page.name}
                    </Button>
                    <Popper
                      open={openCategory === index}
                      anchorEl={anchorRefs.current[index]}
                      role={undefined}
                      transition
                      disablePortal
                      className={classes.popper}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper  style={{backgroundColor:'white', width:'150px',borderRadius:'0px'}}>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList autoFocusItem={openCategory === index} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                {page.subcategory.map((subcategory) => (
                                  <MenuItem
                                    key={subcategory.id}
                                    onClick={() => handleSubcategoryClick(subcategory.id, page.name)}
                                   style={{marginBottom:'10px'}}
                                  >
                                    {subcategory.name}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <InputBase
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      minWidth: '150px',
                      maxWidth: '250px',
                      padding: '4px 8px 4px 32px',
                      color: 'black',
                    }}
                  />
                  <SearchIcon
                    style={{
                      color: 'gray',
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const enterKeyPressEvent = { key: 'Enter', keyCode: 13 };
                      handleSearchKeyPress(enterKeyPressEvent);
                    }}
                  />
                </div>
                <CartWidget />
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
