// const bodyParser = require('body-parser');
// const express = require('express')
import express from 'express'
const app = express();
const port = 3000
// const z = require('zod');
// import { z}

// import { signupProps } from 'common/src';
// app.use(cors());
app.use(express.json())

// const AdminRouter = require("./admin.js")
import AdminRouter from "./admin.js"
// const UserRouter = require("./user.js")
import UserRouter from "./user.js"

const router = express.Router();

router.use('/user', UserRouter);
router.use('/admin', AdminRouter);
export default router;
// module.exports = router;
// try {
//     ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
//     USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    
// } catch {
//     ADMINS = [];
//     USERS = [];

// }
// const SECRET = 'my-secret-key';
// function middleware1(req, res, next){
//     console.log("from inside the middleware " + req.headers.counter);
//     next();
// }


// app.post('/admin/login', (req, res) => {

// })
// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// })