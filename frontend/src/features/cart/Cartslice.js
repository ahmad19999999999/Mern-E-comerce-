import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const AddItemsToCart = createAsyncThunk(
  'cart/AddItemsToCart',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
      console.log('Response from API:', data);
      return {
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].url,
        stock:data.product.stock,
        quantity


      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred.'
      );
    }
  }
);

const cartslice=createSlice({
    name:'cart',
    initialState:{
        cartItem:JSON.parse(localStorage.getItem('cartItem'))||[],
        loading:false,
        error:null,
        success:false,
        message:null,
        removingId:null,
        shippinginfo:JSON.parse(localStorage.getItem('shippinginfo'))||{},
        
        
    },
    reducers:{
        removeError:(state)=>{
           state.error=null
        },
        removeMessage:(state)=>{
           state.message=null
           state.success = false;//for get message
        },
          removeItemFromCart: (state, action) => {
            state.removingId=action.payload
          state.cartItem = state.cartItem.filter(item => item.product !== action.payload);
          localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
          
  },    
           saveShippingInfo: (state, action) => {
           state.shippinginfo=action.payload
          localStorage.setItem('shippinginfo', JSON.stringify(state.shippinginfo));
          
  },   
          clearCart: (state) => {
            state.cartItem = [];
            state.shippinginfo = {};
            localStorage.removeItem('cartItem');
            localStorage.removeItem('shippinginfo');
          }
         
    },
     extraReducers: (builder) => {
    builder
      // add to cart
      .addCase(AddItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(AddItemsToCart.fulfilled, (state, action) => {
     const item = action.payload;
     console.log('Adding item:', item);
     const existitem = state.cartItem.find((i) => i.product === item.product);
     console.log('Existing item:', existitem);

       if (existitem) {
      existitem.quantity = item.quantity;
      console.log('Updated quantity:', existitem.quantity);
  }   else {
      state.cartItem.push(item);
      console.log('Item added');
  }

      state.loading = false;
      state.error = null;
      state.success = true;
      state.message = `${item.name} is add to cart succussfly`;
      localStorage.setItem('cartItem',JSON.stringify(state.cartItem))
})


      .addCase(AddItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred.';
      
      })
    }
})

 

export const {removeError,removeMessage,removeItemFromCart,saveShippingInfo,clearCart}=cartslice.actions
export default cartslice.reducer