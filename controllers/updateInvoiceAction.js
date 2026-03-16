import { Invoices } from "../db/dbConfig.js"

async function updateInvoiceAction(req,res)
{
    try
    {
        const invoice = await Invoices.findById(req.body.id)
        invoice.action = req.body.action
        await invoice.save()
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateInvoiceAction