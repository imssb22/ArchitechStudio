// const { prismaClient } = require('../db/db');
import { prismaClient } from "../db/db.js";
const JWT_SECRET= 'my-secret-key'
import jwt from 'jsonwebtoken'
export const authenticateJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        console.log(authHeader);
        return res.status(411).json({
            message : "wrong initial string for authheader"
        })
    }
    try{
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const user = await prismaClient.user.findFirst({
            where: {
                id: decoded.userId
            }
        });
        
        if(!user) {
            return res.status(412).json({
                message: "You are not authenticated"
            });
        }
        
        req.user = {
            id: user.id,
            username: user.username
        };
        next();
        } catch(e){
            console.log(e)
            return res.status(411).json({
                message : "Something went wrong"            
        })
    }
    
  };
