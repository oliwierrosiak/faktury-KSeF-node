import { Invoices } from "../db/dbConfig.js"

async function search(req,res)
{
    try
    {
        const list = await Invoices.find({$or:[{"Fa.NumerFaktury":{$regex:`^${req.query.query}`, $options:'i'}},{ksefNumber:{$regex:`^${req.query.query}`,$options:'i'}},{"Fa.DataWystawienia":{$regex:`^${req.query.query}`}}]}).select("Fa.NumerFaktury Fa.DataWystawienia").sort({'Fa.DataWystawienia':-1})
        res.status(200).json(list)
    }
    catch(ex)
    {
        res.sendStatus(404)
    }
}

export default search