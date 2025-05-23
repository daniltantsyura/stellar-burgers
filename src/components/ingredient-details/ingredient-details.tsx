import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useParams } from 'react-router-dom';
import { getAllIngredients, getIngredientsThunk } from '../../services/slices/IngredientsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const {id} = useParams<{id: string}>();
  const ingredientData = useSelector(getAllIngredients).find((ingredient) => (ingredient._id === id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
