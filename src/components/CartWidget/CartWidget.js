import React, { useContext } from "react";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {CartCntext2} from '../../context/CartCntext2'
import theme from './temaConfig'
import  {Badge} from '@material-ui/core';
import  {ShoppingCart} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: "3rem",
    },
    appBar: {
      backgroundColor: "whitesmoke",
      boxShadow: "none",
    },
    button: {
     /*  marginLeft: theme.spacing(2), */
     marginRight:0,
     paddingRight:0 
      
    },
    
    seccion: {
        flexGrow: 1,
      },
    icono: {
    
     
      float:"right"
    },
  }));
const CartWidget = ()=>{
    const classes = useStyles();
    const {totalCantidad} = useContext(CartCntext2)
  console.log("cantidad",totalCantidad())
    return(
      <ThemeProvider theme={theme}>
    
            <Link to='/cart' >
     {/*       <div className={classes.icono}> */}
          {/*  <ShoppingCartIcon color="primary" style={{ fontSize: 40 , marginTop:15, marginRight:50}}></ShoppingCartIcon> */}
           <div className={classes.button}>
         
            <IconButton aria-label="show-cart-items" color="inherit">
     <Badge badgeContent={totalCantidad()} color="primary">
       <ShoppingCart fontSize="large" color="primary"/>
       </Badge>
            </IconButton>

          </div>
  {/*    <Badge badgeContent={2} color="secondary">
       <ShoppingCart fontSize="small" color="primary"/>
       </Badge> */}
         
           
             {/* {CartLength() ? <div className="cantidad-de-productos-icon-shop">{CartLength()}</div> : null } */}
      {/*      </div> */}
                
            </Link>
     
    </ThemeProvider>
    )
}

export default CartWidget;