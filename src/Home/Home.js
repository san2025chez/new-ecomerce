import React, { useEffect, useState } from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { APIs } from "../constants/constants.js";
import { Category } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0%',
      padding: '0%',
      padding: theme.spacing(1),
    },
  },
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { categoryName, subcategoryName } = useParams();
  const classes = useStyles();
console.log("name cat",categoryName);
console.log("name sub",subcategoryName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if (categoryName && subcategoryName) {
          console.log("ingreso al primer");
          const categoryResponse = await axios.get(`${APIs.CATEGORY}`);
          console.log("trae",categoryResponse.data);
          const categoryId = categoryResponse.data.id;
          console.log("veo ruta", `${APIs.SUBCATEGORY}/${subcategoryName}`);
          response = await axios.get(`${APIs.SUBCATEGORY}/${subcategoryName}`);
          console.log("subcategory",response.data);
          setItems(response.data.product)
        
        } else if (categoryName) {
          console.log("ingreso al segundo");

          response = await axios.get(`${APIs.CATEGORY}/${categoryName}`);
        } else {
          console.log("ingreso a todos");
          response = await axios.get(APIs.PRODUCTS);
          console.log("datos traido de back en home ",response.data);
          setItems(response.data);
        }

     
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
        setDataLoaded(true);
      }
    };

    if (!dataLoaded) {
      fetchData();
    }
  }, [categoryName, subcategoryName, dataLoaded]);

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
