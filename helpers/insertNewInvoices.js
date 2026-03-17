import { Invoices } from "../db/dbConfig.js"

async function insertNewInvoices(invoices)
{
    try
    {
        await Invoices.insertMany(invoices,{
            ordered:false
        })
    }
    catch(ex)
    {
    }
}

export default insertNewInvoices