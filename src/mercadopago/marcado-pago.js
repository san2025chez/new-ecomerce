import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { APIs } from '../constants/constants';
import { useContext } from 'react'
import { CartCntext2 } from '../context/CartCntext2'
import { Typography, Container, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CartCounter from '../components/CartCounter/CartCounter'
import swal from 'sweetalert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom'

import "./mercadopago.scss";




import axios from 'axios'
import Spinner from '../components/Spinner/Spinner';

const FORM_ID = 'payment-form';

export default function Product() {
  const { state } = useLocation();


  console.log(state.user);
  console.log("orden para enviar back",state.nroorden);

  const { id } = useParams(); // id de producto
  const [preferenceId, setPreferenceId] = useState(null);
  const { cart, totalCompra ,clear} = useContext(CartCntext2);
  const [url, setUrl] = useState('')

  console.log("USUARIO QUE LLEGAN", state.user);

  const data = {
    cart: cart,
    user: state.user,
    orden: state.nroorden
  }

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    console.log("ENVIO A BACK", cart);
    axios.post(APIs.MERCADOPAGO, data).then((order) => {
      console.log("ORDEN", order);
      /*  setPreferenceId(order.data.id); */
      setUrl(order.data.init_point)
    });
  }, []);
  console.log("PREFERENCEID", preferenceId);
  const redirectToUrl = async() => {
  

   window.location.href = url;
   console.log("VEo valor de redirect",window.location.href);
     if ( window.location.href ===  url)
      {
      clear()
     }
  
    
  }

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);

  return (
    <>
{
  url 
  ?
  <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {cart? 
  <Grid container justifyContent="center" style={{ marginTop: "20px",paddingBottom: "10px"}}>
  <Card sx={{ minWidth: 275 }} container justifyContent="center">
  <CardContent justifyContent="center">

<div id="CartList" className="cart container">
<div className="cart__titulos container">
  <h6 className="cart__titulos__text">Producto</h6>
  <h6 className="cart__titulos__text"></h6>
  <h6 className="cart__titulos__text">Descripción</h6>
  <h6 className="cart__titulos__text"></h6>
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
       <div></div>
       <div className="cart__items">
         <h5 className="cart__item"> {product.productName} </h5>
       </div>
    <div></div>
  

       <div className="cart__items">
         <h6 className="cart__precio"> {product.price} </h6>
       </div>
      
     </div>
   </div>  
  )) }  </div>
<div className="cart__buyTotal container">
  <h5 className="cart__buyTotal__title ">
    Total{" "}
    <span className="cart__buyTotal__title--bold">${totalCompra()}</span>
  </h5>


</div>
</div>
</CardContent>
 </Card>
 </Grid>

:
<h3>no hay productos en su carrito</h3>}
    <div >
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={redirectToUrl}
        style={{ marginTop: '30px' }}
      >
        Pagar con Mercado Pago
      </Button>

     <Link to='https://wa.me/5493884299868'> <Button
        variant="contained"
        color="primary"
        size="large"
     
       
        style={{ marginTop: '30px' }}
      >pagar con efectivo
      </Button>
      </Link>
    </div>
  </div>

</Container>
 :
 <div className="home">
 <Spinner />
</div>
}


    </>
  );
}