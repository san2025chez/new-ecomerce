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
   /*    backgroundColor: "#6a1b9a",
      color: 'white', */
      padding: '2px',
      fontSize: '1.5rem', // Ajusta el tamaño de la fuente
      width: '100%', // Ajusta el ancho del botón
      height: '50px', // Ajusta la altura del botón
      borderRadius: '10px', 
      fontSize: '12px',
      display: 'flex', // Habilita el diseño flexible para el botón
      justifyContent: 'center', // Centra horizontalmente el contenido del botón
      alignItems: 'center', 
      border: 'solid 3px red'
    
    };
    const cellStyles = {
      padding: '0px', // Elimina el relleno interno
      textAlign: 'center',
  

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flex', // Habilita el diseño flexible para la celda
  justifyContent: 'center', // Centra horizontalmente el contenido de la celda
  alignItems: 'center', // Centra verticalmente el contenido de la celda
   
    };

    const cellStyles1 = {
      padding: '4px',
   
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
    <div style={{border:'none'}}>
         <Container maxWidth="lg">
      <TableContainer  style={tableStyles}>
        <Table >
     
          <TableBody>
            <TableRow  style={rowStyles}>
              <TableCell   style={{...cellStyles,width: '60%'}}> <Button size="medium"  style={ buttonStyle}  disabled={ cantidad <= 0} onClick={decrement}>-</Button></TableCell>
              <TableCell  style={{...cellStyles,width:'60%'}}>     {cantidad}</TableCell>
              <TableCell  style={{...cellStyles,width: '60%'}}> <Button size="medium" style={ buttonStyle} onClick={increment}>+</Button></TableCell>
            </TableRow>
            <TableRow >
<TableCell style={{ overflowX: 'hidden', borderBottom: 'none' }}/>
              <TableCell  colSpan={3} style={{ ...cellStyles1, justifyContent: 'center',overflowX: 'hidden' }}> <Button  style={centeredButtonStyle} disabled={cantidad === 0}  onClick={onAdd}>Añadir</Button></TableCell>
           
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
      
    </div>)
}
