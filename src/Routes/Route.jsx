import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout/Mainlayout";
import Home from "../Components/pages/Home/Home";
import Login from "../Components/pages/Login/Login";
import Register from "../Components/pages/Register/Register";
import Profile from "../Components/pages/Profile/Profile";
import Dashboard from "../Components/pages/Dashboard/Dashboard";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      children:[


        {
            path:"/",
            element:<Home></Home>
        },
        {
path: 'dashboard',
element:<Dashboard></Dashboard>
        },
        {
            path:'myprofile',
            element:<Profile></Profile>
        },
        {
          path:'login',
          element:<Login></Login>
        },{
          path:'register',
          element:<Register></Register>
        }
      ]
    },
  ]);
  export default router;