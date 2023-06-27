import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Department } from '../types';

const initialState = {
    loading: false,
    departmentList: [] as Department[],
    error: '' as string || undefined,
}


export const login = async () => {
    const loginData = {
      staffId: 15522,
      password: "hussein",
      adminPassword: "123",
    };
  
    const response = await axios.post('https://genhive.onrender.com/auth/login', loginData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data.data.token;
  }

export const fetchDepartment = createAsyncThunk('departments/fetchDepartment', async () => {
    const token = await login();
    return await axios
    .get('https://genhive.onrender.com/department', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) =>  {
        console.log(response.data.data);
        return response.data.data.map((user: {}) => user)
    })
})

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDepartment.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchDepartment.fulfilled, (state, action) => {
            state.loading = false
            state.departmentList = [...action.payload]
            console.log(state.departmentList);
            state.error = ''
        })
        builder.addCase(fetchDepartment.rejected, (state, action) => {
            state.loading = false
            state.departmentList = []
            console.log(action.error.message);
            state.error = action.error.message
        })
    }
});

export default departmentSlice.reducer;