import { useLocation, useNavigate } from "react-router-dom";
import CreateTask from "./CreateTask";

const Dashboard = () => {

    const navigate= useNavigate();


    const handleCreatetask = () => {
    navigate('/createTask')
    };

    return (
        <div className="bg-stone-100 w-screen h-screen flex flex-col items-center pt-3 gap-16">
     <button onClick={handleCreatetask} className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create Task</button>
      
      <div>
        
      </div>
      
      
        </div>
    );
};

export default Dashboard;