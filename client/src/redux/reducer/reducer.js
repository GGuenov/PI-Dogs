import { GET_DOGS, GET_BY_RAZA } from "../actions/actions";

let initialState = { allDogs: [], dogs: [] };
//console.log(initialState);

function rootReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case GET_DOGS:
      // console.log(action.payload);
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };
    case GET_BY_RAZA:
      return {
        ...state,
        allDogs: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
