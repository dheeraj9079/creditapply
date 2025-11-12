// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export interface FieldItem {
//   fieldId: number;
//   name: string;
//   label: string;
// }

// interface FieldState {
//   fields: FieldItem[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: FieldState = {
//   fields: [],
//   loading: false,
//   error: null,
// };

// // Mock API call
// export const fetchFields = createAsyncThunk(
//   'field/fetchFields',
//   async () => {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 500));

//     return [
//       {
//         fieldId: 1,
//         name: "companyName",
//         label: "Company Name"
//       },
//       {
//         fieldId: 2,
//         name: "mobileNumber",
//         label: "Mobile Number"
//       },
//       {
//         fieldId: 3,
//         name: "firstName",
//         label: "First Name"
//       },
//       {
//         fieldId: 4,
//         name: "lastName",
//         label: "Last Name"
//       }
//     ];
//   }
// );

// const fieldSlice = createSlice({
//   name: 'field',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFields.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchFields.fulfilled, (state, action) => {
//         state.loading = false;
//         state.fields = action.payload;
//       })
//       .addCase(fetchFields.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch fields';
//       });
//   },
// });

// export default fieldSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface FieldItem {
  fieldId?: number;
  name: string;
  label: string;
}

interface FieldState {
  fields: FieldItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FieldState = {
  fields: [],
  loading: false,
  error: null,
};

// Async thunk to fetch fields dynamically based on clientId
export const fetchFields = createAsyncThunk<
  FieldItem[], // return type
  string | number // argument type (clientId)
>("field/fetchFields", async (clientName) => {
  try {
    const response = await axios.get(
      `http://ec2-13-62-191-137.eu-north-1.compute.amazonaws.com:8080/fields`,
      {
        params: { clientName },
      }
    );
    console.log("Fields API response:", response.data); // debug log
    return response.data as FieldItem[];
  } catch (error: any) {
    console.error("Fetch fields error:", error.response || error.message);
    throw error;
  }
});

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFields.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        state.loading = false;
        state.fields = action.payload;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fields";
      });
  },
});

export default fieldSlice.reducer;
