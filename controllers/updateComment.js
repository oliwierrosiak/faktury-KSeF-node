import { Invoices } from "../db/dbConfig.js"
import mongoose from "mongoose"

async function updateComment(req,res)
{
    try
    {
        const invoice = await Invoices.findOne({'invoiceFields._id':req.body.id})
        const field = invoice.invoiceFields.id(req.body.id)
        field.comment = req.body.content
        await invoice.save()
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
    
}

export default updateComment