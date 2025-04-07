const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const port = 3000
// import cors from 'cors';
const cors = require("cors")
// import { signupProps } from 'common/src';
// app.use(cors());
app.use(bodyParser.json())
const SECRET = 'my-secret-key';
const router = express.Router();
const z = require('zod');

const signupProps = z.object({
    email : z.string().email(),
    phone : z.string().min(10).max(10),
    username : z.string().min(5).max(30),
    password : z.string().min(5).max(20)
  })
let USERS = [];

module.exports = router;