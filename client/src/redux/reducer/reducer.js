import {
  GET_DOGS,
  GET_BY_RAZA,
  SORT_WEIGHT,
  SORT_ALPHA,
  FILTER_ORIGIN,
  FILTER_TEMP,
} from "../actions/actions";

let initialState = { allDogs: [], dogs: [], temperament: [] };
// console.log(allDogs);
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
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
    case SORT_WEIGHT: {
      const weightOrder = action.payload;

      const sortedData = state.allDogs.slice().sort((a, b) => {
        if (weightOrder === "Mayor") {
          return b.weightMax - a.weightMax;
        } else if (weightOrder === "Menor") {
          return a.weightMax - b.weightMax;
        }
        return 0;
      });

      return {
        ...state,
        allDogs: sortedData,
      };
    }
    case SORT_ALPHA: {
      const alphabeticOrder = action.payload;

      const sortedData = state.allDogs.slice().sort((a, b) => {
        if (alphabeticOrder === "Ascendente") {
          return a.name.localeCompare(b.name);
        } else if (alphabeticOrder === "Descendente") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });

      return {
        ...state,
        allDogs: sortedData,
      };
    }
    case FILTER_ORIGIN: {
      let listedDogs;

      if (action.payload === "DB") {
        listedDogs = state.dogs.filter((dog) => dog.id > 269);
      } else if (action.payload === "API") {
        listedDogs = state.dogs.filter((dog) => dog.id <= 264);
      } else if (action.payload === "Todos") {
        listedDogs = state.dogs;
      }

      return {
        ...state,
        allDogs: listedDogs,
      };
    }
    case FILTER_TEMP:
      return {
        ...state,
        allDogs: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
