async function generatePDF(data,page)
{
    const html = `
    <h1>Test</h1>
    `

    await page.setContent(html,{waitUntil:'domcontentloaded'})

    await page.addStyleTag({
        path:'helpers/pdfStyle.css'
    })

    await page.pdf({
        path:`./temp/${data.ksefNumber}.pdf`,
        format: 'A4',
        printBackground:true,
    })
}

export default generatePDF