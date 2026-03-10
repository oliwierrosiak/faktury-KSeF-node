import { Invoices } from "../db/dbConfig.js"

async function search(req,res)
{
    try
    {
        const list = await Invoices.find({},'Fa.NumerFaktury Fa.DataWystawienia').limit(10)
        res.status(200).json(list)
    }
    catch(ex)
    {
        res.sendStatus(404)
    }
}

export default search