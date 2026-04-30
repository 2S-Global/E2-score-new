import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: {
    keyword: "",
    gender: [],
    admissionYear: "",
    marks: {
      tenth: [0, 100],
      twelfth: [0, 100],
      graduation: [0, 100],
    },
    exclude: {
      interview: false,
      placed: false,
    },
  },
};

const filterInstitute = createSlice({
  name: "filterInstitute",
  initialState,
  reducers: {
    addKeyword: (state, { payload }) => {
      state.studentList.keyword = payload;
    },

    addGender: (state, { payload }) => {
      const value = payload;

      const exists = state.studentList.gender.includes(value);

      if (exists) {
        state.studentList.gender = state.studentList.gender.filter(
          (g) => g !== value,
        );
      } else {
        state.studentList.gender.push(value);
      }
    },

    addAdmissionYear: (state, { payload }) => {
      state.studentList.admissionYear = payload;
    },
    setExclude: (state, { payload }) => {
      const { key, value } = payload;
      state.studentList.exclude[key] = value;
    },

    // ✅ NEW
    setMarksRange: (state, { payload }) => {
      const { type, range } = payload;
      state.studentList.marks[type] = range;
    },

    clearInstituteFilter: (state) => {
      state.studentList.keyword = "";
      state.studentList.gender = [];
      state.studentList.admissionYear = "";
      state.studentList.marks = {
        tenth: [0, 100],
        twelfth: [0, 100],
        graduation: [0, 100],
      };
    },
  },
});

export const {
  addKeyword,
  addGender,
  addAdmissionYear,
  setMarksRange, // ✅ export this
  clearInstituteFilter,
  setExclude
} = filterInstitute.actions;

export default filterInstitute.reducer;
