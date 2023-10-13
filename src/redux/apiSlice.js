import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem('token');
export let getMessages = createAsyncThunk("api/getMessages", async function () {
    let res = await axios.get("https://sara7aiti.onrender.com/api/v1/message", {
        headers: {
            token
        }
    })
    // console.log("data",res.data.allMessages)
    return res.data.allMessages
})
let initialState = { messages: [] }
let apiSlice = createSlice({
    name: "api",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload
        })
    }
})
export let apiReducer = apiSlice.reducer