import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructor
} from '../../services/slices/ConstructorSlice/ConstructorSlice';
import {
  clearCurrentOrder,
  getCurrentOrder,
  getOrderRequest,
  orderBurgerThunk
} from '../../services/slices/OrderSlice/OrdersSlice';
import {
  getUser,
  getUserThunk
} from '../../services/slices/UserSlice/UserSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const location = useLocation();
  const constructorItems = useSelector(getConstructor);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getCurrentOrder);

  const onOrderClick = () => {
    dispatch(getUserThunk());
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(
      orderBurgerThunk([
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ])
    ).then((action) => {
      if (orderBurgerThunk.fulfilled.match(action)) {
        dispatch(clearConstructor());
      }
    });
  };
  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients
        ? constructorItems.ingredients?.reduce(
            (s: number, v: TConstructorIngredient) => s + v.price,
            0
          )
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
