import {React} from 'react';
import {useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import accounting from "accounting"

const useStyle = makeStyles((theme) => ( {
    root:{
        maxWidth:345,
    },
    action:{
        marginTop: "1rem",
    },
    media:{
        height:0,
        paddingTop:"56.25",
    },
 cardActions:{
     display:"flex",
     justifyContent:"space-between",
     textAlign:"center",
 },
 cardRating:{
     display:"flex",
 },
    expandOpen:{
        transform:"rotate(180deg)",
    },
}));
export const CheckoutCard = ({
    product:{id,productName,price,img,rating}}) => {
        const classes= useStyle();
        const [expanded,setExpanded] = useState(false);
      
        console.log("mi_product",img);
    return (
     <Card className={classes.root}>
         <CardHeader
         action={
             <Typography
             className={classes.action}
             variant='h5'
             color='textSecondary'
             >
                 {accounting.formatMoney(price)}

             </Typography>
         }
         title={productName}subheader='inStock'
         >

         </CardHeader>
         <CardMedia className={classes.media} image={img} title={productName} />
    <CardActions disableSpacing className={classes.actions}>
        <div className={classes.cardRating}>
            {Array(rating)
            .fill()
            .map((_, i) =>(
                <p>&#11088;</p>
            ))}

        </div>
        <IconButton>
            <DeleteIcon fontSize="large"/>
        </IconButton>
    </CardActions>
     </Card>
    );
}

export default CheckoutCard
