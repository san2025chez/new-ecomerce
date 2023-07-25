import { useEffect, useState ,React} from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import 'firebase/firestore'
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
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

  const {Id} = useParams();

  console.log("CATEGORIA",Id);

  useEffect(() => {

const db = getFirestore();



    const itemCollection = collection(db,"productos");



    if (Id) {
      const itemQuery = query(itemCollection, where('categoria', '==', Id));
      getDocs(itemQuery).then((snapshot) => {
          setItems(snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id
          })))
          setLoading(false)
      })
  } else {
      getDocs(itemCollection).then((snapshot) => {
          setItems(snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id
          })))
          setLoading(false)
      })
    }
  }, [Id]);



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
