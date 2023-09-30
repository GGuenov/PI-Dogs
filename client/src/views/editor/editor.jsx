import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import validate from "./validation";
import style from "./editor.module.css";
import axios from "axios";

const Editor = () => {
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

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const heightMin = parseInt(form.alturaMin);
    const heightMax = parseInt(form.alturaMax);
    const weightMin = parseInt(form.pesoMin);
    const weightMax = parseInt(form.pesoMax);

    try {
      const response = await axios.put("/dogs/edit", {
        ...form,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
      });
      console.log(form);
      alert("Perro editado exitosamente. Gran trabajo!");
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
  const URLname = "/dogs/editables";

  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await axios.get(URLname);
        const data = await res.data;

        setNames(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNames();
  }, []);

  const listNames = names.map((e) => (
    <option key={e.name} value={e.name}>
      {e.name}
      {""}
    </option>
  ));

  const handleSelect = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      temperament: [...form.temperament, e.target.value],
    });
  };
  const handleSelectName = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      name: e.target.value,
    });
  };
  const selfFill = form.name
    ? names.filter((dog) => dog.name === form.name)
    : "indique un valor";
  const primerTemp = form.name
    ? selfFill[0].temperament[0]
    : "Indiqui un temperamento";
  const segundoTemp = form.name
    ? selfFill[0].temperament[1]
    : "Indiqui un temperamento";
  const terceroTemp = form.name
    ? selfFill[0].temperament[2]
    : "Indiqui un temperamento";
  const cuartoTemp = form.name
    ? selfFill[0].temperament[3]
    : "Indiqui un temperamento";
  console.log(form.name);
  console.log(names);
  console.log(selfFill);
  console.log(form);
  return (
    <div>
      <NavLink to="/home">
        <button className={style.button}>Volver!</button>
      </NavLink>
      <form className={style.imputes} onSubmit={handleSubmit}>
        <h1>Editá tu perro en la BDD:</h1>
        <div>
          <article className={style.info}>
            <label htmlFor="name">Nombre de la raza </label>
            <select name="name" id="name" onChange={handleSelectName}>
              <option value="">Selecciona un nombre</option>
              {listNames}
            </select>
          </article>
          {errors.name && <span className={style.errores}>{errors.name}</span>}
        </div>
        <div>
          <label>Altura Máxima</label>
          <input
            type="number"
            placeholder={selfFill[0].heightMax}
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
            placeholder={selfFill[0].heightMin}
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
            placeholder={selfFill[0].weightMax}
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
            placeholder={selfFill[0].weightMin}
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
            placeholder={selfFill[0].lifeSpan}
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
            placeholder={selfFill[0].image}
            value={form.image}
            onChange={changeHandler}
            name="image"
          />
          {errors.image && (
            <span className={style.errores}>{errors.image}</span>
          )}
        </div>

        <article className={style.info}>
          <label htmlFor="temperamento">Temperamento </label>
          <select
            value={primerTemp}
            name="temperament"
            id="temperament"
            onChange={handleSelect}
          >
            <option>{primerTemp}</option>
            {listTemps}
          </select>
        </article>
        <article className={style.info}>
          <label htmlFor="temperamento1">Temperamento </label>
          <select
            value={segundoTemp}
            name="temperament1"
            id="temperament1"
            onChange={handleSelect}
          >
            <option value="">{segundoTemp}</option>
            {listTemps}
          </select>
        </article>
        <article className={style.info}>
          <label htmlFor="temperamento2">Temperamento </label>
          <select
            value={terceroTemp}
            name="temperament2"
            id="temperament2"
            onChange={handleSelect}
          >
            <option>{terceroTemp}</option>
            {listTemps}
          </select>
        </article>
        <article className={style.info}>
          <label htmlFor="temperamento3">Temperamento </label>
          <select
            value={cuartoTemp}
            name="temperament3"
            id="temperament3"
            onChange={handleSelect}
          >
            <option value="">{cuartoTemp}</option>
            {listTemps}
          </select>
        </article>

        <p className={errors.temperament ? style.errors : ""}>
          {errors.temperament ? errors.temperament : null}
        </p>
        <button type="submit">Editar!</button>
      </form>
    </div>
  );
};

export default Editor;
