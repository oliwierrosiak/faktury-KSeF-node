import axios from 'axios'
import ksefAuth from '../helpers/ksefAuth.js'
import awaitUntilAuthBeDone from '../helpers/awaitUntilAuthBeDone.js'
import getKsefTokens from '../helpers/getKsefTokens.js'

async function downloadInvoices(req,res)
{
    try
    {
        const {token,number} = await ksefAuth()

        if(!token) throw new Error()

        const auth = await awaitUntilAuthBeDone(number,token)

        if(auth === false)
        {
            throw new Error()
        }

        const accessToken = await getKsefTokens(token) 


        res.sendStatus(200)
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
   
}

export default downloadInvoices