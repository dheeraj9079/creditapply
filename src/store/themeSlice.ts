// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export interface ThemeItem {
//   themeId: number;
//   themeName: string;
//   themeValue: string;
// }

// interface ThemeState {
//   themes: ThemeItem[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ThemeState = {
//   themes: [],
//   loading: false,
//   error: null,
// };

// // Mock API call
// export const fetchThemes = createAsyncThunk(
//   'theme/fetchThemes',
//   async () => {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 500));

//     return [
//       {
//         themeId: 1,
//         themeName: "fontSize",
//         themeValue: "16px"
//       },
//       {
//         themeId: 2,
//         themeName: "primaryColor",
//         themeValue: "#2c5282"
//       },
//       {
//         themeId: 3,
//         themeName: "accentColor",
//         themeValue: "#ed8936"
//       },
//       {
//         themeId: 4,
//         themeName: "fontFamily",
//         themeValue: "Inter, sans-serif"
//       }
//     ];
//   }
// );

// const themeSlice = createSlice({
//   name: 'theme',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchThemes.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchThemes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.themes = action.payload;
//       })
//       .addCase(fetchThemes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch themes';
//       });
//   },
// });

// export default themeSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ThemeItem {
  themeName: string;
  themeValue: string;
  // themeValue: string;
}

interface ThemeState {
  themes: ThemeItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ThemeState = {
  themes: [],
  loading: false,
  error: null,
};

// Async thunk to fetch themes dynamically based on clientId
export const fetchThemes = createAsyncThunk<
  ThemeItem[], // return type
  string | number // argument type (clientId)
>("theme/fetchThemes", async (clientName) => {
  try {
    const response = await axios.get(
      `http://ec2-13-62-191-137.eu-north-1.compute.amazonaws.com:8080/themes`,
      {
        params: { clientName },
      }
    );
    console.log("Themes API response:", response.data); // debug log
    return response.data as ThemeItem[];
  } catch (error: any) {
    console.error("Fetch themes error:", error.response || error.message);
    throw error;
  }
});

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThemes.fulfilled, (state, action) => {
        state.loading = false;
        state.themes = action.payload;
        // state.themes = [
        //   {
        //     name: "Footer background",
        //     value: "#0a0c0dff",
        //   },
        //   {
        //     name: "Header background",
        //     value: "#020a10ff",
        //   },
        //   {
        //     name: "Button background",
        //     value: "#02080cff",
        //   },
        //   {
        //     name: "Canvas background",
        //     value: "#f9f9f9",
        //   },
        //   {
        //     name: "Text color",
        //     value: "#b62c2cff",
        //   },
        // ];
      })
      .addCase(fetchThemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch themes";
      });
  },
});

export default themeSlice.reducer;
