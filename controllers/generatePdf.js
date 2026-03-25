import { Invoices } from '../db/dbConfig.js'
import createPdfHtml from '../helpers/createPdfHtml.js'
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

        const html = createPdfHtml(invoicesToGenerate)

        await page.setContent(html,{waitUntil:'domcontentloaded'})

        await page.addStyleTag({
            path:'helpers/pdfStyle.css'
        })

        await page.pdf({
            path:`./temp/faktury.pdf`,
            format: 'A4',
            printBackground:true,
        })

        browser.close()

        res.download("./temp/faktury.pdf")
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default generatePdf