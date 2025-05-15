import { combineSlices } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";

export const rootReducer = combineSlices(userSlice);
