import { NavLink } from "react-router-dom";
import style from "./card.module.css";

// import { fileTypeFromFile } from "file-type";

function Card({ dog }) {
  const { temperament, weightMax, name, image, id } = dog;
  const imageJpg = image + ".jpg";
  const imagePng = image + ".png";
  let imagen = "";
  if (id > 172) imagen = image;
  else imagen = imageJpg;

  // ("https://www.loveyourdog.com/wp-content/uploads/2021/05/Dog-Looks-at-me-While-Pooping.jpg");
  // console.log(image.length);

  let pocosTemps = temperament?.slice(0, 4);

  return (
    <div className={style.todo}>
      <NavLink to={`/details/${id}`}>
        <div className={style.carta}>
          <img
            className={style.image}
            src={imagen}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = imagePng;
            }}
            alt={name}
          />
          <p className={style.texto}>{name}</p>
          <p className={style.texto}>{weightMax}lb</p>
          <p className={style.texto}>{pocosTemps?.map((temp) => temp + " ")}</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Card;
