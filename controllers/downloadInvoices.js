import axios from 'axios'
import ksefAuth from '../helpers/ksefAuth.js'
import awaitUntilAuthBeDone from '../helpers/awaitUntilAuthBeDone.js'

async function downloadInvoices(req,res)
{
    try
    {
        const {token,number} = await ksefAuth()

        if(!token) throw new Error()

        const auth = await awaitUntilAuthBeDone(number,token)

        console.log(auth)
        if(auth === false)
        {
            throw new Error()
        }

       console.log('uweirzytelninono')


        res.sendStatus(200)
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
   
}

export default downloadInvoices