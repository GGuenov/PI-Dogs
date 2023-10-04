//import styles from "./home.styles";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDogs } from "../../redux/actions/actions";

// import { getByRaza } from "../../redux/actions/actions";

import Card from "../card/card";
import style from "./cardsContainer.module.css";

function CardsContainer({ allDogs }) {
  // const dogsList = allDogs;

  const storedPage = localStorage.getItem("currentPage");
  const [currentPage, setCurrentPage] = useState(
    storedPage ? Number(storedPage) : 1
  );

  const cardsPerPage = 8;

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (allDogs.length < 8) setCurrentPage(1);
  }, [allDogs]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const displayedCards = allDogs.slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = Math.ceil(allDogs.length / cardsPerPage);

  const renderPageNumbers = () => {
    return Array.from({ length: pageNumbers }, (_, index) => (
      <li
        key={index}
        className={currentPage === index + 1 ? style.active : ""}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </li>
    ));
  };

  const nextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    return (
      <div className={style.paginationontainer}>
        <div className={style.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            ⬅️
          </button>
          <ul className={style.pageNumbers}>{renderPageNumbers()}</ul>
          <button onClick={nextPage} disabled={currentPage === pageNumbers}>
            ➡️
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={style.texto}>
        {displayedCards?.map((dog) => (
          <Card key={dog.id} dog={dog} />
        ))}
      </div>
      {renderPaginationButtons()}
    </div>
  );
}

export default CardsContainer;
