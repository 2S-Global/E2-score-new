import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: "",
    location: "",
    destination: {
        min: 0,
        max: 100,
    },
    category: "",
    candidateGender: "",
    datePost: [],
    experiences: "",
    qualifications: "",
    sort: "",
    perPage: {
        start: 0,
        end: 0,
    },
};

export const candidateFilterSlice = createSlice({
    name: "candidate-filter-slice",
    initialState,
    reducers: {
        addKeyword: (state, { payload }) => {
            state.keyword = payload;
        },
        addLocation: (state, { payload }) => {
            state.location = payload;
        },
        addDestination: (state, { payload }) => {
            state.destination.min = payload.min;
            state.destination.max = payload.max;
        },
        addCategory: (state, { payload }) => {
            state.category = payload;
        },
        addCandidateGender: (state, { payload }) => {
            state.candidateGender = payload;
        },
        addDatePost: (state, { payload }) => {
            state.datePost = payload;
        },
        addExperience: (state, { payload }) => {
            
           /*  const isExist = state.experiences.includes(payload);
            if (!isExist) {
                state.experiences.push(payload);
            } else {
                state.experiences = state.experiences.filter(
                    (item) => item !== payload
                );
            } */
           state.experiences=payload
        },
        clearExperienceF: (state) => {
            state.experiences = [];
        },
        addQualification: (state, { payload }) => {
                state.qualifications=payload;
        },
        clearQualificationF: (state) => {
            state.qualifications = [];
        },
        addSort: (state, { payload }) => {
            state.sort = payload;
        },
        addPerPage: (state, { payload }) => {
            state.perPage = payload;
        },
    },
});

export const {
    addKeyword,
    addLocation,
    addDestination,
    addCategory,
    addCandidateGender,
    addDatePost,
    addExperience,
    clearExperienceF,
    addQualification,
    clearQualificationF,
    addSort,
    addPerPage,
} = candidateFilterSlice.actions;
export default candidateFilterSlice.reducer;
