import {  useEffect } from "react";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Price from "../Priceing/Price";
import { messaging } from "../../../Firebase/firebase.config";
import { getToken } from "firebase/messaging";
import axios from "axios";

const Home = () => {



  async function requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // generate token
        const token = await getToken(messaging, {
          vapidKey:
            "BOlYcT3OsqUVbhhm8QoJiX8eldrUriBqhz2C1pwhluqO8uhCHUoNvWXZnMsrQX8ZQACpUZbeHS-syi-hdn0Td7M",
        });
        // console.log("this is token =====>", token);

        // Make sure to await the axios.post call
        const res = await axios.post("https://task-management-serverside-ten.vercel.app/allUserToken", {
          token
        });

        if (res.data.insertedId) {
          alert("token saved in mongodb");
        }
        // in this token storage in DB using post method
        //  then you added into firebase cloude messaging tools and send your message
      } else if (permission === "denied") {
        alert("you are denied for the notification");
      }
    } catch (error) {
      console.error("Error requesting permission or sending token:", error);
    }
  }

  useEffect(() => {
    // req user for get notification permission
    requestPermission();
  }, []);

  return (
    <div>
      <Banner></Banner>,<About></About>
      <Price></Price>
    </div>
  );
};

export default Home;
