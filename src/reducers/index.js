const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filteredHeros: [],
};

const reducer = (state = initialState, action) => {
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
        filteredHeros:
          state.activeFilter === 'all'
            ? action.payload
            : action.payload.filter(
                (item) => item.element === state.activeFilter
              ),
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'ACTIVE_FILTERS_CHANGED':
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeros:
          action.payload === 'all'
            ? state.heroes
            : state.heroes.filter((item) => item.element === action.payload),
      };
    case 'HERO_CREATED':
      const ArrHeroes = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: ArrHeroes,
        filteredHeros:
          state.activeFilter === 'all'
            ? ArrHeroes
            : ArrHeroes.filter((item) => item.element === state.activeFilter),
      };
    case 'HERO_DELETED':
      const newArrHeroes = state.heroes.filter(
        (hero) => hero.id !== action.payload
      );
      return {
        ...state,
        heroes: newArrHeroes,
        filteredHeros:
          state.activeFilter === 'all'
            ? newArrHeroes
            : newArrHeroes.filter(
                (item) => item.element === state.activeFilter
              ),
      };
    default:
      return state;
  }
};

export default reducer;
