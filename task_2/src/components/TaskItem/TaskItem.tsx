import React, { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from 'react'
import './TaskItem.scss'
import { Item } from '../../types/types';
import { FaTimes } from 'react-icons/fa';

interface TaskItemProps {
  item: Item;
  updateItem: (id: number, title: string, content: string, date: Date) => void;
  toggleDone: (id: number) => void;
  removeItem: (id: number) => void;
  index: number;
}

const TaskItem: FC<TaskItemProps> = ({ item, updateItem, toggleDone, removeItem, index }) => {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [endDate, setEndDate] = useState(item.date);

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateItem(item.id, e.target.value, content, new Date(endDate));
  }, [item.id, content, endDate, updateItem]);

  const handleContentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    updateItem(item.id, title, e.target.value, new Date(endDate));
  }, [item.id, title, endDate, updateItem]);

  const handleDateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    const localDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
    setEndDate(localDate);
    updateItem(item.id, title, content, localDate);
  }, [item.id, title, content, updateItem]);


  const handleBlur = () => {
    if (!item.title) {
      removeItem(item.id);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toggleDone(item.id);
    }
  };
  const handleRemoveKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      removeItem(item.id);
    }
  };

  const setFocus = useCallback((element: HTMLInputElement | null) => {
    if (element) element.focus();
  }, []);
  return (
    <div className="item__wr" >


      <form className="form" >
        <div className='form__head'>
          <div className="form__head-content">
            <h3>{index})</h3>

            <input
              className="input__title"
              placeholder="заголовок"
              value={item.title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              ref={setFocus}
              required />
            <input
              className="input__date"
              type="datetime-local"
              placeholder="Время окончания"
              value={
                item.date instanceof Date
                  ? item.date.toISOString().slice(0, 16)
                  : new Date().toISOString().slice(0, 16)
              }
              onChange={handleDateChange}
              required />
          </div>

          <div className='form__actions'>
            <input
              className='input__checkbox'
              type="checkbox"
              checked={item.done}

              onChange={() => toggleDone(item.id)}
            />
            <div
              className='remove'
              onClick={() => removeItem(item.id)}
              tabIndex={0}
              onKeyDown={handleRemoveKeyDown}
            >
              <FaTimes />
            </div>
          </div  >

        </div>
        <textarea
          placeholder="содержание"
          onBlur={handleBlur}
          value={item.content}
          onChange={handleContentChange}
        />
      </form>
    </div>
  )
}

export default TaskItem