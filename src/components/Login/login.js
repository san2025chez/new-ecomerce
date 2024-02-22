import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Swal from 'sweetalert2'
import "./login.scss";
import "firebase/firestore";
import swal from "sweetalert";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Textfield from "../FormsUI/Textfield";
import { Formik, Form } from "formik";
import { Container } from "@material-ui/core";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../FormsUI/Button";
import CardContent from '@mui/material/CardContent';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Product from '../../mercadopago/marcado-pago'
import Card from "@mui/material/Card";
import SendIcon from '@mui/icons-material/Send';
import {
  addDoc, collection, documentId, getDocs, where,
  query, getFirestore, writeBatch
} from 'firebase/firestore'
import { db } from '../../firebase/firebase.js'
import { CartCntext2 } from "../../context/CartCntext2";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { APIs } from '../../constants/constants'

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
      "Phone number example: 387233456, debe contener 10 digitos",
      (val) => val && val.toString().length === 10
    )
    .required("Required")
    .typeError("Please enter a valid phone number example: 387233456"),

  name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, "Only alphabets are allowed for this field "),

  email: Yup.string()
    .required("Required")
    .email("Invalid email format"),
/*   password: Yup.string()
    .required("Required")
      .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ), */


  surname: Yup.string()
    .required("Required")
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, "Only alphabets are allowed for this field "),
  barrio: Yup.string()

    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, "Only alphabets are allowed for this field "),
  calle: Yup.string()

    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, "Only alphabets are allowed for this field "),
  localidad: Yup.string()

    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/, "Only alphabets are allowed for this field "),

  numero: Yup.number()


    .typeError("Please enter a valide home number"),
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
    marginTop: '30px'
  },
  buttonStyle: {
    width: '10px'

  }
}));



