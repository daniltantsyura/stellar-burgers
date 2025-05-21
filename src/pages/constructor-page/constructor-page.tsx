import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { getIngredientsLoading, getIngredientsThunk } from '../../services/slices/IngredientsSlice';
import { Outlet } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(getIngredientsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  return (
    <>
      <Outlet/>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
