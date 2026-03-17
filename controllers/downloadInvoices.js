import axios from 'axios'
import ksefAuth from '../helpers/ksefAuth.js'
import awaitUntilAuthBeDone from '../helpers/awaitUntilAuthBeDone.js'
import getKsefTokens from '../helpers/getKsefTokens.js'
import getInvoiceData from '../helpers/getInvoiceData.js'
import { Invoices } from '../db/dbConfig.js'

async function downloadInvoices(req,res)
{
    try
    {
        const {token,number} = await ksefAuth()

        const auth = await awaitUntilAuthBeDone(number,token)

        if(auth === false)
        {
            throw new Error()
        }

        const accessToken = await getKsefTokens(token) 

        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 3)
        startDate.setDate(startDate.getDate()+1)

        const invoicesMeta = await axios.post(`${process.env.KSEF}/invoices/query/metadata?pageSize=250`,{
            subjectType:'Subject2',
            dateRange:{
                dateType:'Issue',
                from:startDate
            }
        },
        {headers:{"Authorization":`Bearer ${accessToken}`}}
        )

        const downloadInvoices = invoicesMeta.data.invoices

        const invoices = downloadInvoices.map(x=>{
            return {
                ksefNumber:x.ksefNumber,
                invoiceNumber:x.invoiceNumber,
                issueDate:x.issueDate.split('T')[0],
                seller:{...x.seller},
                buyer:{...x.buyer},
                netAmount:x.netAmount,
                grossAmount:x.grossAmount,
                vatAmount:x.vatAmount,
                currency:x.currency,
                invoiceType:x.invoiceType,
            }
        })
    
        await Invoices.insertMany(invoices)

        res.sendStatus(200)
    }
    catch(ex)
    {
        console.log(ex.response.data)
        if(ex.status === 429)
        {
            res.status(429).json({message: ex.response.data.status.details || "Too many request"})
        }
        else
        {

            res.sendStatus(500)
        }
    }
   
}

export default downloadInvoices