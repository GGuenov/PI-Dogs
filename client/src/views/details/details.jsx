import styles from "./details.module.css";
import axios from "axios";

import { useEffect, useState } from "react";
// import { getDogs } from "../../redux/actions/actions";
import { NavLink, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(dogs);

  // useEffect(() => {
  //   dispatch(getDogs());
  //   return (()=>{
  //     clearDetails()
  //   })
  // }, [dispatch]);
  const URL = `http://localhost:3001/dogs/`;
  useEffect(() => {
    const getOneDog = async () => {
      try {
        // console.log(id);
        const response = await axios.get(URL);

        // const theDog = allDogs.filter((dog) => dog.id === id);
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
  // const idS = Number(id) + 1;
  // const idA = id - 1;
  // console.log(idA);
  // console.log(idS);
  return (
    <div>
      <div>
        {/* {id !== 1 ? (
          <NavLink to={`/details/${idA}`}>
            <button className={styles.button}>Anterior!</button>
          </NavLink>
        ) : null} */}
        <NavLink to="/home">
          <button className={styles.button}>Volver!</button>
        </NavLink>
        {/* {idS !== dog.length ? (
          <NavLink to={`/details/${idS}`}>
            <button className={styles.button}>Siguiente!</button>
          </NavLink>
        ) : null} */}
      </div>
      <div className={styles.container}>
        <h1>Details:</h1>
        <h3>Id | {id}</h3>
        <h2>{name}</h2>
        <div className={styles.altPes}>
          <h3>Altura Máxima | {weightMax}lb</h3>
          <h3>Mínima | {weightMin}lb</h3>
          <h3>Peso Máximo | {heightMax}lb</h3>
          <h3> Mínimo | {heightMin}lb</h3>
        </div>
        <h3>Temperamento/s | {temperament?.map((temp) => temp + ", ")}</h3>
        <h3>Espectativa de vida | {lifeSpan}</h3>
        <img src={image} alt={name} />
      </div>
    </div>
  );
};
export default Details;
