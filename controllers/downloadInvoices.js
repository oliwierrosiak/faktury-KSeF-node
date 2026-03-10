import axios from 'axios'
import sign from '../helpers/sign.js'
import generateXML from '../helpers/generateXML.js'

async function downloadInvoices(req,res)
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
        const xmlBuffer = Buffer.from(signedXML, 'utf-8');
        console.log(signedXML)
        // return
        const auth = await axios.post(`${process.env.KSEF}/auth/xades-signature`,xmlBuffer,{params:{
            verifyCertificateChain: false
        },headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Accept': 'application/json'
        }})
        console.log(auth)
    }
    catch(ex)
    {
        console.log(ex)
        // console.log(JSON.stringify(ex.response.data, null, 2));
    }
    res.sendStatus(200)
}

export default downloadInvoices