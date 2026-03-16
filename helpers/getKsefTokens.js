import axios from "axios"

async function getKsefTokens(authToken)
{
    const response = await axios.post(`${process.env.KSEF}/auth/token/redeem`,{},{headers:{"Authorization":`Bearer ${authToken}`}})
    return response.data.accessToken.token
}

export default getKsefTokens