export default function Login() {
  const location = useLocation();

  console.log(location.pathname); // Ruta actual
  console.log(location.search);
  const classes = useStyles();
  const [botonSeleccionado, setBotonSeleccionado] = useState(false);

  const handleSeleccionarBoton = () => {
    setBotonSeleccionado(true);
  };
  const [captchaValido, setcaptchaValido] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [nroorden, setNroorden] = useState('')
  let navigate = useNavigate();
  const { cart, clear, totalPrice } = useContext(CartCntext2);
  const [orden, setOrden] = useState({})
  const [user, setUser] = useState({
    name: '',
    surname: '',
    phone: '',
    password: '',
    email: '',
    barrio: '',
    calle: '',
    localidad: '',
    numero: ''

  });

  const [validation, setValidation] = useState(false)
  const [purchaseId, setPurchaseId] = useState({})
  const [shipment, setShipment] = React.useState('local');

  const handleChange = (event) => {
    setShipment((event.target).value);
  };



  const captcha = React.createRef();
  const onChange = () => {
    let valor = captcha.current.getValue();
    return valor;
    console.log("ingreso captcha", valor);
  };

  function handleClick() {
    setLoading(true);
  }

  console.log("veo lo QUE CONTIENE CART", cart);
  var total = 0;
  var cartIdProduct = [];
  var cartQuantityProduct = []
  for (let i = 0; i < cart.length; i++) {
    cartIdProduct.push(cart[i].id)
    cartQuantityProduct.push(cart[i].quantity)
    total = total + (cart[i].quantity * cart[i].price)

  }
  console.log("veo lista de cart", cartIdProduct);
  console.log("cart de quantity", cartQuantityProduct);
  console.log("total", total);
  console.log("datos a enviar de USER", user);

  const crearOrden = async (values, cart, totalPrice) => {

    let userpost = { ...values }

    console.log("VALORES QUE LLEGAN", userpost);
    setUser({
      ...values
    })
  userpost.password="Ggg2023*"
    axios.post(APIs.USERS, userpost)
      .then((users) => {
        console.log("lo que se devuelve al crear USER del formulario", users);

        setUser(users.data)
        let datapurchase = {
          product:  cartIdProduct,
          quantity: cartQuantityProduct,
          total: total,
          user: users.data
        }

        console.log("LO QUE  ENVIO PARA CREAR Purchase", datapurchase);
        axios.post(APIs.PURCHASE, datapurchase).then((purchase) => {
          console.log("DEVUELVE PURCHASE", purchase);
          setPurchaseId(purchase.data)
          setValidation(true)

        })
          .catch(error => {
            console.error('Error:', error);
          });;


      });




  };
  console.log("CARGADO", orden);
  console.log("PURCHASEID", purchaseId);



  const INITIAL_FORM_STATE = {
    name: "",
    surname: "",
    phone: "",
    password: '',
    email: "",
    calle: "",
    barrio: "",
    numero: "",
    localidad: ""

  };

  const sendDatos = (event) => {
    event.preventDefault();
    console.log("USER", user);
  };


  const buttonStyle = {
    backgroundColor: "#6a1b9a",
    color: 'white',

  };
  return (
    <>
      {
        (cart.length === 0 && !validation)
          ? <Navigate to="/" />
          :

          <Grid container justifyContent="center" alignItems="center" marginTop="50px">
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
                        onSubmit={(values) => {
                          crearOrden(values, cart, totalPrice, clear)
                          //setUser({ ...values })
                          console.log("lo que submiteo", values);
                        }

                          //(values) => capturoDatos(values)
                        }
                      >
                        {(formik) => (
                          <Form onSubmit={formik.handleSubmit}>
                            <Grid container justify="center" alignItems="center" spacing={2}>
                              <Grid item xs={12}>
                                <Textfield
                                  onChange={formik.handleChange}
                                  name="name"
                                  label="Nombre"
                                  values={formik.values.name}
                                  placeholder="nombre"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Textfield
                                  name="surname"
                                  label="Apellido"
                                  values={formik.values.surname}
                                  placeholder="Apellido"
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Textfield
                                  onChange={formik.handleChange}
                                  name="phone"
                                  label="Telefono"
                                  values={formik.values.phone}
                                  placeholder="3889999999"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Textfield
                                  onChange={formik.handleChange}
                                  name="email"
                                  label="Email"
                                  values={formik.values.email}
                                  placeholder="xxxxxxx@dominio.com"
                                />
                              </Grid>

                             {/*  <Grid item xs={12}>
                                <Textfield
                                  onChange={formik.handleChange}
                                  name="password"
                                  label="Password"
                                  values={formik.values.password}
                                  placeholder="*********"
                                />
                              </Grid> */}
                              <Grid item xs={12} style={{ justifyContent: "center", alignItems: "center", alignContent: "center", marginLeft: '8px' }}>
                                <FormControl>

                                  <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={shipment}
                                    onChange={handleChange}
                                  >
                                    <FormControlLabel value="local" control={<Radio />} label="Retiro en el Local" />
                                    <FormControlLabel value="domicilio" control={<Radio />} label="Envio a Domicilio" />
                                  </RadioGroup>
                                </FormControl>
                              </Grid>{
                                (shipment == "domicilio") ?
                                  <>
                                    <Grid item xs={12}>
                                      <Textfield
                                        onChange={formik.handleChange}
                                        name="barrio"
                                        label="Barrio"
                                        values={formik.values.barrio}
                                        placeholder="barrio"
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Textfield
                                        onChange={formik.handleChange}
                                        name="calle"
                                        label="Calle"
                                        values={formik.values.calle}
                                        placeholder="Calle"
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Textfield
                                        onChange={formik.handleChange}
                                        name="numero"
                                        label="Numero de Casa"
                                        values={formik.values.numero}
                                        placeholder="Numero de Casa"
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Textfield
                                        onChange={formik.handleChange}
                                        name="localidad"
                                        label="Localidad"
                                        values={formik.values.localidad}
                                        placeholder="Localidad"
                                      />
                                    </Grid>

                                  </>
                                  :
                                  <></>
                              }

                              <Grid item >

                                <ReCAPTCHA
                                  ref={captcha}
                                  sitekey="6LfbvywfAAAAACW_yrnaJlDXk6ajACCQ3_DVSGIa"
                                  onChange={onChange}
                                />


                              </Grid>


                              <Grid item xs={12} sm={6} md={8} lg={6} style={{ marginLeft: "auto", marginRight: "auto" }} >

                                <div>
                                  {!botonSeleccionado && (
                                    <Button
                                      variant="outlined" style={{ color: "blue" }} >
                                      Continuar con la compra
                                    </Button>
                                  )}
                                </div>

                                {validation ? navigate('/pay', { state: { orden,purchaseId } }) : null}
                              </Grid>

                            </Grid>
                          </Form>
                        )}

                      </Formik>
                    </div>
                  </Container>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
      }
    </>

  )
}
