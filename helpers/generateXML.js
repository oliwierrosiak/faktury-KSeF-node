import { create } from 'xmlbuilder2'

function generateXML(challenge)
{
    const xmlObj = {
        AuthTokenRequest:{
            "@xmlns":"http://ksef.mf.gov.pl/auth/token/2.0",
            ChallengeValue: challenge,
            ContextIdentifier:{
                Type:'onip',
                Identifier:process.env.NIP
            }
        }
    }

    return create(xmlObj).end()
}

export default generateXML