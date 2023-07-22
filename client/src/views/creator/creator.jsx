import { useState } from "react";
import validate from "./validation";
import style from "./creator.module.css";
import axios from "axios";
//import Home from "./views/home/home";

const Creator = () => {
  const [form, setForm] = useState({
    name: "",
    alturaMax: "",
    alturaMin: "",
    pesoMax: "",
    pesoMin: "",
    añosDeVida: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    alturaMax: "",
    alturaMin: "",
    pesoMax: "",
    pesoMin: "",
    añosDeVida: "",
    image: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/dogs/", form).then((res) => alert(res));
    console.log(form);
  };

  return (
    <form className={style.imputes} onSubmit={submitHandler}>
      <h1>Crea tu propio perro:</h1>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
        />
        {errors.name && <span className={style.errores}>{errors.name}</span>}
      </div>
      <div>
        <label>Altura Máxima</label>
        <input
          type="number"
          value={form.alturaMax}
          onChange={changeHandler}
          name="alturaMax"
        />
        {errors.alturaMax && (
          <span className={style.errores}>{errors.alturaMax}</span>
        )}
      </div>
      <div>
        <label>Altura Mínima</label>
        <input
          type="number"
          value={form.alturaMin}
          onChange={changeHandler}
          name="alturaMin"
        />
        {errors.alturaMin && (
          <span className={style.errores}>{errors.alturaMin}</span>
        )}
      </div>
      <div>
        <label>Peso Máximo</label>
        <input
          type="number"
          value={form.pesoMax}
          onChange={changeHandler}
          name="pesoMax"
        />
        {errors.pesoMax && (
          <span className={style.errores}>{errors.pesoMax}</span>
        )}
      </div>
      <div>
        <label>Peso Mínima</label>
        <input
          type="number"
          value={form.pesoMin}
          onChange={changeHandler}
          name="pesoMin"
        />
        {errors.pesoMin && (
          <span className={style.errores}>{errors.pesoMin}</span>
        )}
      </div>

      <div>
        <label>Años de vida</label>
        <input
          type="text"
          value={form.añosDeVida}
          onChange={changeHandler}
          name="añosDeVida"
        />
        {errors.añosDeVida && (
          <span className={style.errores}>{errors.añosDeVida}</span>
        )}
      </div>
      <div>
        <label>Imagen</label>
        <input
          type="url"
          value={form.image}
          onChange={changeHandler}
          name="image"
        />
        {errors.image && <span className={style.errores}>{errors.image}</span>}
      </div>
      <button type="submit">Crear!</button>
    </form>
  );
};

export default Creator;
