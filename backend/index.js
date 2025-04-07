// const bodyParser = require('body-parser');
// const express = require('express')
import express from 'express'
const app = express();
const port = 3000
// const cors = require("cors")
import cors from 'cors';
// import { signupProps } from '@imssb22/common';
app.use(cors());
app.use(express.json())

// const WorkRouter = require("./routes/index.js");
import WorkRouter from './routes/index.js';

app.use('/api/v1', WorkRouter);

app.listen(3000, () => {
        console.log("Server running on port 3000");
    })