import xml2js from 'xml2js'
import { getNetAmount,getGrossAmount, getVatAmount } from './countingNetGrossAndVatAmount.js'

async function transformXMLToJSON(xml)
{
    const obj = await xml2js.parseStringPromise(xml,{
        explicitArray: true,
        tagNameProcessors:[name => name.replace(/^[^:]+:/, '')]
    })

    const payment = obj.Faktura.Fa[0].Platnosc[0]

    let paymentForm = 'Brak danych'
    let paymentDate = 'Termin Płatności: Brak danych'
    if(payment?.FormaPlatnosci)
    {
        paymentForm = payment.FormaPlatnosci.map(x=>{
            switch(x)
            {
                case '1':
                    return 'Gotówka'
                case '2':
                    return 'Karta'
                case '3':
                    return 'Czek'
                case '4':
                    return 'Weksel'
                case '5':
                    return 'Kompensata'
                case '6':
                    return 'Przelew'
                case '7':
                    return 'Inna'
            }
        })[0]
    }

    if(payment?.PlatnoscInna?.[0] === '1')
    {
        paymentForm = payment?.OpisPlatnosci?.[0] || 'inna'
    }

    if(!payment.PlatnoscInna && !payment.FormaPlatnosci && payment.RachunekBankowy)
    {
        paymentForm = `Przelew`
    }

    if(payment?.DataZaplaty)
    {
        paymentDate = `Opłacono dnia: ${payment.DataZaplaty[0]}`
    }

    if(payment?.TerminPlatnosci?.[0])
    {
        paymentDate = `Termin Płatności: ${payment.TerminPlatnosci[0].Termin[0]}`
    }

    const rows = obj.Faktura.Fa[0].FaWiersz

    const sellDate = obj.Faktura.Fa[0].P_6?.[0] ? obj.Faktura.Fa[0].P_6[0] : (obj.Faktura.Fa[0].P_1?.[0] ? obj.Faktura.Fa[0].P_1[0] : null)

    const necessaryFields = rows.map(x=>{
        return{
            name:x.P_7[0],
            netAmount:getNetAmount(x),
            grossAmount:getGrossAmount(x),
            vatAmount:getVatAmount(x)
        }
    })
    return {preparedFields:necessaryFields,paymentMethod:paymentForm,paymentDate:paymentDate,sellDate}
}

export default transformXMLToJSON