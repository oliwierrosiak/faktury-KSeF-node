import mongoose, { mongo } from "mongoose";

const invoiceFieldSchema = mongoose.Schema({
    name:String,
    netAmount:Number,
    comment:{
        type:String,
        default:''
    },
    action:{
        type:String,
        default:null
    }
})

const InvoicesModel = mongoose.Schema({
    ksefNumber:{
        type:String,
        unique: true,
        required:true
    },
    action:{
        type:String,
        default:null
    },
    invoiceNumber:String,
    issueDate:String,
    seller:Object,
    buyer:Object,
    netAmount:Number,
    grossAmount:Number,
    vatAmount:Number,
    currency:String,
    invoiceType:String,
    invoiceFields:[invoiceFieldSchema],
    comments:{
        type:String,
        default:''
    },
    paymentMethod:String,
    paymentDate:String,
})

export default InvoicesModel