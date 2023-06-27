import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Division } from '../types';

const initialState = {
    loading: false,
    divisionList: [] as Division[],
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

export const fetchDivision = createAsyncThunk('divisions/fetchDivision', async () => {
    const token = await login();
    return await axios
    .get('https://genhive.onrender.com/division', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) =>  {
        return response.data.data.map((user: {}) => user)
    })
})

export const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDivision.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchDivision.fulfilled, (state, action) => {
            state.loading = false
            state.divisionList = [...action.payload]
            console.log(state.divisionList);
            state.error = ''
        })
        builder.addCase(fetchDivision.rejected, (state, action) => {
            state.loading = false
            state.divisionList = []
            console.log(action.error.message);
            state.error = action.error.message
        })
    }
});

export default divisionSlice.reducer;