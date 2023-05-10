import { createContext, useEffect } from "react";
import { useLocalStorage } from "../components/useLocalStorage/useLocalStorage";
export const CartContext = createContext([]);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  
  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const CartLength = () => {
    return cart.reduce((prev, next) => {
      return prev + next.quantity;
    }, 0);
  };

  
  const CartPrice = () => {
    return cart.reduce((prev, next) => {
      return prev + next.quantity * next.price;
    }, 0);
  };

  const addItem = (newItem, newQuantity) => {
    if (isInCart(newItem.id) === -1) {
      setCart([...cart, { item: newItem, quantity: newQuantity }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { item: newItem, quantity: newQuantity }])
      );

      console.log(
        JSON.stringify([...cart, { item: newItem, quantity: newQuantity }])
      );
    } else {
      const { quantity } = cart.find((e) => e.item.id === newItem.id);
      const newCart = cart.filter((e) => e.item.id !== newItem.id);
      setCart([
        ...newCart,
        { item: newItem, quantity: quantity + newQuantity },
      ]);
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...newCart,
          { item: newItem, quantity: quantity + newQuantity },
        ])
      );
    }
  };
  const removeItem = (itemId) => {
    const newCart = cart.filter((e) => e.item.id !== itemId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const clear = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };
  const isInCart = (id) => {
    if (cart) {
      console.log("Esta en cart?", cart);
      return cart.findIndex((e) => e.item.id === id);
    } else {
      return null;
    }
  };
  const totalPrice = () => {
    return cart.reduce(
      (acc, product) => (acc += product?.quantity * product.item?.price),
      0
    );
  };

  const handleQuantity = (product, quantity) => {
    product.quantity = quantity;
    setCart([...cart]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        handleQuantity,
        removeItem,
        clear,
        isInCart,
        CartLength,
        totalPrice,
        CartPrice,
      }}
    >
      {children}e
    </CartContext.Provider>
  );
};

export default CartContext;
