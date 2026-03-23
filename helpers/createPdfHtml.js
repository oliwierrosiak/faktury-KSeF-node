function createPdfHtml(data)
{

    const transformInvoiceAction = (action) =>
    {
        switch(action)
        {
            case 'notRecord':
                return 'Nie Księgować'
            case 'cost':
                return 'Koszt'
            default:
                return ''
        }
    }

    const getPositionAction = (invoiceAction,positionAction) =>
    {
        if(invoiceAction === 'notRecord' || positionAction === 'notRecord')
        {
            return 'Nie księgować'
        }
        else if(invoiceAction === 'cost' || positionAction === 'cost')
        {
            return 'Koszt'
        }
        else
        {
            if(positionAction === 'goods')
            {
                return 'Towar Handlowy'
            }
            else
            {
                return '-'
            }
        }
    }

    const html = `
    <html>

        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        </head>

        <body>
            ${data.map(x => `
                <article class="singleInvoice">
                 <header>
                    <h1>Faktura nr: ${x.invoiceNumber}</h1>
                    <p>Numer KSeF: ${x.ksefNumber}</p>
                    <p>Data wystawienia: ${x.issueDate}</p>
                    <p>Rodzaj faktury: ${x.invoiceType}</p>
                    <div class="action">
                        <h2>${transformInvoiceAction(x.action)}</h2>
                    </div>
                </header>  
                
                <section class="info">
                    <div class="infoItem">
                        <h2>Sprzedawca</h2>
                        <div class="line"></div>
                        <p>Nazwa: ${x.seller.name}</p>
                        ${x.seller.nip?`<p>NIP: ${x.seller.nip}</p>`:''}
                    </div>

                    <div class="infoItem">
                        <h2>Nabywca</h2>
                        <div class="line"></div>
                        <p>Nazwa: ${x.buyer.name}</p>
                        ${x.buyer?.identifier?.type === 'Nip'?`<p>NIP:${x.buyer.identifier.value}</p>`:''}
                    </div>
                </section>


                <section class="table">

                    <div class="rowHeader">
                        <div class="tableHeader">
                            Nazwa
                        </div>
                        <div class="tableHeader">
                            Wartość Netto
                        </div>
                        <div class="tableHeader">
                            VAT
                        </div>
                        <div class="tableHeader">
                            Wartośc Brutto
                        </div>
                        <div class="tableHeader">
                            Akcja
                        </div>
                    </div>

                    ${x.invoiceFields.map(y=>`
                    <div class="row">
                        <div class="tableItemName">
                            <h2>${y.name}</h2>   
                            ${y.comment != ''?`<h3>${y.comment}</h3>`:''}
                        </div>
                        <div class="tableItem">
                            ${y.netAmount} ${x.currency}
                        </div>
                        <div class="tableItem">
                             ${y.netAmount} ${x.currency}
                        </div>
                        <div class="tableItem">
                            ${y.netAmount} ${x.currency}
                        </div>
                        <div class="tableItem">
                            ${getPositionAction(x.action,y.action)}
                        </div>
                    </div>      
                    `
                    ).join('')}

                </section>

                <section class="sumTable">
                    <div class="sumTableHeader">Wartość Netto</div>
                    <div class="sumTableHeader">VAT</div>
                    <div class="sumTableHeader">Wartość Brutto</div>
                    <div class="sumTableItem">${`${x.netAmount} ${x.currency}`}</div>
                    <div class="sumTableItem">${`${x.vatAmount} ${x.currency}`}</div>
                    <div class="sumTableItem bold">${`${x.grossAmount} ${x.currency}`}</div>
                </section>

                <section class="paymentAndComments">
                    <div class="paymentAndCommentsItem">
                        <h2>Płatność</h2>
                        <div class="line"></div>
                        <p>Metoda Płatności: ${x.paymentMethod}</p>
                        <p>${x.paymentDate}</p>
                    </div>

                    <div class="paymentAndCommentsItem">
                        <h2>Uwagi</h2>
                        <div class="line"></div>
                        <p class="commentsContent">${x.comments === ''?'brak':x.comments}</p>
                    </div>
                </section>
            </article>

            `).join('')}

        </body>

    </html>
    `
    return html
}

export default createPdfHtml