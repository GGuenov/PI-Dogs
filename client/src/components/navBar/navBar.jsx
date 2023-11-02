import style from "./navBar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getByRaza } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handlerSubmit = async (e) => {
    // console.log(name);
    e.preventDefault();

    try {
      const response = await axios.get(`/dogs/${name}`);
      // console.log(`/dogs/${name}`);
      // console.log(response.data);

      if (response.data.length === 0) alert(`La raza ${name} no existe`);

      dispatch(getByRaza(response));
    } catch (error) {
      console.error(error);
    }

    setName("");
  };

  const handlerChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
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
  );
}

export default NavBar;
