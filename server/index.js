const express = require('express');
const app = express();
const dotenv = require('dotenv/config');
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const morgan = require('morgan');

//^ Require Routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const postRoutes = require('./routes/posts.js');

//& Mongo DB Database
const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }

}

//^ Middlewares
app.use(express.json());
app.use(morgan("common"));

//& Routes Use
app.use('/auth',authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server is runnig on port: ${PORT}`);
    connect();
});