import { create } from 'xmlbuilder2'

function generateXML(challenge)
{
    const xmlObj = {
        AuthTokenRequest:{
            "@xmlns":"http://ksef.mf.gov.pl/auth/token/2.0",
            Challenge: challenge,
            ContextIdentifier:{
                Nip:process.env.NIP
            },
            SubjectIdentifierType: 'certificateSubject'
        }
    }

    return create({version:'1.0',encoding:'utf-8'},xmlObj).end({format:'xml',prettyPrint:false})
}

export default generateXML