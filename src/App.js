import "./App.css";
import React from "react";
import Home from "./Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartContext2 } from "./context/CartCntext2";
import { Cart } from "./components/Cart/Cart";
import NavBar from "./components/NavBar1/NavBar";
import WhatsApp from "./components/WhatsApp/WhatsApp";
import Footer from "./components/Footer/Footer";
import { CheckoutPage } from "./components/CartCounter/CheckoutPage";
import Login from "./components/Login/login";
import { ThemeProvider } from "@material-ui/core/styles";
import "@fontsource/roboto";
import { StyledEngineProvider } from "@mui/material/styles";
import Carousel1 from "./components/carousel/Carousel1"

function App() {
  console.log(process.env.PUBLIC_URL);
  return (
    <div>
      <CartContext2>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
       
            <NavBar></NavBar>{" "}
       
          <Routes>
            <Route path="/" element={<Carousel1 />} />

            <Route exact path="/categoria/:Id" element={<Home />} />

            <Route
              exact
              path="/detalle/:id"
              element={<ItemDetailContainer />}
            />

            <Route path="/cart" element={ <Cart />}/>
            <Route path="/login" element={   <Login />}/>
            
            <Route path="/checkout-page" element={   <CheckoutPage />}/>
          
          </Routes>

          <WhatsApp/>
          <ThemeProvider>
       
            <Footer />
     
          </ThemeProvider>
        </BrowserRouter>
      </CartContext2>
    </div>
  );
}

export default App;
