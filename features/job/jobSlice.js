import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJobTypes = createAsyncThunk("job/fetchJobTypes", async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/all_job_types`,
  );

  return res.data.data;
});

export const fetchExperienceLevels = createAsyncThunk(
  "job/fetchExperienceLevels",
  async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobposting/all_job_experience_levels`,
    );

    return res.data.data;
  },
);
const initialState = {
  latestJob: ["full-time"],
  category: [
    {
      id: 1,
      name: "Residential",
      value: "residential",
    },
    {
      id: 2,
      name: "Commercial",
      value: "commercial",
    },
    {
      id: 3,
      name: "Industrial",
      value: "industrial",
    },
    {
      id: 4,
      name: "Apartments",
      value: "apartments",
    },
  ],
  jobTypeList: [],
  datePost: [
    { id: 1, name: "All", value: "all", isChecked: false },
    { id: 2, name: "Last Hour", value: "last-hour", isChecked: false },
    {
      id: 3,
      name: "Last 24 Hour",
      value: "last-24-hour",
      isChecked: false,
    },
    { id: 4, name: "Last 7 Days", value: "last-7-days", isChecked: false },
    {
      id: 5,
      name: "Last 14 Days",
      value: "last-14-days",
      isChecked: false,
    },
    {
      id: 6,
      name: "Last 30 Days",
      value: "last-30-days",
      isChecked: false,
    },
  ],
  experienceLevel: [],
  tags: [
    {
      id: 1,
      name: "App",
      value: "app",
    },
    {
      id: 2,
      name: "Administrative",
      value: "administrative",
    },
    {
      id: 3,
      name: "Android",
      value: "android",
    },
    {
      id: 4,
      name: "Wordpress",
      value: "wordpress",
    },
    {
      id: 5,
      name: "Design",
      value: "design",
    },
    {
      id: 6,
      name: "React",
      value: "react",
    },
  ],
};

export const jobSlice = createSlice({
  name: "job",
  initialState,

  /* =====================
     NORMAL REDUCERS
  ===================== */
  reducers: {
    addLatestJob: (state, { payload }) => {
      const isExist = state.latestJob?.includes(payload);
      if (isExist) {
        state.latestJob = state.latestJob.filter((item) => item !== payload);
      } else {
        state.latestJob.push(payload);
      }
    },

    clearJobTypeToggle: (state) => {
      state.jobTypeList.forEach((item) => {
        item.isChecked = false;
      });
    },

    jobTypeCheck: (state, { payload }) => {
      const item = state.jobTypeList.find((i) => i.id === payload);
      if (item) item.isChecked = !item.isChecked;
    },

    datePostCheck: (state, { payload }) => {
      state.datePost.forEach((item) => {
        item.isChecked = item.id === payload;
      });
    },

    clearDatePostToggle: (state) => {
      state.datePost.forEach((item) => {
        item.isChecked = false;
      });
    },

    experienceLevelCheck: (state, { payload }) => {
      const item = state.experienceLevel.find((i) => i.id === payload);
      if (item) item.isChecked = !item.isChecked;
    },

    clearExperienceToggle: (state) => {
      state.experienceLevel.forEach((item) => {
        item.isChecked = false;
      });
    },
  },

  /* =====================
     EXTRA REDUCERS 👇
  ===================== */
  extraReducers: (builder) => {
    builder

      // Job Types
      .addCase(fetchJobTypes.fulfilled, (state, action) => {
        state.jobTypeList = action.payload.map((item) => ({
          id: item._id,
          name: item.name,
          value: item.name,
          isChecked: false,
        }));
      })

      // Experience Levels
      .addCase(fetchExperienceLevels.fulfilled, (state, action) => {
        state.experienceLevel = action.payload.map((item) => ({
          id: item._id,
          name: item.name,
          value: item.name,
          isChecked: false,
        }));
      });
  },
});

export const {
  addLatestJob,
  clearJobTypeToggle,
  jobTypeCheck,
  datePostCheck,
  clearDatePostToggle,
  experienceLevelCheck,
  clearExperienceToggle,
} = jobSlice.actions;
export default jobSlice.reducer;
