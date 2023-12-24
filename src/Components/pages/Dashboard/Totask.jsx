/* eslint-disable react/prop-types */
import React from 'react';

const Totask = ({task}) => {
    return (
<div className=' p-4'>
<li  key={task._id} className="bg-sky-400 text-white border-rose-400 rounded-md border p-4">
                <h3>{""}{task.task_title}</h3>
                 <p>Priority: {task.priority}</p>
                 <p>Deadline: {task.deadlines}</p>
                <p>Description: {task.descriptions}</p>
            </li>
</div>


        // {tasks.map((task) => (
        //     <li key={task._id} className="task-item">
        //         <h3>{task.task_title}</h3>
        //         <p>Priority: {task.priority}</p>
        //         <p>Deadline: {task.deadlines}</p>
        //         <p>Description: {task.descriptions}</p>
        //     </li>
        // ))} 
    );
};

export default Totask;