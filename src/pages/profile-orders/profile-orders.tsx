import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  getOrdersThunk
} from '../../services/slices/OrderSlice/OrdersSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return (
    <>
      <ProfileOrdersUI orders={orders} />
    </>
  );
};
