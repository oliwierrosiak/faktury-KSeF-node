export const getGrossAmount = (obj) =>
{
    if(obj.P_11A)
    {
        return Number(obj.P_11A[0])
    }
    else
    {
        if(obj.P_11 && obj.P_11Vat)
        {
            const net = parseFloat(obj.P_11?.[0] || 0)
            const vat = parseFloat(obj.P_11Vat?.[0] || 0)
            const gross = net+vat
            return Number(gross.toFixed(2))
        }
        if(obj.P_12 && obj.P_11)
        {
            const net = parseFloat(obj.P_11?.[0] || 0)
            const vatRate = parseFloat(obj.P_12?.[0] || 0)
            const vat = net * (vatRate/100)
            const gross = net + vat
            return Number(gross.toFixed(2))
        }
    }
}

export const getNetAmount = (obj) =>
{
    if(obj.P_11)
    {
        return Number(obj.P_11[0])
    }
    else
    {
        if(obj.P_11A && obj.P_11Vat)
        {
            const gross = parseFloat(obj.P_11A?.[0] || 0)
            const vat = parseFloat(obj.P_11Vat?.[0] || 0)
            const net = gross - vat
            return Number(net.toFixed(2))
        }
        else if(obj.P_11A && obj.P_12)
        {
            const gross = parseFloat(obj.P_11A?.[0] || 0)
            const vatRate = parseFloat(obj.P_12?.[0] || 0)
            const net = gross / (1 + vatRate / 100)
            return Number(net.toFixed(2))
        }
       
    }
}

export const getVatAmount = (obj) =>
{
    if(obj.P_11Vat)
    {
        return Number(obj.P_11Vat[0])
    }
    else
    {
        if(obj.P_11 && obj.P_12)
        {
            const vat = obj.P_12[0]/100
            const vatAmount = obj.P_11[0]*vat
            return Number(vatAmount.toFixed(2))
        }
        if(obj.P_11A && obj.P_12)
        {
            const gross = parseFloat(obj.P_11A?.[0] || 0)
            const vatRate = parseFloat(obj.P_12?.[0] || 0)
            const vat = Number((gross * vatRate / (100 + vatRate)).toFixed(2))
            return vat
        }
    }
}