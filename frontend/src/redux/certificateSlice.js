// projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ title: "", description: "", type: "", techStack: "" }];

const certificateSlice = createSlice({
    name: "certificate",
    initialState,
    reducers: {
        updateCertificate: (state, action) => {
            const { index, field, value } = action.payload;
            state[index] = { ...state[index], [field]: value };
        },
        addCertificate: (state) => {
            state.push({ title: "", description: "", type: "", techStack: "" });
        },
        deleteCertificate: (state, action) => {
            return state.filter((project, index) => index !== action.payload);
        },
        clearCertificates: () => initialState,
    },
});

export const { updateCertificate, addCertificate, deleteCertificate, clearCertificates } = certificateSlice.actions;
export const selectCertificate = (state) => state.certificate;
export default certificateSlice.reducer;
