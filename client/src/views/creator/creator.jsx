import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import validate from "./validation";
import style from "./creator.module.css";
import axios from "axios";
//import Home from "./views/home/home";

const Creator = () => {
  const initialFormState = {
    name: "",
    alturaMax: "",
    alturaMin: "",
    pesoMax: "",
    pesoMin: "",
    lifeSpan: "",
    image: "",
    temperament: [],
  };

  const [form, setForm] = useState({
    name: "",
    alturaMax: "",
    alturaMin: "",
    pesoMax: "",
    pesoMin: "",
    lifeSpan: "",
    image: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    alturaMax: "",
    alturaMin: "",
    pesoMax: "",
    pesoMin: "",
    lifeSpan: "",
    image: "",
    temperament: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };
  const imageChangeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    const heightMin = parseInt(form.alturaMin);
    const heightMax = parseInt(form.alturaMax);
    const weightMin = parseInt(form.pesoMin);
    const weightMax = parseInt(form.pesoMax);

    try {
      const response = await axios.post("/dogs/", {
        ...form,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
      });
      console.log(form);
      alert("Perro creado exitosamente. Gran trabajo!");
      console.log(response);
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const URLTemps = "/temperaments";

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

  const listTemps = temps.map((temperament) => (
    <option key={temperament.id} value={temperament.id}>
      {temperament.name}{" "}
    </option>
  ));

  const selected = form.temperament.map((id) => {
    const temp = temps.find((temp) => temp.id === id);
    return temp ? temp.name + ", " : null;
  });
  // const tidySelected = se;

  console.log(temps);
  console.log(selected);

  const handleSelect = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      temperament: [...form.temperament, e.target.value],
    });
  };

  return (
    <div>
      <NavLink to="/home">
        <button className={style.button}>Volver!</button>
      </NavLink>
      <form onSubmit={handleSubmit}>
        <h1>Crea tu propio perro:</h1>
        <div className={style.imputes}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
            />
            {errors.name && (
              <span className={style.errores}>{errors.name}</span>
            )}
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
              value={form.lifeSpan}
              onChange={changeHandler}
              name="lifeSpan"
            />
            {errors.lifeSpan && (
              <span className={style.errores}>{errors.lifeSpan}</span>
            )}
          </div>
          <div>
            <label>Imagen</label>
            <input
              type="url"
              value={form.image}
              onChange={imageChangeHandler}
              name="image"
            />
            {errors.image && (
              <span className={style.errores}>{errors.image}</span>
            )}
          </div>
          <div>
            <article className={style.info}>
              <label htmlFor="temperamento">Temperamento </label>
              <select
                name="temperament"
                id="temperament"
                onChange={handleSelect}
              >
                <option value="">Selecciona un temperamento</option>
                {listTemps}
              </select>
            </article>
            <labell>{selected}</labell>
            {/* <input value={selected} /> */}
          </div>
        </div>
        <p className={errors.temperament ? style.errors : ""}>
          {errors.temperament ? errors.temperament : null}
        </p>
        <button type="submit">Crear!</button>
      </form>
    </div>
  );
};

export default Creator;
