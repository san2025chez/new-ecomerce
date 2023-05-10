import {React} from 'react';
import { useEffect, useState,useContext } from "react";
import {CartCntext2} from "../../context/CartCntext2";

export default function CartCounter({ inicialValue, product }) {
  const [contador, setContador] = useState(0);
  const { handleQuantity  } =useContext(CartCntext2);

  const addToCounter = () => {
    if (contador < 10) {
      setContador((prevContador) => {
        let contador = prevContador + 1;
        handleQuantity(product, contador);
        return contador;
      });
    }
  };

  const substractCounter = () => {
    if (contador > 1) {
      setContador((prevContador) => {
        let contador = prevContador - 1;
        handleQuantity(product, contador);
        return contador;
      });
    }
  };

  useEffect(() => {
    setContador(inicialValue);
  }, [inicialValue]);

  return (
    <>
      <h6 className="cart__cantidad"> {contador} </h6>
      <div className="cart__flechas">
        <i
          className="fas fa-chevron-up cart__flechas--up"
          onClick={addToCounter}></i>
        <i
          className="fas fa-chevron-down cart__flechas--down"
          onClick={substractCounter}></i>
      </div>
    </>
  );
}

