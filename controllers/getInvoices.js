import axios from 'axios'

function generateXML(challenge)
{
    const xmlObj = {
        
    }
}

async function getInvoices(req,res)
{
    try
    {
        const response = await axios.post(`${process.env.KSEF}/auth/challenge`)
        const challenge= response.data.challenge
        if(!challenge) throw new Error()
        generateXML(challenge)
    }
    catch(ex)
    {
        console.log(ex)
    }
    res.sendStatus(200)
}

export default getInvoices