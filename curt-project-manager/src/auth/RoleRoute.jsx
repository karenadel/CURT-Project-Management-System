import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/useAppContext.js";

function RoleRoute({allowedRoles}) {
    const {currentUser} = useAppContext();
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/projects" replace />;
    }
    return <Outlet/>;
}

export default RoleRoute;