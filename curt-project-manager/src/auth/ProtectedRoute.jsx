import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/useAppContext.js";

function ProtectedRoute() {
    const { currentUser } = useAppContext();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;