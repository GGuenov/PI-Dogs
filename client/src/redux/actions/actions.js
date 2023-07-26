import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_BY_RAZA = "GET_DOGS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const SORT_WEIGHT = "SORT_WEIGHT";
export const SORT_ALPHA = "ALPHABETIC";

export const FILTER_TEMP = "FILTER_TEMP";
export const GET_ALL = "GET_ALL";

export function getDogs() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/dogs/`);

    return dispatch({ type: GET_DOGS, payload: response.data });
  };
}
export function getByRaza(name) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/dogs/:${name}`);
    return dispatch({
      type: GET_BY_RAZA,
      payload: response.data,
    });
  };
}

export const orderByOrigin = (origin) => {
  return {
    type: FILTER_ORIGIN,
    payload: origin,
  };
};

export const orderedByWeight = (weight) => {
  return {
    type: SORT_WEIGHT,
    payload: weight,
  };
};

export const orderredByAlphabet = (order) => {
  return {
    type: SORT_ALPHA,
    payload: order,
  };
};
export const filteredTemps = (temperament) => {
  return async function (dispatch) {
    try {
      if (temperament === "Todos") {
        const response = await axios.get("http://localhost:3001/dogs/");
        const data = response.data;
        return dispatch({
          type: FILTER_TEMP,
          payload: data,
        });
      } else {
        const response = await axios.get("http://localhost:3001/dogs/");
        const data = response.data;
        const dogos = data.filter(
          (dog) => dog.temperament && dog.temperament.includes(temperament)
        );

        return dispatch({
          type: FILTER_TEMP,
          payload: dogos,
        });
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};
// export const getAll = async () => {
//   try {
//     const delAPI = await axios.get("http://localhost:3001/dogs/");
//     const deLaDB = await Dog.findByPk();
//     return dispatch({
//       type: GET_ALL,
//       payload: delAPI,
//       deLaDB,
//     });
//   } catch (error) {
//     console.log({ error: error.message });
//   }
// };
