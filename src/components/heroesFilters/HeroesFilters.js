import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFiltersChanged,
} from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
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

  console.log(activeFilter);

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
