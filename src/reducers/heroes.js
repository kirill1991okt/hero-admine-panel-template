const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'HERO_CREATED':
      const ArrHeroes = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: ArrHeroes,
      };
    case 'HERO_DELETED':
      const newArrHeroes = state.heroes.filter(
        (hero) => hero.id !== action.payload
      );
      return {
        ...state,
        heroes: newArrHeroes,
      };
    default:
      return state;
  }
};

export default heroes;
