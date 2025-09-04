import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';

// App config
const PORT = process.env.port || 4000
const app = express();
await connectDB()
// middlewares
app.use(express.json())
app.use(cors())

// Api route
app.get('/',(req,res)=>{
    res.send("API working")
})
 app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
 })