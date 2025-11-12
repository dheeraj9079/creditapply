import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ContentItem {
  contentId?: number;
  title: string;
  text: string;
  clientCardArt?: string;
}

interface ContentState {
  content: ContentItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  content: [],
  loading: false,
  error: null,
};

export const fetchContent = createAsyncThunk<
  ContentItem[], // Return type
  string | number // Argument type (clientId)
>("content/fetchContent", async (clientName) => {
  try {
    const response = await axios.get(
      `http://ec2-13-62-191-137.eu-north-1.compute.amazonaws.com:8080/contents`,
      {
        params: { clientName },
      }
    );
    console.log("Content API response:", response.data); // debug log
    return response.data as ContentItem[];
  } catch (error) {
    throw error;
  }
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
        // state.content = [
        //   {
        //     title: "Policy",
        //     text: "Policy",
        //     contentId: 0,
        //     clientCardArt: "",
        //   },
        //   {
        //     title: "Terms_Conditions",
        //     text: "Terms & Coditions",
        //   },
        //   {
        //     title: "Business_Info_Title",
        //     text: "Tell Me About Your Business",
        //   },
        //   {
        //     title: "Business_Info_Sub_Title",
        //     text: "We have different cards for different needs, go for the ClientX Card best suited for you. All fields are required unless stated otherwise.",
        //   },
        //   {
        //     title: "mobileNumber",
        //     text: "Mobile Number",
        //   },
        //   {
        //     title: "companyName",
        //     text: "Company Name",
        //   },
        //   {
        //     title: "Submit",
        //     text: "Submit",
        //   },
        //   {
        //     title: "9876543210",
        //     text: "9876543210",
        //   },
        //   {
        //     title: "Jane",
        //     text: "Jane",
        //   },
        //   {
        //     title: "Business_Info_Form_Label",
        //     text: "Enter Business Information",
        //   },
        //   {
        //     title: "Terms & Coditions",
        //     text: "Terms & Coditions",
        //   },
        //   {
        //     title: "Policy",
        //     text: "Policy",
        //   },
        //   {
        //     title: "Results_mainHeading",
        //     text: "Congratulations [name]",
        //   },
        //   {
        //     title: "Results_subHeading1",
        //     text: "You have been approved for ClientX Account.",
        //   },
        //   {
        //     title: "Results_subHeading2",
        //     text: "Check your mail box!",
        //   },
        //   {
        //     title: "Sub_Heading",
        //     text: "We have different cards for different needs, go for the ClientX Card best suited for you. All fields are required unless stated otherwise.",
        //   },
        //   {
        //     title: "Main_Heading",
        //     text: "Tell Me About Your Business.",
        //   },
        // ];
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch content";
      });
  },
});

export default contentSlice.reducer;
