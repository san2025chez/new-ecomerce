import {React} from 'react';
import {useContext} from 'react'
import {CartCntext2} from '../../context/CartCntext2'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./CartList.scss";
import CartCounter from '../CartCounter/CartCounter'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  centerDiv: {
    display: 'flex',
   // justifyContent: 'center', // Centrar horizontalmente
    alignItems: 'center',     // Centrar verticalmente
    height: '100vh',          // Opcional: establece una altura para que el div se centre en la pantalla
  },
}));
export const Cart=()=>{


    const {cart,totalCompra,removeItem} = useContext(CartCntext2);

    const buttonStyle = {
       //  backgroundColor: "#6a1b9a",
  borderColor: '#6a1b9a',
  color: '#6a1b9a',
  fontSize: '12px',
  margin: '8px',
  '&:hover': {
    borderColor: '#6a1b9a', // Cambia esto al color deseado para el hover
   // backgroundColor: '#yourDesiredHoverBackgroundColor', // Cambia esto al color deseado para el fondo en hover
    color: '#6a1b9a', // Cambia esto al color deseado para el texto en hover
  },
    
    };


console.log("CART en cart",cart);


const classes = useStyles();
return(
 (cart.length ==!0) ? 
   <>
   
     <Grid container justifyContent="center" style={{ marginTop: "20px",paddingBottom: "10px"}}>
     <Card sx={{ minWidth: 275 }} container justifyContent="center">
     <CardContent justifyContent="center">
   
   <div id="CartList" className="cart container">
   <div className="cart__titulos container">
     <h6 className="cart__titulos__text">Producto</h6>
     <h6 className="cart__titulos__text">Descripción</h6>
     <h6 className="cart__titulos__text">Cantidad</h6>
     <h6 className="cart__titulos__text">Precio</h6>
   </div>
   <div>
     {cart.map((product) => (
        <div  key={product.id} className="container cart">
        <div className="cart__detail container">
          <div className="cart__img cart__items">
            <img
              src={product.img}
              alt={`img-${product.id}`}
              className="cart__img-imagen"
            />
          </div>
          <div className="cart__items">
            <h5 className="cart__item"> {product.productName} </h5>
          </div>
          <div className="cart__items">
            <CartCounter inicialValue={product.quantity} product={product} />
          </div>
          <div className="cart__items">
            <h6 className="cart__precio"> {product.price} </h6>
          </div>
          <div className="cart__items">
            <i
              className="far fa-trash-alt cart__eliminar"
              onClick={() => removeItem(product.id)}></i>
          </div>
        </div>
      </div>  
     )) }  </div>
   <div className="cart__buyTotal container">
     <h5 className="cart__buyTotal__title ">
       Total{" "}
       <span className="cart__buyTotal__title--bold">${totalCompra()}</span>
     </h5>
     <Link to='/login'><Button  variant="outlined"  style={buttonStyle}  /*  onClick={handleCheckout} */
       /* className={"button__agregar"} */
       content={"Comprar"}>
         COMPRAR
     </Button></Link>
   
   </div>
   </div>
   </CardContent>
    </Card>
    </Grid>
   
   
   
   </>
  

:
<><h5>No hay productos</h5></>



)

}