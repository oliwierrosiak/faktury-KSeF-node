import axios from 'axios'
import ksefAuth from '../helpers/ksefAuth.js'
import awaitUntilAuthBeDone from '../helpers/awaitUntilAuthBeDone.js'
import getKsefTokens from '../helpers/getKsefTokens.js'
import { Invoices } from '../db/dbConfig.js'
import dateFilterSetter from '../helpers/dateFilterSetter.js'
import insertNewInvoices from '../helpers/insertNewInvoices.js'

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

        const lastInvoice = await Invoices.find({}).sort({issueDate:-1}).limit(1).select('issueDate')
        
        const startDate = dateFilterSetter(lastInvoice[0])   

        console.log(startDate)

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

        await insertNewInvoices(invoices)

        res.sendStatus(200)
    }
    catch(ex)
    {
        console.log(ex)
        // console.log(ex.response.data.exception.exceptionDetailList)
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