
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";

const image_hostion_api = "https://api.imgbb.com/1/upload?key=1d6fdf8c502424c419510b9f0a67a7f8";


const Updateprofile = () => {
  const navigate = useNavigate()


  const location = useLocation();
  const userInformation = location.state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use userInformation
    console.log("User Information:", userInformation);
    setLoading(false);
  }, [userInformation]);

  const { _id, name,} = userInformation;

  // console.log("=====================",image)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();




  const onSubmit = async (data) => {
    console.log(data.image,data.name,data.phone)

    try {

      const imageFile = { image: data.image[0] };
      const res = await axios.post(image_hostion_api, imageFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        const userInfo = {
          name: data.name,
          image: res.data.data.display_url,
          Phone: data.phone,
          Address: data.address
        };

        const userRes = await axios.put(`https://task-management-serverside-ten.vercel.app/taskusers/${_id}`, userInfo);
        console.log(userInfo);

        if (userRes.data) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.name} Your Profile update successful.`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/myprofile')
        }
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  


  return (
    <div>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div>
          {/* Your update form and UI here */}
          <div className="h-full">
            <div className="mx-auto">
              <div className="flex justify-center px-6 py-12">
                {/* <!-- Col --> */}
                <div className="w-full lg:w-7/12  p-5 rounded-lg ">
                  <h3 className="py-4 text-2xl text-center">
                    Update Your Profile
                  </h3>

                  <form
                    className="px-8 pt-6 pb-8 mb-4  rounded"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold "
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        {...register("name")}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="name"
                        defaultValue={name}
                        type="text"
                        placeholder="Enter Your Name..."
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold "
                        htmlFor="name"
                      >
                        address:
                      </label>
                      <input
                        {...register("address")}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="address"
                        type="text"
                        placeholder="enter your address..."
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold "
                        htmlFor="name"
                      >
                        phone:
                      </label>
                      <input
                        {...register("phone")}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="phone"
                        type="text"
                        placeholder="Phone..."
                      />
                    </div>

                    <div className="form-control w-full py-3 mb-2 max-w-xs">
                      <label
                        className="block mb-2 text-sm font-bold "
                        htmlFor="image"
                      >
                        Update Profile Picture:(150 x 150 pixels)
                      </label>
                      <input
                        {...register("image", { required: true })}
                        type="file"
                        className="file-input w-full "
                      />
                      {errors.image?.type === "required" && (
                        <p className="text-red-600" role="alert">
                          image  is required
                        </p>
                      )}
                    </div>

                    {/* Add more form fields as needed */}

                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Update Information
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Use userInformation data to pre-fill form fields or display information */}
        </div>
      )}
    </div>
  );
};

export default Updateprofile;