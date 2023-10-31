import { useEffect, useState ,React} from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import 'firebase/firestore'
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APIs } from "../constants/constants.js";
import Item from '../components/carousel/Item';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%', // Ancho completo
 // Espaciado por defecto
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

  const {Id, name} = useParams();
  const navigate = useNavigate()

console.log("el di de categoria", Id);
console.log("NAME",name);

  useEffect(() => {
  /*   const rawResponse =  axios.get(APIs.PRODUCTS)
    .then(response => {
      console.log("data obtenida",response.data);
      setItems(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    console.log(rawResponse); */
//const db = getFirestore();



    //const itemCollection = collection(db,"productos");
 


    if (Id) { 
      const rawResponse = axios.get(APIs.CATEGORY + '/' + Id)
      .then(response =>{
        console.log('rawResponse.data ONE ID', response.data[0].product);
        setItems(response?.data[0]?.product);
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
      });
       
  
  } else {

      console.log("ingreso aqui");
      const rawResponse =  axios.get(APIs.PRODUCTS)
      .then(response => {
        setItems(response.data);
        setLoading(false)
      } )
      .catch(error => {
        console.error(error);
      });
    }
  }, [Id]);




console.log("ITEMSSS FILTRADO todos los productos ",items);
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <div id="Home" className="home">
          <Spinner />
        </div>
      ) : (
        <div  className={classes.container}>
          <>
            <ItemList items={items} />
          </>
        </div>
      )}
    </>
  );
};
export default Home;
