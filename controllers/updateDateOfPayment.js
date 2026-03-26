import { Invoices } from "../db/dbConfig.js"

async function updateDateOfPayment(req,res)
{
    try
    {
        const invoice = await Invoices.findById(req.body.id)
        invoice.dateOfPayment = req.body.date
        invoice.save()
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateDateOfPayment