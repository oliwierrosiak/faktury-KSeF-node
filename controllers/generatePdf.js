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

        for(const file in pdfDir)
        {
            zip.file(file)
        }

        await zip.finalize()

    }
    catch(ex)
    {
        console.log(ex)
    }
    res.sendStatus(200)
}

export default generatePdf