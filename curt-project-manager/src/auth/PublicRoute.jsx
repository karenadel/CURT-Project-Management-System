import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/useAppContext.js";

function PublicRoute() {
    const { currentUser } = useAppContext();

    if (currentUser) {
        return <Navigate to="/projects" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;