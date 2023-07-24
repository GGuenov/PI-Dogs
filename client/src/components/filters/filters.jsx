import { useState, useEffect } from "react";
import axios from "axios";
import style from "./filters.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";
import {
  filteredTemps,
  orderByOrigin,
  orderedByWeight,
  orderredByAlphabet,
} from "../../redux/actions/actions";
// import {setCurrentPage} from "./"

const Bar = (props) => {
  //   const { setCurrentPage } = props;

  const location = useLocation();
  const isHomeRoute = location.pathname === "/home";

  const URL = "http://localhost:3001/dogs";
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${URL}?name=${name}`);
      const result = response.data[0];

      console.log(result);
      console.log(result.id);

      if (result) {
        navigate(`detail/${result.id}`);
      } else if (!result) {
        alert(`La raza ${name} no existe`);
      }
    } catch (error) {
      console.error(error);
    }

    setName("");
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

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

  // Dispatch

  const handleOrigin = (event) => {
    dispatch(orderByOrigin(event.target.value));
    // setCurrentPage(1);
  };

  const handleAlphabetic = (event) => {
    dispatch(orderredByAlphabet(event.target.value));
    // setCurrentPage(1);
  };

  const handleWeight = (event) => {
    dispatch(orderedByWeight(event.target.value));
    // setCurrentPage(1);
  };

  const handleTemperaments = (event) => {
    dispatch(filteredTemps(event.target.value));
    // setCurrentPage(1);
  };

  return (
    <section className={style.section}>
      {/* <NavLink to="/form" className={style.dogo}>
        ¡Crea tu dogo!
      </NavLink> */}
      {isHomeRoute && (
        <article className={style.filtros}>
          <label htmlFor="">Orden Alfabético: </label>
          <select
            name="Alfabéticamente"
            id=""
            className={style.selector}
            onChange={handleAlphabetic}
          >
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
      <form action="" className={style.form} onSubmit={handleSearch}>
        <label htmlFor="">Buscar raza: </label>
        <input
          type="text"
          placeholder="Husky..."
          value={name}
          onChange={handleInputChange}
        />
        <button id="btn" type="submit" className={style.btn}>
          Buscar
        </button>
      </form>
    </section>
  );
};

export default Bar;
