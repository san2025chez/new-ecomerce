import { useEffect, useState ,React} from "react";
import { ItemList } from "../ItemList/ItemList";
import 'firebase/firestore'
import Spinner from "../Spinner/Spinner";
import "./Home.scss";
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APIs } from "../../constants/constants";
import Item from '../../components/carousel/Item'
/* import Item from '../components/carousel/Item'; */

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

const Search = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([])

  const {name} = useParams();
  const navigate = useNavigate()

console.log("el di de categoria", name);
console.log("veo ruta", APIs.PRODUCTS + '/' + name);
  useEffect(() => {
    const rawResponse = async () => {

    try {
      const response=await  axios.get(APIs.PRODUCTS + '/' + name)
         console.log(' ONE IDPRODUCT X ID', response.data);
         setProduct(response.data);
         setLoading(false)

     } catch (error) {
         console.error("Error al obtener los datos", error);
     }
    }
    rawResponse()
  }, [name]);




console.log("ITEMSSS FILTRADO todos los productos ",product);
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
            <ItemList items={product} />
          </>
        </div>
      )}
    </>
  );
};
export default Search;
