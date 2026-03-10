import { Invoices } from "../db/dbConfig.js"

async function getSingleInvoice(req,res)
{
    try
    {
        const invoice = await Invoices.findById(req.query.id)
        res.status(200).json(invoice)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default getSingleInvoice