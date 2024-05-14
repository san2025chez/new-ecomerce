import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { BsPlus, BsEyeFill } from "react-icons/bs";
import './item.scss';
import { useContext } from 'react';
import { CartCntext2 } from '../../context/CartCntext2';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    backgroundColor: 'white',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 0,
    position: 'relative', // Para posicionar los íconos sobre la imagen
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    height: 150,
    width: 150,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // Espacio entre los íconos
    alignItems: 'center',
    paddingRight:'10px',

    padding: theme.spacing(2), // Espaciado entre los iconos y el borde del card


    background: 'rgba(255, 255, 255, 0.8)', 
  },
  icon: {
    margin: theme.spacing(0, 2), // Espacio entre los iconos
    fontSize: 20, // Tamaño de los iconos
    backgroundColor: 'transparent', 
  },
  favoriteIcon: {
    marginBottom: '4px', // Espacio entre los íconos
  },
}));

const Item = ({ product }) => {
  const classes = useStyles();
  const { addItem } = useContext(CartCntext2);

  return (
    <Card className={classes.card}>
      <CardHeader
        disableTypography
        title={<Typography style={{ marginBottom: '0.1rem' }}>{product.name}</Typography>}
      />
      <Link to={`/detalle/${product.id}`}> 
        {product.images[0].url ? (
          <CardMedia
            className={classes.media}
            image={product.images[0].url}
            title="Paella dish"
          />
        ) : (
          <CardMedia
            className={classes.media}
            image={product.images[0]}
            title="Paella dish"
          />
        )}
      </Link>
      <CardMedia>
      <div className={classes.iconContainer}>
        <button onClick={() => addItem(product, product.id)}>
          <FavoriteIcon color="secondary" className={classes.icon}/>
        </button>
        <Link
          to={`/detalle/${product.id}`}
          className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
        >
          <BsEyeFill  className={classes.icon}  />
        </Link>
      </div>
      </CardMedia>
    </Card>
  );
}

export default Item;
