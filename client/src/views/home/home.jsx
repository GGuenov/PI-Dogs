import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import style from "./home.module.css";
import CardsContainer from "../../components/cardsContainer/cardsContainer";

function Home() {
  const dispatch = useDispatch(); //esto le manda actions a la store
  const allDogs = useSelector((state) => state.allDogs); // me suscrivo al estado 'allDogs'

  useEffect(() => {
    //se carga las cosas que necesita para renderizarse(al montarse)
    dispatch(getDogs()); //
    //return () => {
    //  clearDetail(); //si quiero alguna accion a la hr de desmontarme, la retorno acá (con un callback)
    //};
  }, [dispatch]); //el cuándo, va entre []

  // console.log(allDogs);

  return (
    <div className={style.home}>
      <div>
        <NavLink to="/creator">
          <button className={style.button}>Crea el tuyo</button>
        </NavLink>
        <NavLink to="/editor">
          <button className={style.button}>Ir a edición</button>
        </NavLink>
      </div>
      <NavLink to="/delete">
        <button className={style.button}>
          O decime cuál no te gusta y lo volamos!
        </button>
      </NavLink>
      <div className={style.cards}>
        <CardsContainer allDogs={allDogs} />
      </div>
    </div>
  );
}

export default Home;
