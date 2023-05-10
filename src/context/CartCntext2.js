import React, {createContext,useState} from 'react'
export const CartCntext2 = createContext()

export const CartContext2 = ({ children}) => {

const [cart,setCart] = useState([])

const addItem= (item) =>{
    setCart([...cart,item])
}

const removeItem=(id) =>{
    setCart(cart.filter(prod => prod.id !==id))
}
const clear=( )=> {
    setCart([])
}

const totalPrice =() =>{
console.log("cart",cart);
    return cart.reduce((acc,prod) => acc + prod.quantity,0)
}

const isInCart =(id) =>{
    return cart.some(prod => prod.id ===id)
}

const CartLength = () => {
    console.log("ver cantidad",cart.length)
    return cart.reduce((prev, next) => 
      prev + next.quantity , 0);
  };
  const handleQuantity = (product, quantity) => {
    product.quantity = quantity;
    setCart([...cart]);
  };
  const totalCantidad = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity,0)
  }

  const totalCompra = () => {
      return cart.reduce((acc,prod)=> acc + prod.quantity * prod.price,0)
  }
console.log(totalCompra());

    return (
       <CartCntext2.Provider  value={{ 
           cart,
           addItem,
           removeItem,
           clear,
           totalPrice,
           isInCart,
           CartLength,
           handleQuantity,
           totalCantidad,
           totalCompra

       }}>
{children}
       </CartCntext2.Provider>
    )
}
