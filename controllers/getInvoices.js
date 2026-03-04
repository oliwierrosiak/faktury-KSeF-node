import axios from 'axios'
import sign from '../helpers/sign.js'
import generateXML from '../helpers/generateXML.js'

async function getInvoices(req,res)
{
    try
    {
        const response = await axios.post(`${process.env.KSEF}/auth/challenge`)
        const challenge= response.data.challenge
        if(!challenge) throw new Error()
        const xmlDoc = generateXML(challenge)
        const signedXML = await sign(xmlDoc)
        console.log(signedXML)
    }
    catch(ex)
    {
        console.log(ex)
    }
    res.sendStatus(200)
}

export default getInvoices