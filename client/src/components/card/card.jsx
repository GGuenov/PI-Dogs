import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import { connect } from "react-redux";
// import { useState, useEffect } from "react"; //import "./App.css";
import style from "./card.module.css";

function Card({ dog }) {
  const { temperament, weightMax, name, image, id } = dog;
  // console.log(temperament);

  let pocosTemps = temperament?.slice(0, 4);

  return (
    <div className={style.carta}>
      <NavLink to={`/details/${id}`}>
        <img className={style.image} src={image} alt={name} />
        <p className={style.texto}>{name}</p>
        <p className={style.texto}>{weightMax}lb</p>
        <p className={style.texto}>{pocosTemps?.map((temp) => temp + " ")}</p>
      </NavLink>
    </div>
  );
}

export default Card;
