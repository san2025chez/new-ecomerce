import "./App.css";
import React from "react";
import Home from "./Home/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartContext2 } from "./context/CartCntext2";
import { Cart } from "./components/Cart/Cart";
import NavBar from "./components/NavBar1/NavBar";
import WhatsApp from "./components/WhatsApp/WhatsApp";
import Footer from "./components/Footer/Footer";
import { CheckoutPage } from "./components/CartCounter/CheckoutPage";
import Login from "./components/Login/login";
import Product from './mercadopago/marcado-pago'
import "@fontsource/roboto";
import { StyledEngineProvider } from "@mui/material/styles";
import Carousel1 from "./components/carousel/Carousel1"
import Search from "./components/Search/Search"
import ThemeProvider from "./components/ItemDetail/theme/ThemeProvider";
function App() {

  return (
    <div>
      <CartContext2>
      <HashRouter> 
      <ThemeProvider>
            <NavBar></NavBar>{" "}
       
          <Routes>
            <Route path="/" element={<Carousel1 />} />

            <Route exact path="/categoria/:Id" element={<Home />} />

            <Route exact path="/search/:name" element={<Search />} />
            <Route
              exact
              path="/detalle/:id"
              element={<ItemDetailContainer />}
            />
            

            <Route path="/cart" element={ <Cart />}/>
            <Route path="/login" element={   <Login />}/>
            <Route path="/pay" element={   <Product />}/>
            <Route path="/whatsapp" element={      <WhatsApp/>}/>
            <Route path="/checkout-page" element={   <CheckoutPage />}/>
          
          </Routes>

          <WhatsApp/>
       
       
            <Footer />
            </ThemeProvider>
            </HashRouter>
      </CartContext2>
    </div>
  );
}

export default App;
