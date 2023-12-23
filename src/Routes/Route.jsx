import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout/Mainlayout";
import Home from "../Components/pages/Home/Home";
import Alltask from "../Components/pages/Alltask/Alltask";
import Login from "../Components/pages/Login/Login";
import Register from "../Components/pages/Register/Register";
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
            path:'all_task',
            element:<Alltask></Alltask>
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