// FilterBar.tsx
import React, { FC, useState, useEffect } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Form, Spinner } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import useFetch from '../../hooks/UseFetch';
import { log } from 'console';


export const FilterBar: FC = () => {
  const { setUsers } = useUserContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>('');
  const [url, setUrl] = useState<string | null>(null);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue, 500]);

  
  useEffect(() => {
    if (searchKey && debouncedSearchValue) {
      setUrl(`https://dummyjson.com/users/filter?key=${searchKey}&value=${debouncedSearchValue}`);
    } else if (!debouncedSearchValue) {
      setUrl('https://dummyjson.com/users?limit=5&select=firstName,lastName,maidenName,gender,age,phone,address');
    }
  }, [searchKey, debouncedSearchValue]);

  const { data, loading, error } = useFetch(url);
 
  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data, setUsers]);

  if(loading) return(
    <Spinner></Spinner>
  )
  if(error) return(
    <p>{error}</p>
  )

  return (
    <>
      <Form.Select
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className='mb-2'
      >
        <option value="">Выберите ключ</option>
        <option value="firstName">Имя</option>
        <option value="lastName">Фамилия</option>
        <option value="maidenName">Отчество</option>
        <option value="gender">Пол</option>
        <option value="age">Возраст</option>
        <option value="phone">Телефон</option>
        <option value="address.city">Город</option>
        <option value="address.address">Улица</option>
      </Form.Select>
      {searchKey && searchKey !== 'gender' && (
        <MDBInput
          label="Поиск по значению"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
      {searchKey === 'gender' && (
        <Form.Select
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        >
          <option value="">Выберите пол</option>
          <option value="male">Муж.</option>
          <option value="female">Жен.</option>

        </Form.Select>
      )}
    </>
  );
};
