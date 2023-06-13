import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { APIs } from '../constants/constants';
import { useContext } from 'react'
import { CartCntext2 } from '../context/CartCntext2'
import { Typography, Container, Grid } from '@material-ui/core';
import { Link } from '@material-ui/icons';
import { Button } from '@material-ui/core';


import axios from 'axios'
import Spinner from '../components/Spinner/Spinner';

const FORM_ID = 'payment-form';

export default function Product() {
  const { state } = useLocation();

  console.log(state.user);

  const { id } = useParams(); // id de producto
  const [preferenceId, setPreferenceId] = useState(null);
  const { cart, totalCompra } = useContext(CartCntext2);
  const [url, setUrl] = useState('')

  console.log("USUARIO QUE LLEGAN", state.user);

  const data = {
    cart: cart,
    user: state.user
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
  const redirectToUrl = () => {
    url ?

      window.location.href = url
      :
      <Spinner></Spinner>
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


      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenido a Mi Tienda
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Realiza tu pago de manera segura con Mercado Pago
          </Typography>
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
          </div>
        </div>

      </Container>

    </>
  );
}