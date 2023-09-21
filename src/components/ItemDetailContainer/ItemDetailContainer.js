import { React } from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetail } from '../ItemDetail/ItemDetail'
import Spinner from '../../components/Spinner/Spinner'
import './ItemDetailContainer.scss'
import { doc, getFirestore, getDoc } from "firebase/firestore";
import axios from 'axios';
import { APIs } from '../../constants/constants'
const ItemDetailContainer = () => {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {

        /* const db = getFirestore();

        const docRef = doc(db, "productos", id);

        getDoc(docRef).then((snapshot) => {
            setProduct(({
                id: snapshot.id,
                ...snapshot.data()
            }))
            setLoading(false)
        }) */


        const rawResponse = async () => {
            try {
             const response= await axios.get(APIs.PRODUCTS + '/' + id)
                console.log(' ONE IDPRODUCT X ID', response.data);
                setProduct(response.data);
                setLoading(false)

            } catch (error) {
                console.error("Error al obtener los datos", error);
            }
        }
        
        rawResponse();
    }, [id])
    console.log("productos item detail conteiner", { ...product });

    return (

        <div>

            {loading ? (<div className="cargando"><Spinner /></div>) : <ItemDetail product={product}></ItemDetail>}
        </div>

    )
}
export default ItemDetailContainer

