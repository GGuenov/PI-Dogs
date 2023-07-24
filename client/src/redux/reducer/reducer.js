import {
  GET_DOGS,
  GET_BY_RAZA,
  SORT_WEIGHT,
  SORT_ALPHA,
  FILTER_ORIGIN,
  FILTER_TEMP,
} from "../actions/actions";

let initialState = { allDogs: [], dogs: [], temperament: [] };

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
      let listedDogos;

      if (action.payload === "DB") {
        listedDogos = state.dogs.filter((dog) => isNaN(dog.id));
      } else if (action.payload === "API") {
        listedDogos = state.dogs.filter((dog) => dog.id <= 264);
      } else if (action.payload === "Todos") {
        listedDogos = state.dogs;
      }

      return {
        ...state,
        allDogs: listedDogos,
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
