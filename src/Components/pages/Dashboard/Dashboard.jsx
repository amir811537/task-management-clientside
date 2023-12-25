import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Authprovider/Authprovider";
import Totask from "./Totask";
import Swal from "sweetalert2";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const [refetchKey, setRefetchKey] = useState(0);
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const navigate = useNavigate();

  const refetch = () => {
    // Increment the key to trigger a re-render and refetch
    setRefetchKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email) {
          const response = await axios.get("https://task-management-serverside-ten.vercel.app/alltask");

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

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-management-serverside-ten.vercel.app/alltask/${taskId}`);
      // Fetch the updated tasks after the delete operation
      const response = await axios.get("https://task-management-serverside-ten.vercel.app/alltask");
      const filteredUser = response.data.filter(
        (userData) =>
          userData?.email?.toLowerCase() === user?.email?.toLowerCase()
      );
      setTasks(filteredUser);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Task deleted successfully",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCreateTask = () => {
    navigate("/createTask");
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const movedTask = updatedTasks.find((task) => task._id === draggableId);
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    try {
      await axios.patch(`https://task-management-serverside-ten.vercel.app/alltask/${draggableId}`, {
        status: destination.droppableId,
      });

      // Fetch the updated tasks after the patch operation
      const response = await axios.get("https://task-management-serverside-ten.vercel.app/alltask");
      const filteredUser = response.data.filter(
        (userData) =>
          userData?.email?.toLowerCase() === user?.email?.toLowerCase()
      );
      setTasks(filteredUser);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Task added successfully",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    if (tasks) {
      const filteredTodo = tasks.filter((item) => item.status === "todo");
      const filteredProgress = tasks.filter(
        (item) => item.status === "progress"
      );
      const filteredCompleted = tasks.filter(
        (item) => item.status === "completed"
      );
      setTodo([...filteredTodo]);
      setProgress([...filteredProgress]);
      setCompleted([...filteredCompleted]);
    }
  }, [tasks]);

  const [openDropdownMap, setOpenDropdownMap] = useState({});

  const toggleDropdown = (taskId) => {
    setOpenDropdownMap((prevMap) => ({
      ...prevMap,
      [taskId]: !prevMap[taskId],
    }));
  };

  return (
    <div className="bg-stone-100 flex flex-col items-center pt-3 gap-16">
      <button
        onClick={handleCreateTask}
        className="bg-cyan-500 rounded-md px-4 h-12 text-white"
      >
        Create Task
      </button>

      <div className="">
        <div className="px-5">
          <div className="flex  justify-center items-center content-center mt-5">
            <h1 className="mx-auto text-center text-3xl">
              Welcome Back{" "}
              <span className=" text-blue-500">{user?.email},</span> Here Your
              Daily Task
            </h1>
            <p className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 mt-10">
            <DragDropContext onDragEnd={onDragEnd}>
              <div>
                <Droppable droppableId="todo">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-[#EEF2F5] px-4"
                    >
                      <div className=" min-h-screen">
                        <h1 className="text-center mt-3 mb-3">Todo</h1>
                        {todo?.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                key={task._id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="w-full bg-white border border-gray-200 rounded-lg shadow my-5"
                              >
                                <div className="p-4">
                                  <h1 className="text-2xl text-red-600 ">
                                    {task.task_title}
                                  </h1>
                                  <h1 className="text-yellow-300">
                                    {task.priority}
                                  </h1>
                                  <p>{task.descriptions}</p>
                                  <div className="flex items-center justify-between mt-4">
                                    <span>{task.deadlines}</span>
                                    <button
                                      onClick={() => handleDeleteTask(task._id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              <div>
                <Droppable droppableId="progress">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-[#EEF2F5] px-4"
                    >
                      <div className=" min-h-screen">
                        <h1 className="text-center mt-3 mb-3">Progress</h1>
                        {progress?.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                key={task._id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="w-full  mx-auto  bg-white border border-gray-200 rounded-lg shado my-5"
                              >
                                <div className="px-4 pt-4">
                                  <div className="relative">
                                    <div className="flex justify-between items-center">
                                      <h1 className="text-red-600 uppercase">
                                        {task.title}
                                      </h1>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4">
                                  <h1 className="text-2xl text-red-600 ">
                                    {task.task_title}
                                  </h1>
                                  <h1 className=" text-yellow-300">
                                    {task.priority}
                                  </h1>
                                  <p>{task.descriptions}</p>
                                  <div className="flex items-center justify-between mt-4">
                                    <span>{task.deadlines}</span>
                                    <button
                                      onClick={() => handleDeleteTask(task._id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              <div>
                <Droppable droppableId="completed">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-[#EEF2F5] px-4"
                    >
                      <div className=" min-h-screen">
                        <h1 className="text-center mt-3 mb-3">Complete</h1>
                        {completed?.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                key={task._id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="w-full justify-center mx-auto max-w-sm
                                 bg-green-500 border border-gray-200 rounded-lg shado my-5"
                              >
                                <div className="px-4 pt-4">
                                  <div className="relative">
                                    <div className="flex justify-between items-center">
                                      <h1 className="text-red-600 uppercase">
                                        {task.title}
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h1 className="text-2xl text-red-600 ">
                                    {task.task_title}
                                  </h1>
                                  <h1 className=" text-yellow-300">
                                    {task.priority}
                                  </h1>
                                  <p>{task.descriptions}</p>
                                  <div className="flex items-center justify-between mt-4">
                                    <span>{task.deadlines}</span>
                                    <button
                                      onClick={() => handleDeleteTask(task._id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
