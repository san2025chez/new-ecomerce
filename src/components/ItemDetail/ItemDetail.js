import { React } from 'react';
import { useState, useContext } from 'react'
import { CartCntext2 } from '../../context/CartCntext2'
import { ItemCounter } from '../ItemCounter/ItemCounter'
import { Link } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { CardContent } from '@mui/material';
import { Box } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import './ItemDetail.scss'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  mimargen: {
    marginTop: "3rem",
    marginBottom: "3rem",
    border: 'none', // Quítale el borde
    boxShadow: 'none',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  leftArrow: {
    left: theme.spacing(2),
  },
  rightArrow: {
    right: theme.spacing(2),
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export const ItemDetail = ({ product }) => {
  const classes = useStyles();
  console.log("item detail");
  console.log("producto para cart", { ...product });



  const { cart, addItem, isInCart, handleQuantity } = useContext(CartCntext2);
  const [quantity, setQuantity] = useState(0)
  const cartCount = (quantity) => {
    if (quantity) {
      console.log("verifico cart en detail", cart[0]);
      let indexItem = cart.findIndex((cartItem) => (cartItem.id === product.id));
      if (indexItem !== -1) {
        quantity = quantity;
      };
      return quantity
    } else {
      return null;
    }


  }
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const buttonStyle = {
    //  backgroundColor: "#6a1b9a",
    borderColor: '#6a1b9a',
   
    fontSize: '12px',
  

  
  backgroundColor:'#6a1b9a',
  color: 'white',
  borderRadius: '10px',
  padding: '10px',
    margin: '8px',
    '&:hover': {
      borderColor: '#6a1b9a', // Cambia esto al color deseado para el hover
      // backgroundColor: '#yourDesiredHoverBackgroundColor', // Cambia esto al color deseado para el fondo en hover
      color: '#6a1b9a', // Cambia esto al color deseado para el texto en hover
    },
  };
  const handleCounter = () => {
    if (quantity >= 0) {



      addItem(product)
      handleQuantity(product, quantity)
      setQuantity(quantity)
      addItem(product)
      console.log("cantidad en item detail", product);
    }

  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (

    <Container>

   
          <Grid container justifyContent="center" spacing={3}>

            <Grid item xs={12} sm={6} md={6} lg={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignItems: 'flex-start' }} >
            <Card className={classes.mimargen} justifyContent="center" >
             
              <img
                className="item__img"
                src={product?.images[currentImageIndex].url}
                alt={`img-${currentImageIndex}`}
                style={{ maxWidth: '100%', height: '90%' }}
              />
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4} xl={6} >

              <div className="item__detail" style={{paddingTop:'30px'}}>
                <div className="item__txt">
                  <p className="item__titulo">{product.name} </p>
                  <p className="item__precio">{product.price} </p>
                </div>

                <div>
                  {!isInCart(product.id) ?
                    <div className="narrow-div">
                      <ItemCounter
                        stock={product.stock}
                        cantidad={quantity}
                        onAdd={handleCounter}
                        setQuantity={setQuantity} 
                        style={{ height: isMobile ? '300px' : 'auto' }}/>
                    </div> :
                    <>
                      <br />
                      <Box display="flex" justifyContent="space-around">
                        <Link to='/cart'><Button variant="outlined" style={buttonStyle}>Terminar compra</Button></Link>
                        <Link to='/'><Button variant="outlined" style={buttonStyle}>Seguir Comprando</Button></Link>
                      </Box>
                    </>

                  }
                </div>
                <div className='item__element'>
                  <Typography variant="h7" className="custom-font">

                    <p className="item__descrip">{product.descriptions} </p>

                  </Typography>

                </div>


              </div>

            </Grid>

          </Grid>








    </Container>


  )
}