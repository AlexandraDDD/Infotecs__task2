import React, { FC } from 'react'
import TaskItem from '../TaskItem/TaskItem'
import { Item } from '../../types/types';


interface TaskListProps {
    items: Item[];
    updateItem: (id: number, title: string, content: string, date: Date) => void;
    toggleDone: (id: number) => void;
    removeItem: (id: number) => void;
}

const TaskList: FC<TaskListProps> = ({ items, updateItem, toggleDone, removeItem }) => {
    return (
        <div className='list'>
            {items.map((item, index) => (
                <TaskItem
                    key={item.id}
                    item={item}
                    updateItem={updateItem}
                    toggleDone={toggleDone}
                    removeItem={removeItem}
                    index={index+1} />
            ))}

        </div>
    )
}

export default TaskList