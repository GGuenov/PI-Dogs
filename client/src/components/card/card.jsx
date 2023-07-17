// import { useNavigate } from "react-router-dom";
// import { connect } from "react-redux";
// import { useState, useEffect } from "react"; //import "./App.css";
import style from "./card.module.css";

function Card({ dog }) {
  const { temperament, weightMax, name, image } = dog;
  console.log(temperament);

  const pocosTemps = temperament.slice(0, 4);

  return (
    <div className={style.carta}>
      {/* <p className={style.texto}>{id}</p> */}
      <img className={style.image} src={image} alt={name} />
      <p className={style.texto}>{name}</p>
      <p className={style.texto}>{weightMax}kg</p>
      <p className={style.texto}>{pocosTemps.map((temp) => temp + " ")}</p>
    </div>
  );
}

export default Card;
