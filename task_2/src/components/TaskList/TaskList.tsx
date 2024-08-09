import React, { FC, useMemo, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Item } from '../../types/types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.scss'

interface TaskListProps {
    items: Item[];
    updateItem: (id: number, title: string, content: string, date: Date) => void;
    toggleDone: (id: number) => void;
    removeItem: (id: number) => void;
}

const TaskList: FC<TaskListProps> = ({ items, updateItem, toggleDone, removeItem }) => {
    const [filter, setFilter] = useState<'all' | 'done' | 'undone'>('all');
    const [sort, setSort] = useState<'date' | 'title' | 'none'>('date');


    const filteredItems = useMemo(() => {
        return items.filter(item => {
          if (filter === 'all') return true;
          if (filter === 'done') return item.done;
          if (filter === 'undone') return !item.done;
        });
      }, [items, filter]);
    
      const sortedItems = useMemo(() => {
        return filteredItems.sort((a, b) => {
          if (sort === 'date') {
            const aDate = a.date instanceof Date ? a.date.getTime() : new Date().getTime();
            const bDate = b.date instanceof Date ? b.date.getTime() : new Date().getTime();
            return aDate - bDate;
          }
          if (sort === 'title') {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
      }, [filteredItems, sort]);


    return (
        <div className="list">
            <div className='filter'>
                <h3>Фильтрация</h3>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="all"
                        checked={filter === 'all'}
                        onChange={() => setFilter('all')}
                    />
                    Все
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="done"
                        checked={filter === 'done'}
                        onChange={() => setFilter('done')}
                    />
                    Завершенные
                </label>
                <label>
                    <input
                        type="radio"
                        name="filter"
                        value="undone"
                        checked={filter === 'undone'}
                        onChange={() => setFilter('undone')}
                    />
                    Незавершенные
                </label>
            </div>
            <div className='sort'>
                <h3>Сортировка</h3>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="none"
                        checked={sort === 'none'}
                        onChange={() => setSort('none')}
                    />
                    Без сортировки
                </label>

                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="date"
                        checked={sort === 'date'}
                        onChange={() => setSort('date')}
                    />
                    Дата завершения
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="title"
                        checked={sort === 'title'}
                        onChange={() => setSort('title')}
                    />
                    Заголовок
                </label>
            </div>
            <TransitionGroup>
                {sortedItems.map((item, index) => (
                    <CSSTransition key={item.id} timeout={500} classNames="item">
                        <TaskItem
                            item={item}
                            updateItem={updateItem}
                            toggleDone={toggleDone}
                            removeItem={removeItem}
                            index={index + 1}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>

        </div>
    );
};

export default TaskList;
