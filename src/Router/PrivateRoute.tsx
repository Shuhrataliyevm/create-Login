import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
    const token: string | null = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
