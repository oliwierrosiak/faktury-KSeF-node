import { Invoices } from "../db/dbConfig.js"
import ksefAuth from "../helpers/ksefAuth.js"
import awaitUntilAuthBeDone from "../helpers/awaitUntilAuthBeDone.js"
import getKsefTokens from "../helpers/getKsefTokens.js"
import axios from "axios"
import transformXMLToJSON from "../helpers/transformXMLToJSON.js"

async function getSingleInvoice(req,res)
{
    try
    {
        let invoice = await Invoices.findById(req.query.id)

        if(invoice.invoiceFields.length == 0)
        {
            const {token,number} = await ksefAuth()
            const auth = await awaitUntilAuthBeDone(number,token)
            if(auth === false)
            {
                throw new Error()
            }
            const accessToken = await getKsefTokens(token) 

            const invoiceFields = await axios.get(`${process.env.KSEF}/invoices/ksef/${invoice.ksefNumber}`,{headers:{"Authorization":`Bearer ${accessToken}`}})

            const {preparedFields,paymentMethod,paymentDate,sellDate} = await transformXMLToJSON(invoiceFields.data)

            console.log(sellDate)

            await Invoices.updateOne({_id:invoice._id},{$set: {invoiceFields:preparedFields,paymentMethod:paymentMethod,paymentDate:paymentDate,sellDate:sellDate}})

            invoice = await Invoices.findById(invoice._id)
        }
        
        res.status(200).json(invoice)
    }
    catch(ex)
    {
        if(ex.status === 429 && ex.response?.data?.status)
        {
            res.status(429).json(ex.response.data.status)
        }
        else
        {
            res.sendStatus(500)
        }
    }
}

export default getSingleInvoice