import styles from "./navBar.module.css";

function NavBar({ handlerChange, handlerSubmit }) {
  return (
    <div className={styles.navBar}>
      <h1>Barra de Navegacion</h1>
      <form onChange={handlerChange}>
        <input placeholder="indique la raza" type="search" />
        <button type="submit" onClick={handlerSubmit}>
          Buscar
        </button>
      </form>
    </div>
  );
}

export default NavBar;
