import { React } from 'react';
import { Link, NavLink } from "react-router-dom";
import Button from "../Button/Button";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Footer.scss";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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


const whatssaplink="https://wa.me/5493883295503"
const ubicacion ="https://goo.gl/maps/gQMUqC6ugjxxWSd79"


  return (

    <div className="footer">
      <div className="footer__link ">
        <div className="footer__link__wrapper">
          <div className="footer__link__items">
            <h4 className="footer__link__titulo">Contactos</h4>
            <NavLink to="/" className="footer__link__links">
              <Box display="flex" alignItems="center">
                <MailIcon  fontSize="small" />
                <Box marginLeft={1}>productos@gmail.com</Box>
              </Box>


            </NavLink>
         
            <a href={ubicacion} className="footer__link__links">
        
              <Box display="flex" alignItems="center">
                <LocationOnIcon   fontSize="small" />
                <Box marginLeft={1}>Perico, Jujuy, Argentina</Box>
              </Box>

            </a>
            <a href={whatssaplink} className="footer__link__links">
              
              <Box display="flex" alignItems="center">
                <WhatsAppIcon  fontSize="small"/>
                <Box marginLeft={1}>Whatsapp</Box>
              </Box>
              
              
            </a>
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
              <FacebookRoundedIcon />
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
        <div className="footer__copyrights" style={{ color: "white" }}>
          Creado por
          &nbsp;
          <NavLink to="https://www.facebook.com/profile.php?id=100094911514266" className="nav-link blink-link"><u>ADAInformatica</u> </NavLink>


        </div>
      </div>
    </div>

  );
}
