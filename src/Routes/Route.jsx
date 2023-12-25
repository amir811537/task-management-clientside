import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout/Mainlayout";
import Home from "../Components/pages/Home/Home";
import Login from "../Components/pages/Login/Login";
import Register from "../Components/pages/Register/Register";
import Profile from "../Components/pages/Profile/Profile";
import Dashboard from "../Components/pages/Dashboard/Dashboard";
import Updateprofile from "../Components/pages/Profile/Updateprofile";
import PrivateRoutes from "./PrivateRoutes";
import CreateTask from "../Components/pages/Dashboard/CreateTask";
import About from "../Components/pages/About/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "dashboard",
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      },
      {
        path: "myprofile",
        element:<PrivateRoutes><Profile></Profile></PrivateRoutes>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
path: "about",
element:<About></About>
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path:'myprofile/Updateprofile/:id',
        element:<Updateprofile></Updateprofile>,
        loader:({params})=>fetch(`https://task-management-serverside-ten.vercel.app/taskusers/${params.id}`)

      },
      {
        path:'createTask',
        element:<CreateTask></CreateTask>
      }
    ],
  },
]);
export default router;
