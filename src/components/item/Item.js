import {Link} from 'react-router-dom'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import numeral from 'numeral';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {AddShoppingCart} from '@material-ui/icons'
import accounting from'accounting'
import './item.scss'

const useStyles = makeStyles((theme) => ({
 
  root: {
    maxWidth: 345,
    backgroundColor: 'white', //[500],

    
  },
  action:{
      marginTop:"1rem",

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    height: 150,
    width:150,





 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'white',
  },
  mimargen:{
    marginTop: "3rem",
    
 
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      width: 180,
      height:260,
    },
    [theme.breakpoints.down('xs')]: {
      width: 180,
      height:260,
    
    },
 
    margin:'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    borderRadius: 0, // Configuramos el radio del borde a 0 para que sea cuadrado
   // boxShadow: 'none', // Esto quitará la sombr
 
  },

}));
const Item =({product}) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return(
    
        
       

      <Card className={classes.card}  >
 
       <Link to={`/detalle/${ product.id }`}> 
       {
        product.images[0].url ?
        <CardMedia
        className={classes.media}
        image={product.images[0].url}

        title="Paella dish"
      />
      : 
      <CardMedia
      className={classes.media}
      image={product.images[0]}

      title="Paella dish"
    />

       }</Link>
       <Link to={`/detalle/${ product.id }`}> </Link>
      <CardHeader
    
    disableTypography
    
    title={<Typography variant="body2" color="black">{product.name}</Typography>}
    subheader={
      <>
        <div style={{ marginBottom: '0.5rem' }}></div> {/* Espacio entre el título y el subencabezado */}
        <Typography style={{ marginBottom: '0.1rem' }}>
          ${numeral(product.price).format(`0.0,0`)}
        </Typography>
      </>
    }       

      />

    </Card>


  
 
    )
}

export default Item
