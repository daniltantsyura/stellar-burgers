import { IngredientDetails, OrderInfo } from '@components';
import styles from './order-page.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import { getOrderByNumberThunk } from '../../services/slices/OrdersSlice';
import { getIngredientsThunk } from '../../services/slices/IngredientsSlice';
import { useSelector } from 'react-redux';

export const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const {number} = useParams();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={`${styles.title} text text_type_main-large`}>
          {`#${number}`}
        </h3>
      </div>
      <OrderInfo />
    </div>
  );
};
