/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import logimg from "../../../assets/authentication.gif";
import logo from "../../../assets/image-250x180.png";
import { BiLogIn } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Authprovider/Authprovider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const Login = () => {

  const {googleSignin}=useContext(AuthContext);

  const { signIn } =useContext(AuthContext);
  const navigate= useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          icon: "success",
          title: "Login success",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      navigate('/')
      .catch((error) => {
        console.log(error);
      });
  };

  const handelGoogle = async () => {
    try {
        const result = await googleSignin();
        const loggedUser = result.user;

        const userinfo = {
            name: result.user?.displayName,
            email: result.user?.email,
            image: result.user.photoURL,
        };

        const res = await axios.post("https://task-management-serverside-ten.vercel.app/taskusers", userinfo);

        if (res.data.insertedId) {
            console.log("User added to the database");
            reset();
            Swal.fire({
                position: "top-start",
                icon: "success",
                title: "Register successful",
                timer: 2000,
            });
            navigate("/");
        }
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={logo} className="w-32 mx-auto" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <form  onSubmit={handleSubmit(onSubmit)} className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  {...register("email", { required: true })}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-600">
                    {errors.email.message || "email is required"}
                  </p>
                )}

                <input
                  {...register("password", { required: true })}
                  className="w-full px-8 
                  py-4 rounded-lg font-medium
                   bg-gray-100 border border-gray-200
                    placeholder-gray-500 
                    text-sm focus:outline-none
                     focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                />
{errors.password && (
                  <p className="text-red-600">
                    {errors.password.message || "password is required"}
                  </p>
                )}
                <div className="w-1/2 flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="mt-1 mr-2"
                  />
<label htmlFor="remember-me">Remember me</label>
                </div>
                <button
          type="submit"
          className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
         <BiLogIn/>
          <span className="ml-3">Login now</span>
        </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  New here please {""}
                  <Link
                    to="/register"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Create an Account!
                  </Link>
                </p>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Login with google
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button onClick={handelGoogle} className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <img
            className="mx-auto flex justify-center rounded-full w-[400px] h-[400px] mt-44"
            src={logimg}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
