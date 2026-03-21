import archiver from 'archiver'
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
        
        const pdfDir = fs.readdirSync('temp')

        const output = fs.createWriteStream('temp/faktury.zip')
        const zip = archiver('zip')

       zip.pipe(output)

        for(const file of pdfDir)
        {
            zip.file(`temp/${file}`,{name:file})
        }

        await zip.finalize()

        res.download("./temp/faktury.zip")
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
}

export default generatePdf