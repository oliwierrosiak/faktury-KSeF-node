function createPdfHtml(data)
{
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
                    <h1>Faktura nr: FAS/16055/03/2026/GL</h1>
                    <p>Numer KSeF: 6462490527-20260318-3E6116000013-9E</p>
                    <p>Data wystawienia: 2026-03-18</p>
                    <p>Rodzaj faktury: Vat</p>
                    <div class="action">
                        <h2>Nie Księgować</h2>
                    </div>
                </header>  
                
                <section class="info">
                    <div class="infoItem">
                        <h2>Sprzedawca</h2>
                        <div class="line"></div>
                        <p>Nazwa: ELTROX SP. Z O.O.</p>
                        <p>NIP: 6462490527</p>
                    </div>

                    <div class="infoItem">
                        <h2>Nabywca</h2>
                        <div class="line"></div>
                        <p>Nazwa: ELTROX SP. Z O.O.</p>
                        <p>NIP: 6462490527</p>
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

                    <div class="row">
                        <div class="tableItemName">
                            <h2>Obudowa Rack CCTV Getfort 3U (łatwy dostęp) 580*540*180mm Czarna</h2>   
                            <h3>Komentarz</h3>
                        </div>
                        <div class="tableItem">
                            206.32 PLN
                        </div>
                        <div class="tableItem">
                            206.32 PLN
                        </div>
                        <div class="tableItem">
                            206.32 PLN
                        </div>
                        <div class="tableItem">
                            Nie Księgować
                        </div>
                    </div>

                    <div class="row">
                        <div class="tableItemName">
                            <h2>SZAFA RACK GETFORT 19 CALI 6U 600X600 WISZĄCA DRZWI STALOWE</h2>   
                        </div>
                        <div class="tableItem">
                            285.68 PLN
                        </div>
                        <div class="tableItem">
                            285.68 PLN
                        </div>
                        <div class="tableItem">
                            285.68 PLN
                        </div>
                        <div class="tableItem">
                            Koszt
                        </div>
                    </div>

                    <div class="row">
                        <div class="tableItemName">
                            <h2>Koszty dostawy</h2>   
                        </div>
                        <div class="tableItem">
                            14.76 PLN
                        </div>
                        <div class="tableItem">
                            14.76 PLN
                        </div>
                        <div class="tableItem">
                            14.76 PLN
                        </div>
                        <div class="tableItem">
                            Towar Handlowy
                        </div>
                    </div>

                </section>

                <section class="sumTable">
                    <div class="sumTableHeader">Wartość Netto</div>
                    <div class="sumTableHeader">VAT</div>
                    <div class="sumTableHeader">Wartość Brutto</div>
                    <div class="sumTableItem">5550 PLN</div>
                    <div class="sumTableItem">1276.5 PLN</div>
                    <div class="sumTableItem bold">6826.5 PLN</div>
                </section>

                <section class="paymentAndComments">
                    <div class="paymentAndCommentsItem">
                        <h2>Płatność</h2>
                        <div class="line"></div>
                        <p>Metoda Płatności: Przelew</p>
                        <p>Oplacono dnia: 2026-03-12</p>
                    </div>

                    <div class="paymentAndCommentsItem">
                        <h2>Uwagi</h2>
                        <div class="line"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin facilisis, sapien nec lacinia convallis, orci metus tincidunt leo, at vehicula lorem ligula ut nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. In fringilla aliquet nulla. Fusce id condimentum risus. In vestibulum quam lorem, nec ullamcorper magna blandit ac. Nulla facilisi. Sed eget sapien suscipit, tempor lacus non, sollicitudin nulla.</p>
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