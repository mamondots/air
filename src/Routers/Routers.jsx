import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SingUp/SingUp";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivetRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import AddRoom from "../Pages/Dasboard/AddRoom";

import { getRoom } from "../API/rooms";
import MyBookings from "../Pages/Dasboard/myBookings";
import MyListings from "../Componet/Dasboard/MyListings";
import ManageBookings from "../Pages/Dasboard/ManageBookings";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/roomdetails/:id",
        element:<PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
        loader:({params}) => getRoom(params.id)
      }
    ]
  },
  {
    path: "/login",
    element:<Login></Login>
  },
  {
    path: "/singup",
    element:<SignUp></SignUp>
  },
  {
    path: "/dasboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'/dasboard',
        element:<MyBookings></MyBookings>
      },
      {
        path:'/dasboard/add-room',
        element:<AddRoom></AddRoom>
      },
      {
        path:'/dasboard/my-bookings',
        element:<MyBookings></MyBookings>
      },
      {
        path:'/dasboard/my-listings',
        element:<MyListings></MyListings>
      },
      {
        path:'/dasboard/manage-bookings',
        element:<ManageBookings></ManageBookings>
      },
      
    ]
  }
]);