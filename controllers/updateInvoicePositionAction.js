import { Invoices } from "../db/dbConfig.js"

async function updateInvoicePositionAction(req,res)
{
    try
    {
        const invoice = await Invoices.findById(req.body.invoiceId)
        const invoiceField = invoice.invoiceFields.id(req.body.positionId)
        invoiceField.action = req.body.action
        await invoice.save()
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateInvoicePositionAction