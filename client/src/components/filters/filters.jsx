import { useState, useEffect } from "react";
import axios from "axios";
import style from "./filters.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  filteredTemps,
  weightRanger,
  getByRaza,
  heightRanger,
  orderByOrigin,
  orderedByWeight,
  orderredByAlphabet,
} from "../../redux/actions/actions";
import sausageDog from "../filters/sausageDog.jpg";
import alto from "../filters/alto.jpg";
import bajo from "../filters/bajo.jpg";

const Bar = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/home";

  const dispatch = useDispatch();

  const URLTemps = "/temperaments";

  const [temps, setTemps] = useState([]);
  const allDogs = useSelector((state) => state.allDogs);
  const [weightRangeSlider, setWeightRangeSlider] = useState([0, 200]);
  const [heightRangeSlider, setHeightRangeSlider] = useState([0, 40]);

  useEffect(() => {
    const fetchTemps = async () => {
      try {
        const res = await axios.get(URLTemps);
        const data = res.data;
        setTemps(data);
      } catch (error) {
        console.error(error.message);
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
    setWeightRangeSlider(value);

    dispatch(weightRanger(value));
  };

  const handlerheightRangeChange = (value) => {
    setHeightRangeSlider(value);
    dispatch(heightRanger(value));
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
  const [name, setName] = useState("");
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    dispatch(getByRaza(name));
  };
  const handlerChange = (e) => {
    // e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value);
  };

  return (
    <div className={style.todes}>
      {isHomeRoute && (
        <section className={style.section}>
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
              <option value="API">Perros</option>
              <option value="DB">Gatos</option>
            </select>
          </article>
        </section>
      )}
      {isHomeRoute && (
        <label className={style.label}>
          Definí el rango pesario que mas te guste
        </label>
      )}
      <div className={style.container}>
        {isHomeRoute && (
          <div className={style.diver}>
            <img height={50} src={sausageDog} />
            <Slider
              className={style.Slider}
              range
              min={0}
              step={10}
              max={200}
              value={weightRangeSlider}
              onChange={handleWeightRangeChange}
              marks={{
                30: "30",
                60: "60",
                90: "90",
                120: "120",
                150: "150",
                180: "180",
              }}
            ></Slider>
            <img
              height={50}
              src="https://img.icons8.com/ios/500w/fat-dog.png"
            />
          </div>
        )}
        {isHomeRoute && (
          <div className={style.diver}>
            <img height={50} src={bajo} />
            <Slider
              className={style.Slider}
              range
              min={0}
              step={5}
              max={40}
              value={heightRangeSlider}
              onChange={handlerheightRangeChange}
              marks={{ 10: "10", 20: "20", 30: "30" }}
            ></Slider>
            <img height={100} src={alto} />
          </div>
        )}
      </div>
      <div className={style.navBar}>
        <h2>Buscá por Nombre</h2>
        <form onSubmit={handlerSubmit}>
          <input
            placeholder="indique la raza"
            type="search"
            onChange={handlerChange}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </div>
  );
};

export default Bar;
