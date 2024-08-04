// projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const educationSlice = createSlice({
    name: "education",
    initialState,
   
    reducers: {
        updateEducation: (state, action) => {
            const { index, field, value } = action.payload;
            state[index] = { ...state[index], [field]: value };
        },
        addEducation: (state) => {
            state.push({name: "", degree: "", fos: "", startYear: "" , endYear:"", grade:""});
        },
        deleteEducation: (state, action) => {
            return state.filter((project, index) => index !== action.payload);
        },
        clearEducation: () => initialState,
    },
});

export const { updateEducation, addEducation, deleteEducation, clearEducation } = educationSlice.actions;
export const selectEducation = (state) => state.education;
export default educationSlice.reducer;
