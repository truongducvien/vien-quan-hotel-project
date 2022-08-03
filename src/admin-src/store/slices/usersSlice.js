import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   users: [],
   isLoading: false
}

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      fetchUsersDataAction (state, action) {
         state.isLoading = true;
      },
      fetchUsersDataSuccess (state, action) {
         state.isLoading = false;
         state.users = action.payload
      },
      deleteUserDataAction (state, action) {
         state.isLoading = true;
      },
      updateUserDataAction( state, action) {
         state.isLoading = true;
      }
   }
})

export const { 
   fetchUsersDataAction,
   fetchUsersDataSuccess,
   deleteUserDataAction,
   updateUserDataAction } = usersSlice.actions;

export const usersReducers = usersSlice.reducer;