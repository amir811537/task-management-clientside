import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Authprovider/Authprovider";

const CreateTask = () => {
  const navigate = useNavigate();
  const {user}=useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const taskInfo = {
        task_title: data.title,
        priority: data.priority,
        deadlines: data.deadlines,
        descriptions: data.descriptions,
        email:user?.email,
        status: "todo"
      };

      const res = await axios.post("http://localhost:5000/alltask", taskInfo);

      if (res.data.insertedId) {
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "task added successful",
            timer: 2000,
        });        reset(); // Use reset to clear the form
        // Optionally, you can add a success message or navigation logic here
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-16 p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Create a task!</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1">
          Task title:
        </label>
        <input
          {...register("title", { required: true })}
          type="text"
          id="title"
          name="title"
          placeholder="Enter task title ...."
          className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-600">
            {errors.title.message || "Title is required"}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block mb-1">
          Priority:
        </label>
        <select
          {...register("priority", { required: true })}
          id="priority"
          name="priority"
          className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="null" selected="">
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-600">
            {errors.priority.message || "Priority is required"}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="deadlines" className="block mb-1">
          Deadlines
        </label>
        <input
          {...register("deadlines", { required: true })}
          type="date"
          id="deadlines"
          name="deadlines"
          className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.deadlines && (
          <p className="text-red-600">
            {errors.deadlines.message || "Deadlines is required"}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="descriptions" className="block mb-1">
          Descriptions
        </label>
        <textarea
          {...register("descriptions", { required: true })}
          id="descriptions"
          name="descriptions"
          className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.descriptions && (
          <p className="text-red-600">
            {errors.descriptions.message || "Descriptions is required"}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateTask;
