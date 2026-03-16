import axios from "axios"

const awaitUntilAuthBeDone = async(number,token) =>
{
    try
    {
        const promise =()=> new Promise(resolve=>setTimeout(resolve,500))
    
        for(let i = 0 ;i<20;i++)
        {
            const response = await axios.get(`${process.env.KSEF}/auth/${number}`,{headers:{"Authorization":`Bearer ${token}`}})
            if(response.data.status.code === 200)
            {
                return true
            }

            await promise()
        }

        return false
    }
    catch(ex)
    {
        return false
    }
    
}

export default awaitUntilAuthBeDone