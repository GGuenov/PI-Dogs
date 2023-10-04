import { NavLink } from "react-router-dom";
import style from "./card.module.css";

// import { fileTypeFromFile } from "file-type";

function Card({ dog }) {
  const { temperament, weightMax, name, image, id } = dog;
  const imageJpg = image + ".jpg";
  const imagePng = image + ".png";

  let pocosTemps = temperament?.slice(0, 4);

  return (
    <NavLink to={`/details/${id}`}>
      <div className={style.todo}>
        <div className={style.carta}>
          <img
            className={style.image}
            src={imageJpg}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = imagePng;
            }}
            alt={name}
          />
          <p className={style.texto}>{name}</p>
          <p className={style.texto}>{weightMax || 1}lb</p>
          <p className={style.texto}>{pocosTemps?.map((temp) => temp + " ")}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default Card;
