import mongoose from "mongoose";

const InvoicesModel = mongoose.Schema({
    ksefNumber:String,
    action:{
        type:String,
        default:null
    }
})

export default InvoicesModel