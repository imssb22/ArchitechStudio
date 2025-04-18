
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
import { retry } from '@reduxjs/toolkit/query';
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
        const token = 'Bearer ' + jwt.sign({
            userId : user.id,
            username : user.username
        }, JWT_SECRET)
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
            const token = 'Bearer ' + jwt.sign({
                userId : user.id,
                username : user.username
            }, JWT_SECRET)
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
            const token = 'Bearer ' + jwt.sign({
                userId : user.id,
                username : user.username
            }, JWT_SECRET)
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

router.get('/search', async (req, res) => {
    const { q } = req.query; 

    if (!q || typeof(q) !== 'string') {
        return res.status(400).json({ message: "Invalid search query" });
    }

    try {
        const searchedItems = await prismaClient.items.findMany({
        where: {
            title: {
            contains: q,
            mode: 'insensitive' 
            }
        }
        });
    res.json(searchedItems);
    }catch(e){
        console.error(e);
        res.status(500).json("Error in searching")
    }
})

router.get('/items/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try{
        const item = await prismaClient.items.findFirst({
            where : {
                id : id
            }
        })
        console.log(item)
        return res.json(item);
    }catch(e){
        console.error(e);
        res.status(500).json("Error in searching")
    }
})

router.put('/items/:id',async (req, res) => {
    const id = req.params.id
    const itemData = req.body
    try{
        const item = await prismaClient.items.update({
            where : {
                id : id
            },
            data : itemData
        })
        res.json({
            
            message : "Item updated successfully"
        });
    }catch(e){
        console.error(e);
        res.status(500).json("Error in searching")
    }
})

router.put('/cart', authenticateJwt, async (req, res) => {
    const itemId = req.body.itemId;
    const item = req.body
    try{
        const order = await prismaClient.orders.upsert({
            where : {itemId : itemId},
            update : {quantity : {increment : 1}},
            create : {
                title : item.title,
                description : item.description,
                price : item.price,
                imageurl : item.imageurl,
                quantity : 1,
                itemId : itemId,
                userId : req.user.id
            }
        })
        res.json(order);
        alert("Item added successfully")
    }catch(e){
        console.log("err" , e);
        res.status(501).json({
            message : "Something went wrong"
        })
    }
})

router.get('/cart', authenticateJwt, async (req, res) => {
    const userId = req.user.id;
    try{
        const cartItems = await prismaClient.orders.findMany({
            where : {userId : userId}
        })
        res.json(cartItems)

    }catch(e){
        console.log("err", e);
        res.status(511).json({
            message : "Something went wrong"
        })
    }
});

router.put('/cart/:itemId', authenticateJwt, async(req, res) => {
    const change = req.body.change;
    const itemId = req.params.itemId;

    try{
        const currOrder = await prismaClient.orders.findFirst({
            where : {itemId : itemId}
        })
        if(currOrder.quantity + change < 0){
            return res.json({
                message : "Quantity can't go lower than 0"
            })
        }
        const order = await prismaClient.orders.update({
            where : {itemId : itemId},
            data : {
                quantity : {increment : change}
            }
        });
        return res.json({
            quantity : order.quantity
        })

    }catch(e){
        console.log(e);
        res.status(511).json({
            message : "Something went wrong",
        });
        
    }
})



router.get('/architects', authenticateJwt, async(req, res) => {
    const allItems = await prismaClient.architects.findMany();
    res.json({
        allItems : allItems
    })
})

router.post('/addarchitect', authenticateJwt, async(req, res) => {
    const inputs = req.body;
    const name = inputs.name
    const phone = inputs.phone
    const description = inputs.description
    const imageurl = inputs.imageurl
    const rating = inputs.rating
    const yoe = inputs.yoe

    try{
        const existing = await prismaClient.architects.findFirst({
            where : {name : name}
        })
        if(existing){
            return res.json({
                message : "Architect already present"
            })
        }
        const user = await prismaClient.architects.create({
            data : {
                name : name,
                yoe : yoe,
                phone : phone,
                description : description,
                rating : rating,
                imageurl : imageurl
            }
        })
        return res.json({
            message : "Architect added successfully"
        })
        // alert("Item added successfully");
    }catch(e){
        console.log("ERR" , e)
        // alert("Something went wrong")
    }
})

router.put('/architects/:id',async (req, res) => {
    const id = req.params.id
    const itemData = req.body
    try{
        const item = await prismaClient.architects.update({
            where : {
                id : id
            },
            data : itemData
        })
        res.json({
            
            message : "Item updated successfully"
        });
    }catch(e){
        console.error(e);
        res.status(500).json("Error in searching")
    }
})

router.get('/architects/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try{
        const item = await prismaClient.architects.findFirst({
            where : {
                id : id
            }
        })
        console.log(item)
        return res.json(item);
    }catch(e){
        console.error(e);
        res.status(500).json("Error in searching")
    }
})

router.get('/bookings', authenticateJwt, async(req, res) => {
    const id = req.user.id
    try{
        const bookings = await prismaClient.bookings.findMany({
            where : {userId : id}
        })
        console.log(bookings)
        if(bookings)
        res.json(bookings)
    }catch(e){
        console.log("ERR", e);
        res.status(500).json({
            message: "failed to fetch your bookings"
        })
    }
})

router.get('/bookings/:archId', authenticateJwt, async(req, res) => {
    const archId = req.params.archId

    try{
        const existing = await prismaClient.bookings.findMany({
            where : {
                architectId : archId,
                
            },
            select : {
                startTime : true,
                endTime : true
            }
        })
        if(existing){
            return res.json(existing)
        }
        
    }catch(e){
        console.error(e);
        res.status(500).json({
            message : "Error occured"
        })
    }

})

router.post('/bookings/:archId', authenticateJwt, async(req, res) => {
    const archId = req.params.archId
    const userId = req.user.id;
    const startTime = req.body.startTime
    const endTime = req.body.endTime;
    const name = req.body.name;
    const imageurl = req.body.imageurl
    
    try{
        const existing = await prismaClient.bookings.findMany({
            where : {
                architectId : archId,
                startTime : startTime,
                endTime : endTime
            },
            
        })
        if(existing.length !== 0){
            return res.json({
                message : "booking already present",
                present : true
            })
        }
        const newBooking = await prismaClient.bookings.create({
            data : {
                startTime : startTime,
                endTime : endTime,
                userId : req.user.id,
                name : name,
                imageurl : imageurl,
                architectId : archId
            }
        })
     
        res.status(200).json({
            message : "Created successfully"
        })

        return;
    }catch(e){
        console.error(e);
        res.status(500).json({
            message : "Error occured"
        })
    }
})

router.delete('/bookings/:bookingId', authenticateJwt, async(req, res) => {
    try{
        await prismaClient.bookings.delete({
            where : {id : req.params.bookingId }
        })
        return res.json({
            message : "Cancelled successfully"
        })
    }catch(e){
        console.log(e,"err")
    }
})

export default router;