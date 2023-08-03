import {React} from 'react';
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Footer.scss";
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Footer(props) {





  return (
  
    <div className="footer">
      <section className="footer__suscription">
        <p className="footer__suscription__heading">
          Unite a la Red de Leo y recibí nuestras mejores Ofertas
        </p>
        <p className="footer__suscription__text">
          Podes desuscribirte cuando quieras
        </p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Tu Email"
              className="footer__input"
            />
            <Button path="/" content="Suscribite" className="button__footer" />
          
          </form>
        </div>
      </section>
      <div className="footer__link ">
        <div className="footer__link__wrapper">
          <div className="footer__link__items">
            <h4 className="footer__link__titulo">Comprar</h4>
            <NavLink to="/login/" className="footer__link__links">
              Inicia Sesión
            </NavLink>
            <NavLink to="/" className="footer__link__links">
              Productos
            </NavLink>
            <NavLink to="/categories/" className="footer__link__links">
              Categorías
            </NavLink>
          </div>
        </div>
        <div className="footer__link__wrapper">
          <div className="footer__link__items">
            <h4 className="footer__link__titulo">Redes Sociales</h4>
            <a
              href="https://www.instagram.com"
              target="blank"
              className="footer__link__icons">
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100094323146666"
              target="blank"
              className="footer__link__icons">
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__copyrights">
          <p className="footer__copyrights__text">Tienda LEO</p>
          <i className="far fa-copyright footer__copyrights__icon"></i>
          <p className="footer__copyrights__text">2023</p>
        </div>
        <div className="footer__copyrights">
          <p className="footer__bottom__developer">Created by ADA Informatica</p>
          <a href="https://www.facebook.com/ada.68291/" target="blank">
          <FacebookIcon />
          </a>
        </div>
      </div>
    </div>
   
  );
}
