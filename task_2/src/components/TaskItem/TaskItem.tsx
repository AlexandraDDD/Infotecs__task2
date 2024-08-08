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
  const [endDate, setEndDate] = useState(item.date.toISOString().slice(0, 16));

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateItem(item.id, e.target.value, content, new Date(endDate));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    updateItem(item.id, title, e.target.value, new Date(endDate));
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    updateItem(item.id, title, content, new Date(e.target.value));
  };

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
    <div className="item__wr">


      <form className="form" >
        <div className='form__head'>
          <div className="form__head-content">
            <h5>{index}</h5>

            <input
              className="input__title"
              placeholder="заголовок"
              value={item.title}
              onChange={handleTitleChange}

              required />
            <input
              className="input__date"
              type="datetime-local"
              placeholder="Время окончания"
              value={item.date.toDateString()}
              onChange={handleDateChange}
              required />
          </div>

          <div className='form__actions'>
            <input
              /*  className={styles.CardCheckbox} */
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
          value={item.content}
          onChange={handleContentChange}
          required />
      </form>
    </div>
  )
}

export default TaskItem