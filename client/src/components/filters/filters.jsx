import { useState, useEffect } from "react";
import axios from "axios";
import style from "./filters.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  filteredTemps,
  orderByOrigin,
  orderedByWeight,
  orderredByAlphabet,
} from "../../redux/actions/actions";

const Bar = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/home";

  const dispatch = useDispatch();

  // Temperamentos

  const URLTemps = "http://localhost:3001/temperaments";

  const [temps, setTemps] = useState([]);

  useEffect(() => {
    const fetchTemps = async () => {
      try {
        const res = await axios.get(URLTemps);
        const data = await res.data;
        setTemps(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTemps();
  }, []);

  console.log(temps);
  const listTemps = temps.map((temperament) => (
    <option key={temperament.id} value={temperament.name}>
      {temperament.name}{" "}
    </option>
  ));

  // Dispatches

  const handleOrigin = (event) => {
    dispatch(orderByOrigin(event.target.value));
  };

  const handleAlphabetic = (event) => {
    dispatch(orderredByAlphabet(event.target.value));
  };

  const handleWeight = (event) => {
    dispatch(orderedByWeight(event.target.value));
  };

  const handleTemperaments = (event) => {
    dispatch(filteredTemps(event.target.value));
  };

  return (
    <section className={style.section}>
      {isHomeRoute && (
        <article className={style.filtros}>
          <label htmlFor="">Orden Alfabético: </label>
          <select
            name="Alfabéticamente"
            id=""
            className={style.selector}
            onChange={handleAlphabetic}
          >
            <option value="Default">Default</option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
          <label htmlFor="">Peso: </label>
          <select
            name="Peso"
            id=""
            className={style.selector}
            onChange={handleWeight}
          >
            <option value="Default">Default</option>
            <option value="Mayor">Mayor</option>
            <option value="Menor">Menor</option>
          </select>
          <label htmlFor="">Temperamentos: </label>
          <select
            name="Temperamentos"
            id=""
            className={style.selector}
            onChange={handleTemperaments}
          >
            <option value="Todos">Todos</option>
            {listTemps}
          </select>
          <label htmlFor="">Fuente: </label>
          <select
            name="Origen"
            id=""
            className={style.selector}
            onChange={handleOrigin}
          >
            <option value="Todos">Todos</option>
            <option value="API">API</option>
            <option value="DB">Base de Datos</option>
          </select>
        </article>
      )}
    </section>
  );
};

export default Bar;
