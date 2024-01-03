/* Instruments */
import { counterSlice } from "./slices";
import { orgSlice } from "./slices/orgSlice";

export const reducer = {
  counter: counterSlice.reducer,
  org: orgSlice.reducer,
};
