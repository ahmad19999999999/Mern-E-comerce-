import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products
export const getproducts = createAsyncThunk(
  'product/getproduct',
  async ({ keyword = '', page = 1, categorie = '' }, { rejectWithValue }) => {
    try {
      let query = `http://localhost:3000/api/v1/products?page=${page}`;

      if (keyword) {
        query += `&keyword=${encodeURIComponent(keyword)}`;
      }

      if (categorie) {
        query += `&category=${encodeURIComponent(categorie)}`; // FIXED HERE
      }

      const { data } = await axios.get(query);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(message);
    }
  }
);


export const getproductDetails = createAsyncThunk(
  'product/getproductdetailse',
  async (id, { rejectWithValue }) => {
    try {
      const link = `http://localhost:3000/api/v1/product/${id}`;
      const { data } = await axios.get(link);  // <-- هنا
      console.log('response data', data);
      return data; // ترجع البيانات مباشرة
    } catch (error) {
        const message =
        error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(message);
    }
  }
);

export const CreatReviw = createAsyncThunk(
  'product/createReview',
  async ({rating, comment, productId}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // ← إضافة هذه السطر لإرسال الكوكيز
      }
      const link = `http://localhost:3000/api/v1/review`;
      const { data } = await axios.post(link, { rating, comment, productId }, config);
      console.log('response data', data);
      return data; 
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(message);
    }
  }
);



// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product:null,
     resultPerPage:3,
     totalPages:0,
     reviwsuccess:false,
     reviwloading:false
  },
  reducers: {
    reportError: (state) => {
      state.error = null;
    },
     removesuccess: (state) => {
      state.reviwsuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        console.log('fulfilled action payload', action.payload);
        state.loading = false
        state.error = null
        state.products = action.payload.products
        state.productCount = action.payload.productCount
        state.resultPerPage = action.payload.resultPerPage
        state.totalPages = action.payload.totalPages
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
         state.products=[]
      });

      builder.addCase(getproductDetails.pending,(state)=>{
        state.loading = true;
        state.error = null;

      }).addCase(getproductDetails.fulfilled, (state, action) => {
        console.log('fulfilled action payload', action.payload);
        state.loading = false
        state.error = null
        state.product = action.payload.product
        
      })
        .addCase(getproductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
         // create review
          builder.addCase(CreatReviw.pending,(state)=>{
        state.reviwloading = true;
        state.error = null;

      }).addCase(CreatReviw.fulfilled, (state, action) => {
      
        state.reviwloading = false
        state.reviwsuccess = true
        state.product = action.payload.product
        
      })
        .addCase(CreatReviw.rejected, (state, action) => {
        state.reviwloading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { reportError } = productSlice.actions; // ✅ صح
export default productSlice.reducer;
