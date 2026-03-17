import axios from "axios"

function getInvoiceData(number,accessToken)
{
    return axios.get(`${process.env.KSEF}/invoices/ksef/${number}`,{headers:{"Authorization":`Bearer ${accessToken}`}})
}

export default getInvoiceData