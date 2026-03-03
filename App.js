import dotenv from 'dotenv'
import app from "./server/expressConfig.js";

dotenv.config({
    path:`.env.${process.env.NODE_ENV}`
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listen on port ${process.env.PORT}`)
})