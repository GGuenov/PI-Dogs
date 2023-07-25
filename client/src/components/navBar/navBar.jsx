import styles from "./navBar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const URL = "http://localhost:3001/dogs";
function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(URL);
      const search = response.data;

      console.log(search);
      const theOne = search.filter((sea) =>
        sea.name.toLowerCase().includes(name.toLowerCase())
      );
      console.log(theOne);

      if (theOne[0]) {
        navigate(`/details/${theOne[0].id}`);
      } else {
        alert(`La raza ${name} no existe`);
      }
    } catch (error) {
      console.error(error);
    }

    setName("");
  };

  const handlerChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.navBar}>
      <h1>Barra de Navegacion</h1>
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
