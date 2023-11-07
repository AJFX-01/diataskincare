import { createSlice } from "@reduxjs/toolkit";


interface AuthorizationState {
    isLoggedIn: boolean;
    email: string |  null;
    userID: string | null;
    userName: string | null;
    users: any[];
    deletedUsers: string[];
};

const initialState: AuthorizationState = {
    isLoggedIn : false,
    email: null,
    userID: null,
    userName: null,
    users: [],
    deletedUsers: [] 
} 

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action : { payload : { email : string; userID : string; userName : string }}) => {
            const { email, userID, userName } = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.userName = userName; 
            state.userID = userID;
        },
        REMOVE_ACTIVE_USER: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.userName = null;
            state.userID = null; 

        },
        DELETE_USERS: (state, action) => {
            state.deletedUsers = action.payload
        },
        STORE_USERS: (state, action) => {
            state.deletedUsers = action.payload
        },
    }
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, DELETE_USERS, STORE_USERS } = authSlice.actions;

export const selectIsLoggedIn = (state : { auth : AuthorizationState }) => state.auth.isLoggedIn;
export const selectEmail = (state: { auth: AuthorizationState }) => state.auth.email;
export const selectUserName = (state: { auth: AuthorizationState }) => state.auth.userName;
export const selectUserID = (state: { auth: AuthorizationState }) => state.auth.userID;
export const selectUsers = (state: { auth: AuthorizationState }) => state.auth.users;
export const selectDeletedUsers = (state: { auth: AuthorizationState }) => state.auth.deletedUsers;

export default authSlice.reducer;