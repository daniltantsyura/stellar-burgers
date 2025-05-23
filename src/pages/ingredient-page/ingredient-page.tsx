import { IngredientDetails } from '@components';
import styles from './ingredient-page.module.css';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import { getIngredientsThunk } from '../../services/slices/IngredientsSlice';

export const IngredientPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h3>
      </div>
      <IngredientDetails />
    </div>
  );
};
