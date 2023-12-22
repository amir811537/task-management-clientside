import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout/Mainlayout";
import Home from "../Components/pages/Home/Home";
import Alltask from "../Components/pages/Alltask/Alltask";
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
        }
      ]
    },
  ]);
  export default router;