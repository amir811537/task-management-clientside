/* eslint-disable react/prop-types */

const Totask = ({task,handleDeleteReq}) => {
    return (
<div  className=' p-4'>
    
<li  key={task._id} className="bg-sky-400 text-white border-rose-400 rounded-md border p-4">
                <h3>{""}{task.task_title}</h3>
                 <p>Priority: {task.priority}</p>
                 <p>Deadline: {task.deadlines}</p>
                <p>Description: {task.descriptions}</p>
                <button className='bg-red-300 text-center' onClick={() => handleDeleteReq(task)}> deleted item</button>
            </li>
</div>
    );
};

export default Totask;