import {React} from 'react'
import "./WhatsApp.scss";

export default function WhatsApp() {
  return (
    <>
      <a
        target="blank"
      /*   href="https://api.whatsapp.com/send?phone=&text=5493884299868" */
      href="https://wa.me/5493884299868"


        className="whatsapp-button">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}
