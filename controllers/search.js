import { Invoices } from "../db/dbConfig.js"

async function search(req,res)
{
    try
    {
        const list = await Invoices.find({$or:[{invoiceNumber:{$regex:`^${req.query.query}`, $options:'i'}},{ksefNumber:{$regex:`^${req.query.query}`,$options:'i'}},{issueDate:{$regex:`^${req.query.query}`}}]}).select("invoiceNumber issueDate").sort({'issueDate':-1})
        if(!list.length) throw new Error()
        res.status(200).json(list)
    }
    catch(ex)
    {
        res.sendStatus(404)
    }
}

export default search