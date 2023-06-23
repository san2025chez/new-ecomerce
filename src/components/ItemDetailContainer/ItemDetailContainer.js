import {React} from 'react';
import { useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'

import {ItemDetail } from '../ItemDetail/ItemDetail'
import Spinner from '../../components/Spinner/Spinner'
import './ItemDetailContainer.scss'
import { doc, getFirestore, getDoc } from "firebase/firestore";
const ItemDetailContainer =()=>{
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);
   
    const { id } = useParams();

    useEffect(() => {

        const db = getFirestore();

        const docRef = doc(db, "productos", id);

        getDoc(docRef).then((snapshot) => {
            setProduct(({
                id: snapshot.id,
                ...snapshot.data()
            }))
            setLoading(false)
        })
     
    }, [id])
    console.log("productos item detail conteiner",product);

    return(
        
        <div> 
            
            {loading ? (<div className="cargando"><Spinner/></div>) : <ItemDetail product={product}></ItemDetail> }
        </div>
      
    )
}
export default ItemDetailContainer

