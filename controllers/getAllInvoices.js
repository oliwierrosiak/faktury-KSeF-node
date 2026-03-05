import { Invoices } from '../db/dbConfig.js'

async function getAllInvoices(req,res)
{
    try
    {
        const invoices = await Invoices.find({},'ksefNumber Fa.NumerFaktury Fa.Waluta Fa.DataWystawienia Podsumowanie.Brutto').sort({'Fa.DataWystawienia':1})
        res.status(200).json(invoices)
    }
    catch(ex)
    {
        res.sendStatus(404)
    }
}

export default getAllInvoices