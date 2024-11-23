require('dotenv').config();
const express = require('express');
const AuthRoutes = require('./routes/AuthRoutes');
const BlogRoutes = require('./routes/BlogRoutes');
const UserRoutes = require('./routes/UserRoutes');
const DBConnect = require('./DBConfig/DBConfig');
const cors = require('cors');
const app = express();
DBConnect();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRoutes);
app.use('/blog', BlogRoutes);
app.use('/user', UserRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})