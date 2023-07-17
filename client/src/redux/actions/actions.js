import axios from "axios";
//import rootReducer from "../reducer/reducer";

export const GET_DOGS = "GET_DOGS";
export const GET_BY_RAZA = "GET_DOGS";

export function getDogs() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/dogs/`);
    // console.log(response);
    // console.log(response.data);
    return dispatch({ type: GET_DOGS, payload: response.data });
  };
}
export function getByRaza(name) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/dogs/${name}`);
    return dispatch({
      type: GET_BY_RAZA,
      payload: response.data,
    });
  };
}
//console.log(response);
//export default getDogs;
