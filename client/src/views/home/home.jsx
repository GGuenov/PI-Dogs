import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";
import { getByRaza } from "../../redux/actions/actions";

import style from "./home.module.css";
import CardsContainer from "../../components/cardsContainer/cardsContainer";
import NavBar from "../../components/navBar/navBar";

function Home() {
  const dispatch = useDispatch(); //esto le manda actions a la store
  const allDogs = useSelector((state) => state.allDogs); // me suscrivo al estado 'allDogs'
  // const test = useSelector((state) => state.test); // me suscrivo al estado 'allDogs'

  // const [filtered, setFiltered] = useState(allDogs);
  const [searchString, setSearchString] = useState("");
  function handleChange(e) {
    setSearchString(e.target.value);
  }
  console.log(searchString);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByRaza(searchString));
    // const filteredDogs = allDogs.filter((dog) =>
    //   dog.name.toLowerCase().includes(searchString.toLowerCase())
    // );

    // if (filteredDogs.length !== 0) {
    //   setFiltered(filteredDogs);
    // } else {
    //   setFiltered(allDogs);
    // }
  }

  useEffect(() => {
    //se carga las cosas que necesita para renderizarse(al montarse)
    dispatch(getDogs()); //
    //return () => {
    //  clearDetail(); //si quiero alguna accion a la hr de desmontarme, la retorno acá (con un callback)
    //};
  }, [dispatch]); //el cuándo, va entre []

  // useEffect(() => {
  //   if (allDogs.length < 10) setCurrentPage(1);
  // }, [allDogs]);

  // console.log(filtered);
  console.log(allDogs);

  return (
    <div className={style.home}>
      {/* <h1>This is home</h1> */}
      <NavLink to="/creator">
        <button>Crea el tuyo</button>
      </NavLink>
      <div className={style.navBar}>
        <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      <div className={style.cards}>
        <CardsContainer allDogs={allDogs} />
      </div>
    </div>
  );
}

export default Home;
