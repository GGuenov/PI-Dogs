import styles from "./navBar.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getByRaza } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // const URL = `/dogs/:${name}`;

  const dispatch = useDispatch();

  // useEffect(async () => {
  //   const response = await axios.get(`/dogs/${name}`);
  // });

  const handlerSubmit = async (e) => {
    console.log(name);
    e.preventDefault();

    try {
      // const aVer = await getByRaza(name);
      const response = await axios.get(`/dogs/${name}`);
      console.log(`/dogs/${name}`);
      console.log(response.data);

      if (response.data.length === 0) alert(`La raza ${name} no existe`);

      dispatch(getByRaza(response));
    } catch (error) {
      console.error(error);
    }

    setName("");
  };

  const handlerChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setName(e.target.value);
  };

  return (
    <div className={styles.navBar}>
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
  );
}

export default NavBar;
