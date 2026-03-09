import { Invoices } from '../db/dbConfig.js'

async function getAllInvoices(req,res)
{
    try
    {
        const invoices = await Invoices.find({},'ksefNumber Fa.NumerFaktury Fa.Waluta Fa.DataWystawienia Podsumowanie.Brutto action').skip(req.query.skip*10).limit(10).sort({'Fa.DataWystawienia':-1})
        const returnObject = {invoices:invoices}
        if(req.query.skip == 0)
        {
            const fullInvoiceLength = await Invoices.find({},'_id').countDocuments()
            returnObject.maxLength = fullInvoiceLength
        }
        if(!invoices.length) throw new Error()
        res.status(200).json(returnObject)
    }
    catch(ex)
    {
        res.sendStatus(404)
    }
}

export default getAllInvoices