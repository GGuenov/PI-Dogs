import axios from "axios";
// import weightRange from "../../components/filters/filters";

export const GET_DOGS = "GET_DOGS";
export const GET_BY_RAZA = "GET_DOGS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const SORT_WEIGHT = "SORT_WEIGHT";
export const SORT_ALPHA = "ALPHABETIC";
export const FILTER_BY_WEIGHT_RANGE = "FILTER_BY_WEIGHT_RANGE";
export const FILTER_BY_HEIGHT_RANGE = "FILTER_BY_WEIGHT_RANGE";
export const FILTER_TEMP = "FILTER_TEMP";
export const GET_ALL = "GET_ALL";

export function getDogs() {
  return async function (dispatch) {
    const response = await axios.get(`/dogs/`);

    return dispatch({ type: GET_DOGS, payload: response.data });
  };
}
export function getByRaza(name) {
  return async function (dispatch) {
    const response = await axios.get(`/dogs/:${name}`);
    if (!response) response = await axios.get(`/cats/:${name}`);
    return dispatch({
      type: GET_BY_RAZA,
      payload: response.data,
    });
  };
}
export const weightRanger = (newRange) => {
  console.log(newRange);
  return {
    type: FILTER_BY_WEIGHT_RANGE,
    payload: newRange,
  };
};
export const heightRanger = (newRange) => {
  console.log(newRange);
  return {
    type: FILTER_BY_HEIGHT_RANGE,
    payload: newRange,
  };
};

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
        const response = await axios.get(`/dogs/`);
        const data = response.data;
        return dispatch({
          type: FILTER_TEMP,
          payload: data,
        });
      } else {
        const response = await axios.get(`/dogs/`);
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
