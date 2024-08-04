// qualificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const qualificationSlice = createSlice({
    name: "qualification",
    initialState,
    reducers: {
        updatequalification: (state, action) => {
            const { index, field, value } = action.payload;
            state[index] = { ...state[index], [field]: value };
        },
        addqualification: (state) => {
            state.push({ institute: "", fos: "", degree: "", startYear: "",endYear:"",grade:"" });
        },
        deletequalification: (state, action) => {
            return state.filter((qualification, index) => index !== action.payload);
        },
        clearqualifications: () => initialState,
    },
});

export const { updatequalification, addqualification, deletequalification, clearqualifications } = qualificationSlice.actions;
export const selectqualification = (state) => state.qualification;
export default qualificationSlice.reducer;
