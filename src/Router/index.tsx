import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/profile";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import PrivateRoute from "./PrivateRoute";
import Calendar  from "../pages/Calendar/calendar";
import Products from "../pages/Products/products";
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/products" element={<Products />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default Router;