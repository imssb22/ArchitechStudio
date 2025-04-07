// const { prismaClient } = require('../db/db');
import { prismaClient } from "../db/db.js";
const JWT_SECRET= 'my-secret-key'
import jwt from 'jsonwebtoken'
export const authenticateJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        // console.log("one");
        return res.status(411).json({
            message : "wrong initial string for authheader"
        })
    }
    try{
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            // jwt.verify(token, SECRET, (err) => {
            //   if (err) {
            //     return res.sendStatus(403);
            //   }
            const decoded = jwt.verify(token, JWT_SECRET);
            
            const user = await prismaClient.user.findFirst({
                where : {
                    id : decoded
                }
            })
            if(!user){
                res.status(412).json({
                    message : "You are not authenticated"
                })
            }else{
            req.username = user.username;
            next();
            }
            }
            else {
                res.sendStatus(401).json({
                      message : "Authheader Not present"
                });
              }
          } catch(e){
                console.log(e)
                return res.status(411).json({
                    message : "Something went wrong"            
        })
    }
    
  };
