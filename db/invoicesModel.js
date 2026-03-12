import mongoose from "mongoose";

const InvoicesModel = mongoose.Schema({
    ksefNumber:String,
    action:{
        type:String,
        default:null
    },
    invoiceNumber:String,
    seller:Object,
    buyer:Object,
    netAmount:Number,
    grossAmount:Number,
    vatAmount:Number,
    currency:String,
    invoiceType:String,
    invoiceFields:Array
})

export default InvoicesModel