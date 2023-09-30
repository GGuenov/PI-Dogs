import { NavLink } from "react-router-dom";
import style from "./delete.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Delete = () => {
  const [form, setForm] = useState();

  const resetForm = () => {
    setForm("");
  };
  const [inTheOven, setInTheOven] = useState([]);
  useEffect(() => {
    const bringBreedsDB = async () => {
      try {
        const res = await axios.get("/dogs/editables");
        const inTheOven = res.data;
        setInTheOven(inTheOven);
      } catch (error) {
        console.log(error);
      }
    };
    bringBreedsDB();
  }, []);

  console.log(inTheOven);
  const listaInTheOven = inTheOven.map((e) => (
    <option key={e.key} value={e.value}>
      {e.name}
      {""}
    </option>
  ));
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/dogs/delete/${form}`);
      console.log(response);
      alert(`Era ${form}, ahora es pollo!!`);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Algo malió sal...");
    }
  };

  const changeHandler = (e) => {
    // e.preventDefault();
    console.log(e.target.value);
    setForm(e.target.value);
  };

  console.log(listaInTheOven);
  console.log(form);
  return (
    <div className={style.button}>
      <NavLink to="/home">
        <button>Volver!</button>
      </NavLink>
      <form onSubmit={submitHandler}>
        <select value={form} onChange={changeHandler}>
          <option value="">Elija una raza</option>
          {listaInTheOven}
        </select>

        <button>Borrar raza</button>
      </form>
    </div>
  );
};
export default Delete;
