import xml2js from 'xml2js'

async function transformXMLToJSON(xml)
{
    console.log(xml)
    const obj = await xml2js.parseStringPromise(xml)
    console.log(obj)
    const rows = obj.Faktura.Fa[0].FaWiersz
    const necessaryFields = rows.map(x=>{
        return{
            name:x.P_7[0],
            netAmount:Number(x.P_11?.[0] || x.P_11A?.[0] || x.P_11B?.[0]),
        }
    })
    return necessaryFields
}

export default transformXMLToJSON