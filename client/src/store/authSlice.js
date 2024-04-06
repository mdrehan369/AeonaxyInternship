import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload;
            return state;
        }
    }
});

export const { login } = authSlice.actions;

export default authSlice.reducer;