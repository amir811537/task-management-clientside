import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Authprovider/Authprovider";
import Totask from "./Totask";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskItem = ({ task, index, moveTask }) => {
  const [, ref] = useDrag({
    type: "TASK",
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (item) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      <Totask task={task} />
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get("http://localhost:5000/alltask");

          const filteredUser = response.data.filter(
            (userData) =>
              userData?.email?.toLowerCase() === user?.email?.toLowerCase()
          );

          setTasks(filteredUser);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleCreateTask = () => {
    navigate("/createTask");
  };

  const moveTask = (fromIndex, toIndex, toColumn) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);

    // You may want to update the server with the new order and column of tasks here
    try {
      axios.put("http://localhost:5000/updateTasksOrder", {
        tasks: updatedTasks,
        toColumn,
      });
    } catch (error) {
      console.error("Error updating tasks order:", error);
    }

    setTasks(updatedTasks);
  };

  return (
    <div className="bg-stone-100 flex flex-col items-center pt-3 gap-16">
      <button
        onClick={handleCreateTask}
        className="bg-cyan-500 rounded-md px-4 h-12 text-white"
      >
        Create Task
      </button>
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            {/* TODO: Render tasks for "To Do" */}
            {loading ? (
              <p>Loading...</p>
            ) : tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              <ul className="">
                <h1 className="p-4">To Do ...</h1>
                {tasks.map((task, index) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    index={index}
                    moveTask={(fromIndex, toIndex) =>
                      moveTask(fromIndex, toIndex, "todo")
                    }
                  />
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-4 md:col-span-1">
            {/* TODO: Render tasks for "In-Process" */}
            <h1 className="p-4">In-Process</h1>
          </div>

          <div className="col-span-4 md:col-span-1">
            {/* TODO: Render tasks for "Completed" */}
            <h1 className="p-4">Completed</h1>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default Dashboard;
