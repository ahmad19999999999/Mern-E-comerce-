import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createOrder = createAsyncThunk(
  '/order/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',  // fixed header spelling
        },
        withCredentials: true

      };

      const { data } = await axios.post('http://localhost:3000/api/v1/create/order', order, config);  // assuming your API endpoint is /api/orders
      console.log('order data :',data)
      return data;  // return the response data

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create order.'
      );
    }
  }
);

//Get user orders

export const getOrders = createAsyncThunk(
  '/order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // هذا ضروري لتمرير الكوكيز
      };

      const { data } = await axios.get(
        'http://localhost:3000/api/v1/getmy/orders',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders.'
      );
    }
  }
);

//Get order details

export const getOrderDetails = createAsyncThunk(
  '/order/getOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {

       const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // هذا ضروري لتمرير الكوكيز
      };
   

      const { data } = await axios.get(
        `http://localhost:3000/api/v1/order/${orderId}`,
        config
      );
       console.log('order details :',data)
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order details.'
      );
    }
  }
);



 const orderslice=createSlice({
    name:'order',
    initialState:{
        success:false,
        loading:false,
        error:null,
        orders:[],
        order:{}
    },
    reducers:{
        removeError: (state) => {
      state.error = null;
    },
    removeAccess: (state) => {
      state.success = false;
    },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createOrder.pending,(state)=>{
          state.loading=true
          state.error=null

        })
        .addCase(createOrder.fulfilled,(state,action)=>{
          state.loading=false
          state.order=action.payload.order
          state.success=action.payload.success
            
        })
        .addCase(createOrder.rejected,(state,action)=>{
              state.loading = false;
              state.error = action.payload || 'Failed to create order.';
        })
       // get all user orders
             builder
        .addCase(getOrders.pending,(state)=>{
          state.loading=true
          state.error=null

        })
        .addCase(getOrders.fulfilled,(state,action)=>{
          state.loading=false
          state.orders=action.payload.orders
          state.success=true
            
        })
        .addCase(getOrders.rejected,(state,action)=>{
              state.loading = false;
              state.error = action.payload || 'Failed to fetch orders.';
        })

         // get order details
             builder
        .addCase(getOrderDetails.pending,(state)=>{
          state.loading=true
          state.error=null

        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
          state.loading=false
          state.order=action.payload.order
          state.success=true
            
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
              state.loading = false;
              state.error = action.payload || 'Failed to fetch order details.';
        })
    }

})



export const { removeAccess, removeError } = orderslice.actions;
export default orderslice.reducer;