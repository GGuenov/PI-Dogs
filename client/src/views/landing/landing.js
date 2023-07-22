import { NavLink } from "react-router-dom";
//import Home from "../home/home";
import style from "./landing.module.css";

//import CardsContainer from "../../components/CardsContainer/CardsContainer";
//import NavBar from "../../components/navBar/navBar";

function Landing() {
  return (
    <div className={style.landing}>
      <h1>This is the landing view</h1>
      <NavLink to="/home">
        <button>a Home</button>
      </NavLink>
    </div>
  );
}

export default Landing;
