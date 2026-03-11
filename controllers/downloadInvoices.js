import axios from 'axios'
import ksefAuth from '../helpers/ksefAuth.js'

async function downloadInvoices(req,res)
{
    try
    {
        const token = await ksefAuth()
        
        if(!token) throw new Error()

        const response = await axios.post(`${process.env.KSEF}/invoices/query/metadata`,{
            subjectType:'SubjectAuthorized',
            dataRange:{
                dataType:'Issue',
                from:'2026-01-03T13:45:00+00:00.'
            },
        },{headers:{"Authorization":`Bearer ${token}`,"Content-Type":"application/json"}})
        console.log(response)

        res.sendStatus(200)
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
   
}

export default downloadInvoices