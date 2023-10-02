import { useState, useEffect } from "react";
import axios from "axios";
import style from "./filters.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  filteredTemps,
  weightRanger,
  orderByOrigin,
  orderedByWeight,
  orderredByAlphabet,
} from "../../redux/actions/actions";

const Bar = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/home";

  const dispatch = useDispatch();

  const URLTemps = "/temperaments";

  const [temps, setTemps] = useState([]);
  const [weightRangeSlider, setWeightRangeSlider] = useState([0, 200]);

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

  const listTemps = temps.map((temperament) => (
    <option key={temperament.id} value={temperament.name}>
      {temperament.name}{" "}
    </option>
  ));

  const handleOrigin = (event) => {
    dispatch(orderByOrigin(event.target.value));
  };
  const handleWeightRangeChange = (value) => {
    // console.log(value);
    setWeightRangeSlider(value);
    // console.log(weightRangeSlider);
    dispatch(weightRanger(value));
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
    <div className={style.todes}>
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
      <label className={style.label}>
        Definí el rango pesario que mas te guste
      </label>
      <div className={style.container}>
        {isHomeRoute && (
          <div className={style.diver}>
            <hi>0lb...</hi>
            <Slider
              range
              min={0}
              step={10}
              max={200}
              value={weightRangeSlider}
              onChange={handleWeightRangeChange}
            ></Slider>
            <hi>...180lb</hi>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bar;
