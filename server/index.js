const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
require('./config/connection.js');
const userRoutes = require('./Routes/userRoutes.js');
const taskRoutes = require('./Routes/taskRoutes');

const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ["GET", "POST",' PUT', "DELETE"],
    credentials:true
}));
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});