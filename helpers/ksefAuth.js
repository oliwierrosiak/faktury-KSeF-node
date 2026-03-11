import axios from "axios"
import generateXML from './generateXML.js'
import sign from './sign.js'

async function ksefAuth()
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

        const authorization = await axios.post(`${process.env.KSEF}/auth/xades-signature`,xmlBuffer,{params:{
            verifyCertificateChain: false
        },headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Accept': 'application/json'
        }})
        const token = authorization.data.authenticationToken.token
        return token
    }
    catch(ex)
    {
        return null
    }
   
}

export default ksefAuth