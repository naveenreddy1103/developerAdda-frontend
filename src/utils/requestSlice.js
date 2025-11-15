import { createSlice } from "@reduxjs/toolkit";

const requestSlice= createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        removeRequests:(state,action)=>{
             const newArray=state.filter((item)=>item._id!==action.payload)
             return newArray
        }
    }
})

export const {addRequests,removeRequests}=requestSlice.actions
export default requestSlice.reducer