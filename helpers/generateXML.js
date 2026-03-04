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

export default generateXML