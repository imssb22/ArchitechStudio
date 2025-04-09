
// const express = require('express')
import express from 'express';
const app = express();
const port = 3000
import { prismaClient } from "../db/db.js";
import  jwt  from 'jsonwebtoken'
const JWT_SECRET= 'my-secret-key'
// import cors from 'cors';
// const cors = require("cors")
// import { signupProps } from 'common/src';
import { authenticateJwt } from '../middleware/index.js';
// app.use(cors());
app.use(express.json());
// const z = require('zod')
import { z } from 'zod';
const signupProps = z.object({
    email : z.string().email(),
    //phone : z.string().min(10).max(10),
    username : z.string().min(5).max(30),
    password : z.string().min(5).max(20)
  })
const signinProps = z.object({
    username : z.string().email(),
    password : z.string().min(5).max(20)
})
const usernameSigninProps = z.object({
    username : z.string().min(5).max(30),
    password : z.string().min(5).max(20)
})

// const itemsProps = z.object({
//     title : z
// })
// export type SignupParams = z.infer<typeof signupProps>;
const router = express.Router();

router.post('/signup',  async (req, res) =>{
    // console.log(req);
    console.log(req.body)
    const parsedInputs = signupProps.safeParse(req.body);
    // const parsedInputs = req.body;
    
    console.log(parsedInputs);
    if(!parsedInputs.success){
        return res.status(400).json({
            message : "Error in getting username"
        })
    }
    const username = parsedInputs.data.username;
    const password = parsedInputs.data.password;
    const email = parsedInputs.data.email;
    
    console.log(typeof(email))
    try{
        const existing = await prismaClient.user.findFirst({
            where : {
                username : username
            }
        })
        console.log(existing);
        if(existing){
            return res.status(411).json({
                message : "User already exists, please sign in"
            })
        }
                
        const user = await prismaClient.user.create({
            data : 
                {
                    username : username,
                    password : password,
                    email : email
                }
            
            
    })
        console.log(user);
        const token = 'Bearer ' + jwt.sign(user.id, JWT_SECRET)
        console.log(token);
        return res.json({
            token : token
        })
    }catch(e){
        console.log(e);
    }
})
router.post('/signin', async (req, res) => {
    const parsedInputs = signinProps.safeParse(req.body);
    console.log(parsedInputs);
    if(!parsedInputs.success){
        // return res.status(400).json({
        //     message : "Error in getting username"
        // })
        const usernameInputs = usernameSigninProps.safeParse(req.body);
        console.log(usernameInputs)
        if(!usernameInputs.success){
            return res.status(400).json({
                message : "check length of username"
            })
        }
        const username = usernameInputs.data.username;
        const password = usernameInputs.data.password;

        try{
            const user = await prismaClient.user.findFirst({
                where : {
                    username : username,
                    password : password
                }
            })
            console.log(user);
            if(!user){
                return res.status(411).json({
                    message : "User doesnt exist, please sign up"
                })
            }
            console.log(user);
            const token = 'Bearer ' + jwt.sign(user.id, JWT_SECRET)
            console.log(token);
            return res.json({
                token : token
            })
        }catch(e){
            console.log("username part parsing error", e);
        }
    }else{
        const email = parsedInputs.data.username;
        const password = parsedInputs.data.password;
        try{
            const user = await prismaClient.user.findFirst({
                where : {
                    email : email,
                    password : password
                }
            })
            console.log(user);
            if(!user){
                return res.status(411).json({
                    message : "User doesnt exist, please sign up"
                })
            }
            console.log(user);
            const token = 'Bearer ' + jwt.sign(user.id, JWT_SECRET)
            console.log(token);
            return res.json({
                token : token
            })
        }catch(e){
            console.log("email part parsing error", e);
        }
    } 
})
router.get('/me', authenticateJwt, (req, res) => {
    res.json({
        username : req.username
    })
})
// module.exports = router;

router.post('/additems', authenticateJwt, async(req, res) => {
    const parsedInputs = req.body;
    const title = parsedInputs.title
    const price = parsedInputs.price
    const description = parsedInputs.description
    const imageurl = parsedInputs.imageurl

    try{
        const existing = await prismaClient.items.findFirst({
            where : {title : title}
        })
        if(existing){
            return res.json({
                message : "Item already present"
            })
        }
        const user = await prismaClient.items.create({
            data : {
                title : title,
                description : description,
                price : price,
                imageurl : imageurl
            }
        })
        return res.json({
            message : "Item added successfully"
        })
        // alert("Item added successfully");
    }catch(e){
        console.log("ERR" , e)
        // alert("Something went wrong")
    }
})


router.get('/items', authenticateJwt, async(req, res) => {
    const allItems = await prismaClient.items.findMany();
    res.json({
        allItems : allItems
    })
})
export default router;