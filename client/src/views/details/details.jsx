import style from "./details.module.css";
import axios from "axios";

import { useEffect, useState } from "react";
// import { getDogs } from "../../redux/actions/actions";
import { NavLink, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(dogs);

  const URL = `/dogs/`;
  useEffect(() => {
    const getOneDog = async () => {
      try {
        const response = await axios.get(URL);

        const data = await response.data;
        setDogs(data);
        setLoading(false);
      } catch (error) {
        console.log(error, "No hay perros con ese ID");
        setLoading(false);
      }
    };
    getOneDog();
  }, [URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const dog = dogs.filter((dog) => dog.id === Number(id));

  const {
    name,
    weightMax,
    weightMin,
    heightMax,
    heightMin,
    lifeSpan,
    temperament,
    image,
  } = dog[0];
  const idS = Number(id) + 1;
  const idA = id - 1;
  const imageJpg = image + ".jpg";
  const imagePng = image + ".png";
  return (
    <div>
      <div>
        {id < 2 ? null : (
          <NavLink to={`/details/${idA}`}>
            <button className={style.button}>Anterior!</button>
          </NavLink>
        )}
        <NavLink to="/home">
          <button className={style.button}>Volver!</button>
        </NavLink>
        {Number(id) === dogs.length ? null : (
          <NavLink to={`/details/${idS}`}>
            <button className={style.button}>Siguiente!</button>
          </NavLink>
        )}
      </div>
      <div className={style.container}>
        <div className={style.text}>
          <h1>Details:</h1>
          {/* <h3>Id | {id}</h3> */}
          <h2>{name}</h2>
          <div className={style.altPes}>
            <h3>Peso Máxima | {weightMax}lb</h3>
            <h3>Mínima | {weightMin}lb</h3>
            <h3>Altura Máximo | {heightMax}cm</h3>
            <h3> Mínimo | {heightMin}cm</h3>
          </div>
          <h3>Temperamento/s | {temperament?.map((temp) => temp + ", ")}</h3>
          <h3>Espectativa de vida | {lifeSpan}</h3>
        </div>
        <div className={style.imageContainer}>
          <img
            className={style.image}
            src={imageJpg}
            onError={(e) => {
              e.target.src = null;
              e.target.src = imagePng;
            }}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};
export default Details;
