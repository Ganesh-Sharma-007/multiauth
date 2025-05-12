const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./apis/api');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.localUrl,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));

