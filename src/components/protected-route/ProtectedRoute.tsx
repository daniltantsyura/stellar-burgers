import { Preloader } from "@ui";
import { FC, ReactElement, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserLoading, getUser } from "../../services/slices/UserSlice";
import { useSelector } from "../../services/store";

type ProtectedRouteProps = {
    children?: ReactElement;
    onlyUnAuth?: boolean;
}

export const ProtectedRoute = ({children, onlyUnAuth}: ProtectedRouteProps) => {
    const location = useLocation();
    const user = useSelector(getUser);
    const loading = useSelector(getUserLoading);

    if (loading) {
        return <Preloader/>;
    }

    if (onlyUnAuth && !user && location.pathname !== '/login') {
        return <Navigate replace to='/login' state={{from: location}}/>;
    }

    const from: Location = location.state?.from || {pathname: '/profile'};
    if (user && from.pathname !== location.pathname && onlyUnAuth) {

        return <Navigate replace to={from}/>;
    }

    if((children && !onlyUnAuth) || (children && onlyUnAuth && user)) {
        return children;
    }

    return null;
}