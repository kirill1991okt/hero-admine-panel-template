import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Spinner from '../spinner/Spinner';
import store from '../../store/index';

import {
  activeFiltersChanged,
  fetchFilters,
  selectAll,
} from '../heroesFilters/filtersSlice';

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const filters = selectAll(store.getState());
  console.log(filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const buttonElem = filters.map(({ value, text, classes }) => {
    const btnClass = classNames(classes, {
      active: value === activeFilter,
    });
    return (
      <button
        key={text}
        onClick={() => dispatch(activeFiltersChanged(value))}
        name={value}
        className={btnClass}
      >
        {text}
      </button>
    );
  });

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>{buttonElem}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
