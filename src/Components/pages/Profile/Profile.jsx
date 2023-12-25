import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../../Authprovider/Authprovider";
import axios from "axios";
import userprofile from'../../../../public/Untitled_design-removebg-preview.png'

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [finalUser, setFinalUser] = useState([]);
    const [loading, setLoading] = useState(true);
const navigate =useNavigate()
    // console.log("=============================>", finalUser);

    useEffect(() => {
        if (user && user.email) {
           axios.get('https://task-management-serverside-ten.vercel.app/taskusers')
                .then((data) => {
                    const filteredUser = data.data.filter((userData) => userData.email.toLowerCase() === user.email.toLowerCase());
                    setFinalUser(filteredUser);
                    setLoading(false);
                });
        }
    }, [user]);




    const handleUpdateInfo = () => {
        // Make sure _id is defined before navigating
        const _id = finalUser[0]?._id;
        if (_id) {
            // Pass user information as state during navigation
            navigate(`Updateprofile/${_id}`, { state: finalUser[0] });
        }
    };



    return (
        <div className="w-full justify-center">
            
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <div className="">
    <div className="bg-white shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={finalUser[0].image} alt="update picture"/>
        </div>
        <div className="p-2 text-center">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{finalUser[0].name}</h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
                <p>{finalUser[0].profession}</p>
                
            </div>
            <div className="my-3">

            <div className="flex items-center mb-2">
                    <div className="w-1/3 text-gray-500 font-semibold"></div>
                    <div className="w-2/3 text-red-500"><p>{finalUser[0].Blood_Group}</p></div>
                </div>
                <div className="flex items-center mb-2">
                    <div className="w-1/3 text-gray-500 font-semibold">Address</div>
                    <div className="w-2/3">{finalUser[0].Address}</div>
                </div>
               
             
                
                <div className="flex items-center mb-2">
                    <div className="w-1/3 text-gray-500 font-semibold">Email</div>
                    <div className="w-2/3">{finalUser[0].email}</div>
                </div>
                <div className="flex items-center mb-2">
                    <div className="w-1/3 text-gray-500 font-semibold">Phone</div>
                    <div className="w-2/3">{finalUser[0].Phone}</div>
                </div>
            </div>

            <button  onClick={handleUpdateInfo} className="underline text-blue-600">
                                Update your information
                            </button>

        </div>
    </div>
</div>

            )}
        </div>
    );
};

export default Profile;