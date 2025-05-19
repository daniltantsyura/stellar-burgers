import { combineSlices } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import { ingredientsSlice } from "./slices/IngredientsSlice";
import { constructorSlice } from "./slices/ConstructorSlice";

export const rootReducer = combineSlices(userSlice, ingredientsSlice, constructorSlice);
