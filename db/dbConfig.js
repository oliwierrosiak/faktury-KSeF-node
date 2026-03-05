import mongoose from "mongoose";
import InvoicesModel from "./invoicesModel.js";

export const Invoices = mongoose.model('invoice',InvoicesModel)

export default function mongoDbConnect()
{
    mongoose.connect(process.env.DATABASE)
}