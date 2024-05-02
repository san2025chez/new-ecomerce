import React from 'react';
import { useContext } from 'react';
import { CartCntext2 } from '../../context/CartCntext2';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./CartList.scss";
import CartCounter from '../CartCounter/CartCounter';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
  },
}));

export const Cart = () => {
  const { cart, totalCompra, removeItem } = useContext(CartCntext2);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const buttonStyle = {
    borderColor: '#6a1b9a',
    color: '#6a1b9a',
    fontSize: '12px',
    margin: '8px',
    '&:hover': {
      borderColor: '#6a1b9a',
      color: '#6a1b9a',
    },
  };

  function finalizarCompra() {
    let productosParaWsp = cart.map(producto => `- $${producto.name}, $${producto.price}`);
    let productosConFormatoAmigable = productosParaWsp.join('\n');
    productosConFormatoAmigable += ' ' + 'TOTAL' + ' ' + totalCompra();
    window.location.href = 'https://api.whatsapp.com/send?phone=3884299868&text=Me%20interesan%20los%20siguientes%20productos' + ' ' + JSON.stringify(productosConFormatoAmigable);
  }

  // Calcular el total de los precios de los productos
  const totalPrecios = cart.reduce((total, product) => total + parseFloat(product.price), 0);

  return (
    <>
      <Grid container justifyContent="center" style={{ marginTop: "20px", paddingBottom: "10px", minHeight: "50vh" }}>
        <Card sx={{ minWidth: 275 }} container justifyContent="center">
          <CardContent justifyContent="center">

            <div id="CartList" className="cart container">
              {!isMobile &&
                <div className="cart__titulos container">
                  <h6 className="cart__titulos__text">Producto</h6>
                  <h6 className="cart__titulos__text">Descripción</h6>
                  <h6 className="cart__titulos__text">Cantidad</h6>
                  <h6 className="cart__titulos__text">Precio</h6>
                </div>}
              <div>
                {cart.map((product) => (
                  <div key={product.id} className="container cart">
                    <div className="cart__detail container">
                      <div className="cart__img cart__items">
                        <img
                          src={product.images[0].url}
                          alt={`img-${product.id}`}
                          className="cart__img-imagen"
                        />
                      </div>
                      <div className="cart__items">
                        <h5 className="cart__item" style={{ fontSize: '13px' }}> {product.name} </h5>
                      </div>
                      <div className="cart__items">
                        <CartCounter inicialValue={product.quantity} product={product} />
                      </div>
                      <div className="cart__items">
                        <h6 className="cart__precio" style={{ fontSize: isMobile ? '11px' : '15px' }}> {product.price} </h6>
                      </div>
                      <div className="cart__items">
                        <i
                          className="far fa-trash-alt cart__eliminar"
                          onClick={() => removeItem(product.id)}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="container cart">
                    <div className="cart__detail container">
                      <div className="cart__img cart__items">
              
                      </div>
                      <div className="cart__items">
                        <h5 className="cart__item" style={{ fontSize: '13px' }}></h5>
                      </div>
                      <div className="cart__items">
                  <h5>TOTAL</h5>
                      </div>
                      <div className="cart__items">
                        <h6 className="cart__precio" style={{ fontWeight:'bold',fontSize: isMobile ? '14px' : '18px' }}> {totalCompra()} </h6>
                      </div>
                      <div className="cart__items">
                      
                      </div>
                    </div>
                  </div>
            
            </div>

          </CardContent>
     
          <div className="cart__buyButton">
                <Link to='/login'>
                  <Button variant="outlined" style={buttonStyle}>
                    PAGAR CON MERCADO PAGO 
                  </Button>
                </Link>
              </div>
              <div className="cart__buyButton">
                <Button onClick={() => finalizarCompra()} variant="outlined" style={buttonStyle}>
                  REALIZAR PEDIDO POR WHATSSAP
                </Button>
              </div>
          
         
        </Card>
      </Grid>
    </>
  );
}
