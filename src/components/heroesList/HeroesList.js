import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import {
  heroDeleted,
  fetchHeroes,
  filteredHeroesSelector,
} from '../../components/heroesList/heroesSlice';

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  const onDeleteHero = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(() => {
          console.log('Был удален герой!');
        })
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
    },
    [request]
  );

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

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
