import { Invoices } from '../db/dbConfig.js'

async function getInvoices(req,res)
{
    try
    {
        let invoices, startDate, endDate;
        if(req.query.date == 'all')
        {
            invoices = await Invoices.find({},'ksefNumber Fa.NumerFaktury Fa.Waluta Fa.DataWystawienia Podsumowanie.Brutto action').skip(req.query.skip*process.env.INVOICES_PER_PAGE).limit(process.env.INVOICES_PER_PAGE).sort({'Fa.DataWystawienia':-1})
        }
        else
        {
            const startDateArray = req.query.date.split('-')
            const endDateArray = req.query.date.split('-')
            startDate = `${startDateArray[0]}-${startDateArray[1].length === 1?`0${startDateArray[1]}`:startDateArray[1]}-${startDateArray[2]}`
            endDate = `${endDateArray[0]}-${+endDateArray[1]+1 > 9?+endDateArray[1]+1:`0${+endDateArray[1]+1}`}-${endDateArray[2]}`

            invoices = await Invoices.find({'Fa.DataWystawienia':{$gte:startDate,$lt:endDate}},'ksefNumber Fa.NumerFaktury Fa.Waluta Fa.DataWystawienia Podsumowanie.Brutto action').skip(req.query.skip*process.env.INVOICES_PER_PAGE).limit(process.env.INVOICES_PER_PAGE).sort({'Fa.DataWystawienia':-1})
        }

        if(!invoices.length) throw new Error()

        const returnObject = {invoices:invoices}

        if(req.query.skip == 0)
        {
            let fullInvoiceLength = 0
            if(req.query.date == 'all')
            {
                fullInvoiceLength = await Invoices.find({},'_id').countDocuments()
            }
            else
            {
                fullInvoiceLength = await Invoices.find({'Fa.DataWystawienia':{$gte:startDate,$lt:endDate}}).countDocuments()
            }
            returnObject.maxLength = fullInvoiceLength
        }

        res.status(200).json(returnObject)
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(404)
    }
}

export default getInvoices