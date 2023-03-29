import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
} from '../../actions';

const HeroesList = () => {
  const { filteredHeros, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  console.log(filteredHeros);

  const onDeleteHero = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then((deleteHero) => {
          console.log('Был удален герой: ' + deleteHero);
        })
        .then(dispatch(heroDeleted(id)))
        .catch(() => dispatch(heroesFetchingError()));
    },
    [request]
  );

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  console.log(filteredHeros);

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Героев пока нет</h5>;
    }

    return arr.map(({ ...props }) => {
      return (
        <HeroesListItem key={props.id} {...props} onDeleteHero={onDeleteHero} />
      );
    });
  };

  const elements = renderHeroesList(filteredHeros);
  return <ul>{elements}</ul>;
};

export default HeroesList;
