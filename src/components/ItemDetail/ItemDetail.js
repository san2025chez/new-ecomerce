import {React} from 'react';
import {useState,useContext} from 'react'
import {CartCntext2} from '../../context/CartCntext2'
import { ItemCounter} from '../ItemCounter/ItemCounter'
import {Link} from 'react-router-dom'
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {Grid} from '@material-ui/core';
import './ItemDetail.scss' 
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    mimargen:{
      marginTop: "3rem",
    
      
   
    }
  }));
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
export const ItemDetail=({product})=>{
  const classes = useStyles();
  console.log("item detail");
    console.log("producto para cart",{...product});
   

  
    const {cart,addItem,isInCart,handleQuantity} = useContext(CartCntext2);
    const [quantity, setQuantity] = useState(0)
    const cartCount = (quantity)=>{
      if (quantity) {
      console.log("verifico cart en detail",cart[0]);
        let indexItem = cart.findIndex((cartItem) => (cartItem.id=== product.id));
        if (indexItem !== -1){
           quantity=quantity;
        };
       return quantity
      }else{
        return null;
      }
    
      
    }
 
    
    const handleCounter=() =>{
      if(quantity>=0){
     
        
       
        addItem(product)
        handleQuantity(product,quantity)
        setQuantity(quantity)
        addItem(product)
        console.log("cantidad en item detail",product);
      }
   
    }
   
    return(
      <Card className={classes.mimargen}  justifyContent="center" >
      <Container>
      <Grid container  justifyContent="center" >
    
    
        <Grid item  xs={12} sm={6} md={4} lg={3}  >
        <img 
          className="item__img"
          src={product.img}
          alt={`img-${product.id}`}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
        <div className="item__detail">
          <div className="item__txt">
            <p className="item__titulo">{product.productName} </p>
            <p className="item__precio">{product.price} </p>
          </div>

          <div>
                  { !isInCart(product.id)?
                  <div>
                   <ItemCounter
                      
                         /* 🔹Consumiendo el max desde itemCount. Los valores de cantidad también */
                     
                    stock={product.stock} 
                    cantidad={quantity} 
                    onAdd={handleCounter}
                    setQuantity={setQuantity} />
                        
                        <div className="mibotom">
                        <h4>Tenes {cartCount(quantity)} productos en el carrito</h4>
                        <Link to='/cart'><Button variant="contained" color="secondary">Terminar compra</Button></Link>
                        <br/>
                        </div>
                      
                   </div>:
                   <>
                    <br/>
                   <Link to='/cart'><Button variant="contained" color="secondary">Terminar compra</Button></Link>
                   </>
                   
                  }
          </div> 
       </div> 
        </Grid>
      </Grid>
      </Container>
    </Card>

    )
}