import { useState } from 'react';
import { Item } from '../types/types';
import useLocalStorage from './useLocalStorage';

const useList = () => {
  const [items, setItems] = useLocalStorage<Item[]>('items', []);

  const addItem = () => {
    const newItem: Item = { id: Date.now(), title: '', content: '', date: new Date(Date.now()), done: false };
     setItems([newItem, ...items]);
  };

  const updateItem = (id: number, title: string, content: string, date: Date) => {
    setItems(items.map(item => (item.id === id ? { ...item, title, content, date } : item)));
  };

  const toggleDone = (id: number) => {
    setItems(items.map(item => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return {
    items,
    addItem,
    updateItem,
    toggleDone,
    removeItem,
  };
};

export default useList;
