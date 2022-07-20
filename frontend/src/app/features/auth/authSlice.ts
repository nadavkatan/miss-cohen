import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export interface Credentials{
    username: string, 
    password: string
}

export interface FormData extends Credentials{
    firstName: string,
    lastName: string,
}

interface User{
    _id:string,
    firstName: string,
    lastName: string,
    email: string,
    orders: string[]
}

interface updateUserArgs{
    userId: string, 
    orderNumber: number
}

interface ReturnedUser{
    message: string,
    user: User | null,
    isAuth: boolean | undefined
}

interface InitialState{
    isAuth: boolean | undefined,
    currentUser: User | undefined | null,
    authMessage: string | null,
    status: 'idle' | 'loading'
}

export const login = createAsyncThunk('authSlice/login',
    async(credentials: Credentials) => {
        const response = await axios({
            method: 'POST',
            url:`${BASE_URL}/auth/login`,
            data: credentials,
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data
    }
)

export const logout = createAsyncThunk('authSlice/logout',
    async()=>{
        const response = await axios({
            method: 'POST',
            url:`${BASE_URL}/auth/logout`,
            withCredentials:true
        });
        return response.data
    }
)

export const registerUser = createAsyncThunk('authSlice/registerUser',
    async(formData:FormData) =>{
        const response = await axios({
            method: 'POST',
            url:`${BASE_URL}/auth/register`,
            data: formData
        });
        return response.data;
    }
);

export const checkAuth = createAsyncThunk('authSlice/checkAuth',
    async()=>{
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/auth/check-auth`,
            withCredentials: true
        });
        return response.data;
    }
)

export const updateUsersOrders = createAsyncThunk('authSlice/updateUsersOrders',
    async(args:updateUserArgs)=>{
        const response = await axios({
            method: 'PATCH',
            url: `${BASE_URL}/user/update/${args.userId}`,
            data:{
                orderNumber: args.orderNumber
            }
        });
        return response.data
    }
)

const initialState:InitialState = {
    isAuth: undefined,
    currentUser: undefined,
    authMessage:null,
    status: 'idle'

}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state)=>{
            state.status = 'loading';
        });
        builder.addCase(registerUser.fulfilled, (state, action:PayloadAction<ReturnedUser>)=>{
            state.status = 'idle';
            state.currentUser = action.payload.user;
            state.authMessage = action.payload.message;
            state.isAuth = true;
        });
        builder.addCase(registerUser.rejected, (state)=>{
            state.status = 'idle';
        });
        builder.addCase(login.pending, (state)=>{
            state.status = 'loading';
        });
        builder.addCase(login.fulfilled, (state, action:PayloadAction<ReturnedUser>)=>{
            state.status = 'idle';
            state.currentUser = action.payload.user;
            state.authMessage = action.payload.message;
            state.isAuth = action.payload.isAuth;
        });
        builder.addCase(login.rejected, (state)=>{
            state.status = 'idle';
        });
        builder.addCase(logout.pending, (state)=>{
            state.status = 'loading';
        });
        builder.addCase(logout.fulfilled, (state, action:PayloadAction<ReturnedUser>)=>{
            state.status = 'idle';
            state.isAuth = action.payload.isAuth;
            state.currentUser = undefined
        });
        builder.addCase(logout.rejected, (state)=>{
            state.status = 'idle';
        });
        builder.addCase(checkAuth.pending, (state)=>{
            state.status = 'loading';
        });
        builder.addCase(checkAuth.fulfilled, (state, action:PayloadAction<ReturnedUser>)=>{
            state.status ='idle';
            state.currentUser = action.payload.user;
            state.isAuth = action.payload.isAuth;
        });
        builder.addCase(checkAuth.rejected, (state, )=>{
            state.status ='idle';
        });
        builder.addCase(updateUsersOrders.pending, (state, )=>{
            state.status ='loading';
        });
        builder.addCase(updateUsersOrders.fulfilled, (state,action:PayloadAction<ReturnedUser> )=>{
            state.status='idle';
            state.currentUser = action.payload.user
        });
        builder.addCase(updateUsersOrders.rejected, (state)=>{
            state.status='idle';
        })

    }
});

export default authSlice.reducer;