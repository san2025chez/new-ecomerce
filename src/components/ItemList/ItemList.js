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
  }));

export const ItemList = ({items}) => {
    const classes = useStyles();
    console.log("items en itemslist",items);

    return(
      <div className={classes.root}>
        <Grid container spacing={2}>
          {
            items.map(product => (
              <Grid item xs={12} sm={2} md={4} lg={3}>
           <Item key={product?.id} product={product} />
      
              </Grid>

            ))
          }

        </Grid>
      </div>
    
    )

}
