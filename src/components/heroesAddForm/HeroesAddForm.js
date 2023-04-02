import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../spinner/Spinner';

import { heroCreated } from '../../components/heroesList/heroesSlice';

const HeroesAddForm = () => {
  const { filters, filtersLoadingStatus } = useSelector((state) => state);
  const [hero, setHero] = useState({ name: '', description: '', element: '' });
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandle = (e) => {
    e.preventDefault();

    const newHero = { id: uuidv4(), ...hero };
    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
      .then((data) => console.log(data, 'Отправка успешна'))
      .then(dispatch(heroCreated(newHero)));

    setHero({ name: '', description: '', element: '' });
  };

  const createOptions = (filters, status) => {
    if (status === 'loading') {
      return <Spinner />;
    } else if (status === 'error') {
      return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ value, text }) => {
        if (value === 'all') return;
        return (
          <option key={value} value={value}>
            {text}
          </option>
        );
      });
    }
  };

  return (
    <form className='border p-4 shadow-lg rounded'>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fs-4'>
          Имя нового героя
        </label>
        <input
          onChange={(e) => {
            let name = e.target.value;
            setHero((prev) => ({ ...prev, name }));
          }}
          value={hero.name}
          required
          type='text'
          name='name'
          className='form-control'
          id='name'
          placeholder='Как меня зовут?'
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='text' className='form-label fs-4'>
          Описание
        </label>
        <textarea
          onChange={(e) => {
            let description = e.target.value;
            setHero((prev) => ({ ...prev, description }));
          }}
          value={hero.description}
          required
          name='text'
          className='form-control'
          id='text'
          placeholder='Что я умею?'
          style={{ height: '130px' }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='element' className='form-label'>
          Выбрать элемент героя
        </label>
        <select
          onChange={(e) => {
            let element = e.target.value;
            setHero((prev) => ({ ...prev, element }));
          }}
          value={hero.element}
          required
          className='form-select'
          id='element'
          name='element'
        >
          <option value=''>Я владею элементом...</option>
          {createOptions(filters.filters, filtersLoadingStatus)}
        </select>
      </div>

      <button
        onClick={(e) => onSubmitHandle(e)}
        type='submit'
        className='btn btn-primary'
      >
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
