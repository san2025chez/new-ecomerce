import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Swal from 'sweetalert2'
import "./login.scss";
import "firebase/firestore";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Textfield from "../FormsUI/Textfield";
import { Formik, Form } from "formik";
import { Container } from "@material-ui/core";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../FormsUI/Button";
import CardContent from '@mui/material/CardContent';

import Card from "@mui/material/Card";



import {
  addDoc, collection, documentId, getDocs, where,
  query, getFirestore, writeBatch
} from 'firebase/firestore'
import { db } from '../../firebase/firebase.js'


import { CartCntext2 } from "../../context/CartCntext2";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 0, 0, 0.1)"
            : "rgb(255 132 132 / 25%)",
      }}
    />
  );
}
const confirm = () => {
  Swal({
    position: "top-end",
    icon: "success",
    title: "Purchase Confirmed",
    showConfirmButton: false,
    timer: 1500,
  });
};
const FORM_VALIDATION = Yup.object().shape({
  //dni: Yup.number().min(8).required('Required').positive().integer()


  phone: Yup.number()
    .test(
      "len",
      "Must be exactly 11 characters",
      (val) => val && val.toString().length === 11
    )
    .required("Required")
    .typeError("Please enter a valid dni number"),

  name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, "Only alphabets are allowed for this field "),
  surname: Yup.string()
    .required("Required")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, "Only alphabets are allowed for this field "),


});

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    /* marginLeft:theme.spacing(1), */
    marginBottom: theme.spacing(8),
  },
  cardsize: {
    maxWidth: 800,
    margin: '0 auto',
    marginTop:'30px'
  },
  buttonStyle:{
    width: '10px'

  }
}));



export default function Login() {
  const classes = useStyles();
  const [captchaValido, setcaptchaValido] = useState(null);
  let navigate = useNavigate();
  const { cart, clear, totalPrice } = useContext(CartCntext2);
  const [user, setUser] = useState({
    name:'',
    surname:'',
    phone:''

  });
  const captcha = React.createRef();
  const onChange = () => {
    let valor = captcha.current.getValue();
    return valor;
    console.log("ingreso captcha", valor);
  };

  const crearOrden = async () => {
    const db = getFirestore();

    const newOrder = {
      buyer: user,
      item: [{ ...cart }],
      total: totalPrice(),
    };

    ;
    const batch = writeBatch(db);

    const orderRef = collection(db, "orders");
    const productosRef = collection(db, "productos");
    const q = query(
      productosRef,
      where(
        documentId(),
        "in",
        cart.map((el) => el.id)
      )
    );

    const outOfStock = [];

    const productos = await getDocs(q);

    productos.docs.forEach((doc) => {
      const itemToUpdate = cart.find((prod) => prod.id === doc.id);
      if (doc.data().stock >= itemToUpdate.quantity) {
        batch.update(doc.ref, {
          stock: doc.data().stock - itemToUpdate.quantity,
        });
      } else {
        outOfStock.push(itemToUpdate);
      }
    });

    if (outOfStock.length === 0) {
      addDoc(orderRef, newOrder).then((res) => {
        batch.commit();

        Swal.fire({
          icon: "success",
          title: "su orden se creo con exito",
          text: `Su numero de oden es: ${res.id}`,
        }).then((result)=>{
        if (result.isConfirmed) {
          console.log("ingreso")
          restartForm(INITIAL_FORM_STATE);
          clear();
        }
     // restartForm(INITIAL_FORM_STATE)
        // window.location.reload();
     

        })
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "No hay stock de los siguientes productos:",
        text: outOfStock.map((el) => el.name).join(","),
      });
    }
   // restartForm();
  };
 

  const capturoDatos = (event) => {
    console.log(event);
    setUser({
      ...user,
      [event]: event,
    });

    crearOrden();
  
  };


  const INITIAL_FORM_STATE = {
    name: "",
    surname: "",
    phone: "",

  };

  const sendDatos = (event) => {
    event.preventDefault();
    console.log("USER", user);
  };

const restartForm=(initial)=>{
  console.log("ingresgggo",initial);
  setUser(
initial
  )
 window.location.reload();
  console.log("user",user);
}

  return (

    <Grid container justifyContent="center"  alignItems="center" marginTop="50px">
      <Grid item xs={12} sm={6} md={8} lg={6}>
      <Card className={classes.cardsize}>
  <CardContent>
        <Container>
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...(INITIAL_FORM_STATE || ""),
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values ) =>{
                capturoDatos(values);
              /*   restartForm({
                  ...(INITIAL_FORM_STATE || ""),
                }); */
              }
           
                //(values) => capturoDatos(values)
              }
            >
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Textfield
                      name="name"
                      label="Nombre"
                      placeholder="nombre"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="surname"
                      label="Apellido"
                      placeholder="Apellido"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="phone"
                      label="Telefono"
                      placeholder="Telefono"
                    />
                  </Grid>
                  <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <br />
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6LfbvywfAAAAACW_yrnaJlDXk6ajACCQ3_DVSGIa"
                      onChange={onChange}
                    />
                    <br />
                  </div>

                  <Grid item xs={12} sm={6} md={8} lg={6}  style={{ marginLeft: "auto", marginRight: "auto" }} >
                    <Button  size="medium" >Finalizar Compra</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
        </CardContent>
</Card>
      </Grid>

    </Grid>

  )
}
