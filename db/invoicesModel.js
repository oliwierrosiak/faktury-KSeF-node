import mongoose, { mongo } from "mongoose";

const invoiceFieldSchema = mongoose.Schema({
    name:String,
    brutto:Number,
    comment:{
        type:String,
        default:''
    }
})

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
    invoiceFields:[invoiceFieldSchema]
})

export default InvoicesModel