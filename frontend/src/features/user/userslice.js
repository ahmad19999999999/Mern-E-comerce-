import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// REGISTER
export const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const isFormData = userData instanceof FormData;

      const config = {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/register',
        userData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed. Please try again later.'
      );
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post(
        '/api/v1/login',
        userData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  }
);

export const loaduser = createAsyncThunk(
  'user/loaduser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/v1/profile');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || ' failed to load user profile.'
      );
    }
  }
);
// logout
export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/v1/logout',{withCredentials:true});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || ' failed to logout user .'
      );
    }
  }
);

// update profile
export const UpdateProfile = createAsyncThunk(
  'user/updateprofile',
  async (userData, { rejectWithValue }) => {
    try {
      const isFormData = userData instanceof FormData;

      const config = {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        '/api/v1/update/profile',
        userData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Update user profile failed.'
      );
    }
  }
);

//update password
export const UpdatePassword = createAsyncThunk(
  'user/updatepassword',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        '/api/v1/update/password',
        userData,
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
        error.response?.data?.message || 'Update Password failed.'
      );
    }
  }
);


export const ForgatePassword = createAsyncThunk(
  'user/forgatepassword',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/api/v1/forgate/password',
        userData,
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
        error.response?.data?.message || {message:'Rasete Password failed.'}
      );
    }
  }
);

//update password
export const RasetePassword = createAsyncThunk(
  'user/resatepassword',
  async ({userData,token}, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/reset/${token}`,
        userData,
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
        error.response?.data?.message || 'Resate Password failed.'
      );
    }
  }
);

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialAuth = localStorage.getItem('isAuthenticated')
  ? JSON.parse(localStorage.getItem('isAuthenticated'))
  : false;


// User Slice
const userslice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    loading: false,
    error: null,
    isAuthenticated: initialAuth,
    success: false,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeAccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success || false;
        state.error = null;
        state.isAuthenticated = Boolean(action.payload?.user);

         localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed. Please try again later.';
        state.isAuthenticated =false;
        state.user = null;
        state.success = false;
      })

      // LOGIN
      builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success || false;
        state.error = null;
        state.isAuthenticated = Boolean(action.payload?.user);

          localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed. Please try again.';
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
      })


      // loading user
      builder
       .addCase(loaduser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loaduser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success || false;
        state.error = null;
        state.isAuthenticated = Boolean(action.payload?.user);

          localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
      })
      .addCase(loaduser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ' failed to load user profile.';
        state.isAuthenticated = false;
        state.user = null;
        state.success = false;

        if(action.payload?.statusCode===401){
          state.user=null
          state.isAuthenticated=false

          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');

        }
      })

        // logout user
      builder
       .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isAuthenticated =false;

        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || ' failed to logout user profile.';
       
      })

            // update profile
      builder
       .addCase(UpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error=null
        state.success = action.payload?.success
        state.message = action.payload?.message
        
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || ' failed to update user profile.';
       
      })

            // update password
      builder
       .addCase(UpdatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error=null
        state.user = action.payload?.user || null;
        state.success = action.payload?.success
        state.message = action.payload?.message
        
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update password.';

       
      })

      
            // forgate password
      builder
       .addCase(ForgatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ForgatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error=null
        state.user = action.payload?.user || null;
        state.success = action.payload?.success
        state.message = action.payload?.message
        
      })
      .addCase(ForgatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to rasete password.';

       
      })

             // Resate password
      builder
       .addCase(RasetePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RasetePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error=null
        state.user = action.payload?.user || null;
        state.success = action.payload?.success
        state.message = action.payload?.message
        state.isAuthenticated = false;
        
      })
      .addCase(RasetePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to resate password.';

       
      })


      

      
  },
  
});



export const { removeAccess, removeError } = userslice.actions;
export default userslice.reducer;
