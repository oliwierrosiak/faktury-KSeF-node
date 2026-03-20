import { Invoices } from '../db/dbConfig.js'
import generatePDF from '../helpers/generatePDF.js'

async function generatePdf(req,res)
{
    try
    {
        const invoicesToGenerate = await Invoices.find({_id:req.body.selected})
        invoicesToGenerate.forEach(x=>generatePDF(x))
    }
    catch(ex)
    {
        console.log(ex)
    }
    res.sendStatus(200)
}

export default generatePdf