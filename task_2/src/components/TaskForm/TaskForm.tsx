import React, { useState } from 'react';

const TaskForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleVisible = () => {
    setFormVisible(true);
  };

  return (
    <>
      <button className="btn" onClick={handleVisible}>
        Добавить задачу
      </button>
      {formVisible && (
        <form className="form">
          <input placeholder="заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="содержание" value={content} onChange={(e) => setContent(e.target.value)} />
          <input type="datetime-local" placeholder="Время окончания" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </form>
      )}
    </>
  );
};

export default TaskForm;
