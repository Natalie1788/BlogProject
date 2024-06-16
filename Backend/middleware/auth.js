import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Middleware for verification that user is trusted
export const auth = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]
  
    if(!token) {
        return res.status(401).send("Access denied")
    }
    if(!process.env.JWT_SECRET) {
        return res.status(500).json({error: "internal server error"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch(error) {
        console.error(error);
        res.status(400).send("Invalid token")
    } 
  }