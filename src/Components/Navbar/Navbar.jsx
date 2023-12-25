import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/image-250x180.png'
import { AuthContext } from "../../Authprovider/Authprovider";
const Navbar = () => {

const {user,logout}=useContext(AuthContext);




const handelsingout = () => {
  logout()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

  useEffect(() => {
    const toggleMenu = () => {
      const navToggle = document.getElementsByClassName("toggle");
      for (let i = 0; i < navToggle.length; i++) {
        navToggle[i].classList.toggle("hidden");
      }
    };

    document.getElementById("hamburger").addEventListener("click", toggleMenu);

    return () => {
      document
        .getElementById("hamburger")
        .removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <nav className="flex flex-wrap items-center justify-between p-3 bg-sky-400">
     <div className="pl-10"> 
     <img
        src={logo}
        className="h-10 w-10 "
        alt="ACME"
        width="120"
      /> 
     </div>
      <div className="flex md:hidden">
        <button id="hamburger">
          <img
            className="toggle block"
            src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
            width="40"
            height="40"
          />
          <img
            className="toggle hidden"
            src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
            width="40"
            height="40"
          />
        </button>
      </div>
      <div className="toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
        <Link
          to="/"
          className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
        >
          Home
        </Link>
        <Link
          to="dashboard"
          className="block md:inline-block text-blue-900
           hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
        >
          My Dashboard
        </Link>
       
        <Link
          to="myprofile"
          className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
        >
          My profile
        </Link>
        <Link
          to="about"
          className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
        >
         About us
        </Link>
        {user? <></> :<Link
          to="login"
          className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
        >
          Login
        </Link>}
       
      </div>
     { user? <> <button className="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-500 text-white md:rounded" onClick={handelsingout}>
            Sign Out
          </button></>: <Link
        to="register"
        className="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-500 text-white md:rounded"
      >
        Create Account
      </Link>}
    </nav>
  );
};

export default Navbar;
