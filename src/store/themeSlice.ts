import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "slice/theme",
  initialState: {
    isDark:false
  },
  reducers: {
    updateTheme: (state, action: PayloadAction<boolean>) => {
      return {
        isDark:action.payload
      };
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
