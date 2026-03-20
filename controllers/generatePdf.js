import { Invoices } from '../db/dbConfig.js'
import generatePDF from '../helpers/generatePDF.js'
import fs from 'fs'
import puppeteer from 'puppeteer'

const clearTemp = () =>
{
    const temp = fs.readdirSync('temp')
    temp.forEach(x=>fs.unlinkSync(`temp/${x}`))
}

export let browser
export let page

async function generatePdf(req,res)
{
    try
    {
        browser = await puppeteer.launch()

        page = await browser.newPage()

        const invoicesToGenerate = await Invoices.find({_id:req.body.selected})

        clearTemp()

        for(let i = 0;i<invoicesToGenerate.length;i++)
        {
            await generatePDF(invoicesToGenerate[i],page)
        }

        browser.close()
    }
    catch(ex)
    {
        console.log(ex)
    }
    res.sendStatus(200)
}

export default generatePdf