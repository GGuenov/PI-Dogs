import styles from "./details.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Details = (req, res) => {
  const { id } = useParams();
  const [dog, setdogs] = useState({});

  useEffect(() => {
    const getDog = async (id) => {
      try {
        const response = axios.get(
          `https://api.thedogapi.com/v1/breeds/search?q=${id}`
        );

        res.status(200).send(setdogs(response));

        res.status(400).json("No hay perros con ese ID");
      } catch (error) {
        res.status(500).json({ error: "No hay perros con ese ID" });
      }
      return setdogs({});
    };
  }, [id]);

  return (
    <div>
      <div>
        <Link to="/home">
          <button className={styles.button}>Volver!</button>
        </Link>
      </div>
      <div className={styles.container}>
        <h1>Details:</h1>
        <h2>{dog.name}</h2>
        {console.log(dog)}
        <h3>Id | {dog.id}</h3>
        <h3>Estatus | {dog.status}</h3>
        <h3>Origen | {dog.origin?.name}</h3>
        <h3>Especie | {dog.species}</h3>
        <h3>Genero | {dog.gender}</h3>
      </div>
    </div>
  );
};
export default Details;
