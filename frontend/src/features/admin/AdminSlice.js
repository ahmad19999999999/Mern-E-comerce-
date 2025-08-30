import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// fetch all product
export const  FetchAdminProduct = createAsyncThunk(
  'admin/FetchAdminProduct',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/v1/admin/products',
        
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // مهم جداً إذا كنت تعتمد على cookies
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'faild to fetch products'
      );
    }
  }
);

// create product
export const CreateProduct = createAsyncThunk(
  'admin/CreateProduct',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/admin/product/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // مهم جداً إذا كنت تعتمد على cookies
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create product'
      );
    }
  }
);

// delete product
export const DeleteProduct = createAsyncThunk(
  'admin/DeleteProduct',
  async (ProductId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/admin/product/delete/${ProductId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return { ProductId, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete product'
      );
    }
  }
);
// fetch all users
export const  FetchAllUsers = createAsyncThunk(
  'admin/FetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/v1/admin/users',
        
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // مهم جداً إذا كنت تعتمد على cookies
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'faild to fetch users'
      );
    }
  }
);

// delete user
export const DeleteUser = createAsyncThunk(
  'admin/DeleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/admin/delete/${userId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return { userId, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete user'
      );
    }
  }
);

// get single user


export const getSingelUser = createAsyncThunk(
  "admin/getSingelUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/admin/user/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const UpdateRoleUser = createAsyncThunk(
  "admin/UpdateRoleUser",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/admin/update/${id}`,
        { role },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update user role");
    }
  }
);

// fetch all orders
export const  FetchAllOrders = createAsyncThunk(
  'admin/FetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/v1/admin/getall/orders',
        
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // مهم جداً إذا كنت تعتمد على cookies
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'faild to fetch orders'
      );
    }
  }
);

export const UpdateOrder = createAsyncThunk(
  "admin/UpdateOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/admin/update/order/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order"
      );
    }
  }
);




const adminslice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        loading: false,
        error: null,
        success: false,
        deleteloading: false,
        users: [],
        user: {},
        orders:[],
       
    },
    reducers: {
          removeError: (state) => {
      state.error = null;
    },
    removeAccess: (state) => {
      state.success = false;
    },
        
    },
    extraReducers:(builder) => {
      builder
        .addCase(FetchAdminProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(FetchAdminProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload.products;
          state.success = true;
        })
        .addCase(FetchAdminProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload||'faild to fetch products'
          
        
      })
      // create product
        builder
        .addCase(CreateProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(CreateProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products.push(action.payload.product);
          state.success =true
          console.log([...state.products])
        })
        .addCase(CreateProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload||'faild to create product'
          
        
      })

       // delete product
        builder
        .addCase(DeleteProduct.pending, (state) => {
          state.deleteloading = true;
          state.error = null;
        })
        .addCase(DeleteProduct.fulfilled, (state, action) => {
          state.deleteloading = false;
          state.products = state.products.filter((product) => product._id !== action.payload.ProductId);
          state.success =true
         
        })
        .addCase(DeleteProduct.rejected, (state, action) => {
          state.deleteloading = false;
          state.error = action.payload||'faild to delete product'
          
        
      })
      // fetch all users
       builder
        .addCase(FetchAllUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(FetchAllUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload.users;
          state.success = true;
           console.log([...state.users])
        })
        .addCase(FetchAllUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload||'faild to fetch users'
          
        
      })

        // delete user
        builder
        .addCase(DeleteUser.pending, (state) => {
          state.deleteloading = true;
          state.error = null;
        })
        .addCase(DeleteUser.fulfilled, (state, action) => {
          state.deleteloading = false;
          state.users = state.users.filter((user) => user._id !== action.payload.userId);
          state.success =true
         
        })
        .addCase(DeleteUser.rejected, (state, action) => {
          state.deleteloading = false;
          state.error = action.payload||'faild to delete user'
          
        
      })
      // get single user
       builder
        .addCase(getSingelUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getSingelUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
         
        })
        .addCase(getSingelUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload||'faild to fetch user'
          
        
      })

         // update user role
       builder
        .addCase(UpdateRoleUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(UpdateRoleUser.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(UpdateRoleUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload||'faild to fetch user'
          
        
      })
     // fetch all orders
        builder
        .addCase(FetchAllOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(FetchAllOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.success = true;
        })
        .addCase(FetchAllOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload||'faild to fetch orders'
          
        
      })
        //update order
         builder
        .addCase(UpdateOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(UpdateOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(UpdateOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload||'faild to update order'
          
        
      })

      
    }
})

export const { removeError, removeAccess } = adminslice.actions;
export default adminslice.reducer;