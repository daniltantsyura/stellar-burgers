import { Preloader } from '@ui';
import { FC, ReactElement, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getUserLoading,
  getUser,
  getUserThunk
} from '../../services/slices/UserSlice';
import { useDispatch, useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children?: ReactElement;
  onlyAuth?: boolean;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyAuth,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(getUser);
  const loading = useSelector(getUserLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUserThunk());
    }
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (!user && location.pathname !== '/login') {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  const from: Location = location.state?.from || { pathname: '/profile' };

  if (user && from.pathname !== location.pathname && onlyUnAuth) {
    return <Navigate replace to={from} />;
  }

  if ((children && !onlyAuth) || (children && onlyAuth && user)) {
    return children;
  }

  return null;
};
