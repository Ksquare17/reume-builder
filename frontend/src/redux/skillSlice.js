// redux/skillsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill: (state, action) => {
      state.push({
        skill: action.payload.skill,
        proficiency: action.payload.proficiency,
      });
    },
    updateSkill: (state, action) => {
      const { index, skill, proficiency } = action.payload;
      if (state[index]) {
        state[index] = { skill, proficiency };
      }
    },
    deleteSkill: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addSkill, updateSkill, deleteSkill } = skillsSlice.actions;
export const selectSkills = (state) => state.skills;
export default skillsSlice.reducer;
