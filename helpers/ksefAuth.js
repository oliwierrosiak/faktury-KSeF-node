import axios from "axios"
import generateXML from './generateXML.js'
import sign from './sign.js'

async function ksefAuth()
{
    const response = await axios.post(`${process.env.KSEF}/auth/challenge`)

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
    const auth = {token:authorization.data.authenticationToken.token,number:authorization.data.referenceNumber}
    return auth

}

export default ksefAuth