import axios from 'axios'
import { create } from 'xmlbuilder2'

function generateXML(challenge)
{
    const xmlObj = {
        AuthTokenRequest:{
            "@xmlns":'http://ksef.mf.gov.pl/AuthTokenRequest',
            ChallengeValue: challenge,
            ContextIdentifier:{
                Type:'NIP',
                Identifier:process.env.NIP
            }
        }
    }

    return create(xmlObj).end({ prettyPrint:true})
}

async function getInvoices(req,res)
{
    try
    {
        const response = await axios.post(`${process.env.KSEF}/auth/challenge`)
        const challenge= response.data.challenge
        if(!challenge) throw new Error()
        const xmlDoc = generateXML(challenge)
        console.log(xmlDoc)
    }
    catch(ex)
    {
        console.log(ex)
    }
    res.sendStatus(200)
}

export default getInvoices