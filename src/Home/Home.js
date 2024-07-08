import React, { useEffect, useState, useRef } from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import 'firebase/firestore';
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { APIs } from "../constants/constants.js";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%', // Ancho completo
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0%',
      padding: theme.spacing(1), // Espaciado para dispositivos móviles
    },
  },
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Id } = useParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (Id) {
      axios.get(APIs.CATEGORY + '/' + Id)
        .then(response => {
          setItems(response?.data[0]?.product);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      if (isFirstRender.current) {
        axios.get(APIs.PRODUCTS)
          .then(response => {
            setItems(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
        
        isFirstRender.current = false; // Marcar la primera renderización como completa
      }
    }
  }, [Id]);

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
          <ItemList items={items} />
        </div>
      )}
    </>
  );
};

export default Home;
