require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

const PORT = process.env.PORT;

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/user', userRoutes);

// Connect to  mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen on port
        app.listen(PORT, () => {
            console.log(`MongoDB connected... & Server running on ${PORT}`)
        });
    })
    .catch((error) => { console.log(error) });

