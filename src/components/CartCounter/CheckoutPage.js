import React from 'react';
import {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CheckoutCard from './CheckoutCard';
import { db} from '../../firebase/firebase';
import Total from './Total'
import {collection} from "firebase/firestore";


const useStyles = makeStyles((theme) =>({
    root:{
        flexGrow:1,
        padding:"2rem",
    },
}))
export const CheckoutPage=()=>{
    const classes = useStyles();
   const [items, setItems] = useState([])
   
      useEffect(() => {
  
          
          const itemsCollection = collection(db,'productos')
          const prom = itemsCollection.get()
          prom.then((resultado) =>{
            console.log("se consultaron los datos");
            console.log(resultado);
            if(resultado.size>0){
              console.log("comprobando",resultado.docs);
              setItems(resultado.docs.map(doc=>doc.data()))
            }
          }) 
    
        
        },[]);


    function FormRow(){
        return(
            <React.Fragment>

                {items.map((item)=>(
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                         <CheckoutCard key={item.id } product={item}/>
                    </Grid>
                ))}
            </React.Fragment>
        );

    }

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant='h4'>
                        ShoppingCart
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow/>
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                <Typography align='center' gutterBottom variant='h4'>
                    <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}