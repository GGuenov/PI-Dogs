import { NavLink } from "react-router-dom";
//import Home from "../home/home";
import style from "./landing.module.css";

//import CardsContainer from "../../components/CardsContainer/CardsContainer";
//import NavBar from "../../components/navBar/navBar";

function Landing() {
  return (
    <div className={style.landing}>
      <h1>Bienvenido a mi primer PI</h1>
      <h2>Hoy toca Perros...</h2>
      <h2>Una vez limpia la pantalla, podemos paras a la Home</h2>
      <NavLink to="/home">
        <button>a Home</button>
      </NavLink>
    </div>
  );
}

export default Landing;
