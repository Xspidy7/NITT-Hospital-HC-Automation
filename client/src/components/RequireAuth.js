import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    return (
        auth?.user?.identity && allowedRoles?.includes(auth?.user?.identity)
            ? <Outlet />
            : auth?.user
                ? <Navigate to={`/${auth.user.identity}`} state={{from : location}} replace />
                : <Navigate to="/login" state={{from : location}} replace />
    );
}

export default RequireAuth;