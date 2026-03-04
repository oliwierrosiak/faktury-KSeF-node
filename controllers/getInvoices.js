import axios from 'axios'
import sign from '../helpers/sign.js'
import generateXML from '../helpers/generateXML.js'

async function getInvoices(req,res)
{
    try
    {
        const response = await axios.post(`${process.env.KSEF}/auth/challenge`,{
        contextIdentifier: {
            type: "onip",
            identifier: process.env.NIP
        }
        })
        const challenge = response.data.challenge
        if(!challenge) throw new Error()
        const xmlDoc = generateXML(challenge)
        const signedXML = await sign(xmlDoc)
        const auth = await axios.post(`${process.env.KSEF}/auth/xades-signature`,signedXML,{headers:{"Content-Type":'application/xml',"Accept": "application/json"}})
    }
    catch(ex)
    {
        console.log(JSON.stringify(ex.response.data, null, 2));
    }
    res.sendStatus(200)
}

export default getInvoices