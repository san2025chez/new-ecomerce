import  { React } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './ItemCounter.scss'
import Swal from 'sweetalert2'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function ItemCounter({ stock, cantidad,  onAdd ,setQuantity}) {
    // Desarrollar lógica
   

    const increment = () => {
      console.log("verifico stock",stock,cantidad);
     stock > cantidad
     ?
     setQuantity(cantidad+1)
     :
     Swal.fire({
      icon: 'info',
      title: 'No hay más unidades disponibles',
      })
    }
    const decrement = ()=>{
      cantidad > 1
      ? setQuantity(cantidad - 1)
      : Swal.fire({
       icon: 'error',
       title: 'No se puede disminuir más',
       width: '20rem'
       })
    }

  /*   const addHandler = ()=>{
        onAdd(count)
    } */
    const classes = useStyles();
    return (
    <div className={classes.root}>
    <div className="container">
            
            <Button variant="contained" color="secondary" disabled={ cantidad <= 0} onClick={decrement}>-</Button>
            <div>{cantidad}</div>
            <Button variant="contained" color="secondary" onClick={increment}>+</Button>
            <Button variant="contained" color="secondary"  disabled={cantidad === 0}  onClick={onAdd}>Agregar</Button>
          
    </div>
    </div>)
}
