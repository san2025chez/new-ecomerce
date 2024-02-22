import  { React } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './ItemCounter.scss'
import Swal from 'sweetalert2'
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function ItemCounter({ stock, cantidad,  onAdd ,setQuantity}) {
    // Desarrollar lógica
   
    const buttonStyle = {
      fontSize: '1.5rem',
      width: '30%',
      height: '50px',
      borderRadius: '10px',
    };
    
    const cellStyles = {
      padding: '0px',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    
    const centeredButtonStyle = {
      fontSize: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
    };

    const tableStyles = {
      width: 'auto', // Ajusta el ancho de la tabla
      margin: '0', // Elimina los márgenes externos
      fontSize: '11px', // Ajusta el tamaño de fuente para hacer la tabla más pequeña
      maxWidth: '100%', // Evita que la tabla se desborde del contenedor
  overflowX: 'auto',
  border: 'none', // Quita los bordes de la tabla
    };

    const rowStyles = {
      border: '1px solid #ccc', // Estilo de borde
    };
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
      <div style={{ border: 'none' }}>
        <Container maxWidth="lg">
          <TableContainer style={tableStyles}>
            <Table>
              <TableBody>
                <TableRow style={rowStyles}>
                  <TableCell style={{ ...cellStyles, width: '30%' }}>
                    <Button size="medium" style={buttonStyle} disabled={cantidad <= 0} onClick={decrement}>-</Button>
                  </TableCell>
                  <TableCell style={{ ...cellStyles, width: '30%' }}>{cantidad}</TableCell>
                  <TableCell style={{ ...cellStyles, width: '30%' }}>
                    <Button size="medium" style={buttonStyle} onClick={increment}>+</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: 'none' }} colSpan={3}>
                    <Button style={centeredButtonStyle} disabled={cantidad === 0} onClick={onAdd}>Añadir</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    );
}
