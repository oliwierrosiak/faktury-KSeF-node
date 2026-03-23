import { Invoices } from "../db/dbConfig.js"

async function updateInvoiceComments(req,res)
{
    try
    {
        const invoice = await Invoices.findById(req.body.id)
        invoice.comments = req.body.comments
        await invoice.save()
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateInvoiceComments