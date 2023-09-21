import React from 'react';
import Item from '../item/Item'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '30px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    gridItem: {
      padding: theme.spacing(2), // Espaciado por defecto
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5),
        paddingLeft: '0px',
        paddingRight:0 ,
        marginLeft: '0px'// Espaciado para dispositivos móviles
      },
    },
  }));

export const ItemList = ({items}) => {
    const classes = useStyles();
    console.log("ESTOY EN ITEMLIST",items);

    return(
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.cardContainer}>
          {
            items.map(product => (
              <Grid item  key={product?.id} xs={6} sm={6} md={4} lg={3}  className={classes.gridItem}>
           <Item key={product?.id} product={product} />
      
              </Grid>

            ))
          }

        </Grid>
      </div>
    
    )

}
