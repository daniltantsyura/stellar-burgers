import { Preloader } from "@ui";
import { ReactElement, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserLoading, getUser } from "../../services/slices/UserSlice";
import { useSelector } from "../../services/store";

type ProtectedRouteProps = {
    children: ReactElement;
    onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({children, onlyUnAuth}: ProtectedRouteProps): ReactElement => {
    const location = useLocation();
    const user = useSelector(getUser);
    const loading = useSelector(getUserLoading);

    if (loading) {
        return <Preloader/>
    }

    if (onlyUnAuth && !user && location.pathname !== '/login') {
        return <Navigate replace to='/login' state={{from: location}}/>;
    }

    if (user) {
        const from = location.state?.from || {pathname: '/profile'};

        return <Navigate replace to={from}/>;
    }

    return children;
}