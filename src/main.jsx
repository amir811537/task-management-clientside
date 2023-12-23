import React from 'react'
import ReactDOM from 'react-dom/client'


import {
  RouterProvider
} from "react-router-dom";


import './index.css'
import router from './Routes/Route.jsx';
import Authprovider from './Authprovider/Authprovider.jsx';
// import Authprovider from './Authprovider/Authprovider.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-7xl mx-auto'>

<Authprovider><RouterProvider router={router} /></Authprovider>
 
    </div>

  </React.StrictMode>,
)
