import { FC, memo, useEffect } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { useDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/slices/IngredientsSlice';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const dispatch = useDispatch();
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return <OrdersListUI orderByDate={orderByDate} />;
});
