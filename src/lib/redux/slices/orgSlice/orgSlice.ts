import { createSlice } from "@reduxjs/toolkit";

import { fetchOrgs } from "./thunks";

const initialState: OrgSliceState = {
  value: null,
  status: "loading",
};

export const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrgs.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export interface OrgSliceState {
  value: any;
  status: "idle" | "loading" | "failed";
}
