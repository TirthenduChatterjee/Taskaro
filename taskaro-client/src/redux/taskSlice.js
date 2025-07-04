import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl= import.meta.env.VITE_BASE_URL;
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const token = JSON.parse(localStorage.getItem('userToken')); // read token fresh here

  const res = await axios.get(`${baseUrl}/api/tasks/getall`, {
    headers: {
      Authorization: token
    }
  });
  return res.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const token = JSON.parse(localStorage.getItem('userToken')); // read token fresh here

  const payload = {
    ...task,
    createdFor: task.createdFor ? task.createdFor.toISOString() : null
  };
  const res = await axios.post(`${baseUrl}/api/tasks/create`, payload, {
    headers: { Authorization: token }
  });
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask',  async (taskId, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('userToken')); // read token fresh here

    try {
      await axios.delete(`${baseUrl}/api/tasks/${taskId}`, {
        headers: {
          Authorization: token
        }
      });
      return taskId; // return ID so we can remove it from state
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({id, updatedData}, { rejectWithValue }) => {
      const token = JSON.parse(localStorage.getItem('userToken')); // read token fresh here

    try {
      const response = await axios.put(
        `${baseUrl}/api/tasks/update/${id}`,
       {...updatedData},
        {
          headers: {
            Authorization: token
          }
        }
      );
      return response.data.task; // return the updated task
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(action.payload);
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      })
       .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTask = action.payload;
        const index = state.list.findIndex((task) => task._id === updatedTask._id);
        if (index !== -1) {
          state.list[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update task";
      });
  }
});

export default taskSlice.reducer;
