import axios from 'axios'
import ksefAuth from '../helpers/ksefAuth.js'
import awaitUntilAuthBeDone from '../helpers/awaitUntilAuthBeDone.js'
import getKsefTokens from '../helpers/getKsefTokens.js'

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
        console.log(invoicesMeta.data.hasMore)
        console.log(invoicesMeta.data.invoices.length)
        res.sendStatus(200)
    }
    catch(ex)
    {
        console.log(ex.response.data.exception.exceptionDetailList)
        res.sendStatus(500)
    }
   
}

export default downloadInvoices