import { useState, useEffect } from 'react';
import useFetch from './UseFetch';

const useFilter = (searchKey?: string, searchValue?: string) => {
  const { data, loading, error } = useFetch(
    searchKey && searchValue
      ? `https://dummyjson.com/users/filter?key=${searchKey}&value=${searchValue}`
      : 'https://dummyjson.com/users'
  );

  if (searchKey === undefined || searchValue === undefined) {
    return { data: null, loading: false, error: null };
  }

  return { data, loading, error };
};

export default useFilter;
