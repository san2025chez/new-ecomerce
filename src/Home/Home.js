import React, { useEffect, useState } from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import 'firebase/firestore'
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APIs } from "../constants/constants.js";
import Item from '../components/carousel/Item';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%', // Ancho completo
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin:'0%',
      padding:'0%',
      padding: theme.spacing(1), // Espaciado para dispositivos móviles
    },
  },
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false); // Nuevo estado para controlar si los datos ya se han cargado

  const { Id, name } = useParams();
  const navigate = useNavigate()

  console.log("el di de categoria", Id);
  console.log("NAME", name);

  useEffect(() => {
    if (!dataLoaded) { // Verificar si los datos ya se han cargado antes de hacer otra llamada
      if (Id) {
        axios.get(APIs.CATEGORY + '/' + Id)
          .then(response => {
            console.log('rawResponse.data ONE ID', response.data[0].product);
            setItems(response?.data[0]?.product);
            setLoading(false);
            setDataLoaded(true); // Marcar los datos como cargados
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        axios.get(APIs.PRODUCTS)
          .then(response => {
            setItems(response.data);
            setLoading(false);
            setDataLoaded(true); // Marcar los datos como cargados
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }, [Id, dataLoaded]);

  console.log("ITEMSSS FILTRADO todos los productos ", items);
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <div id="Home" className="home">
          <Spinner />
        </div>
      ) : (
        <div className={classes.container}>
          <>
            <ItemList items={items} />
          </>
        </div>
      )}
    </>
  );
};
export default Home;
