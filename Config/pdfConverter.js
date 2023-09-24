const puppeteer = require('puppeteer');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');



exports.toPdf = async (data) => {
    try {

        let productDetailsOrder = data.productDetails

        const html = await ejs.renderFile(path.join(__dirname, '..', 'Utils', 'Templates', 'report.ejs'), {
            productDetails: productDetailsOrder,
            name: data.name,
            email: data.email,
            contactNumber: data.contactNumber,
            paymentMethod: data.paymentMethod,
            total: data.total
        })
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html);

        const pdfBuffer = await page.pdf({
            path: `${uuidv4()}.pdf`,
            format: 'A4',
            printBackground: true,
        });


        await browser.close();
        return pdfBuffer
    } catch (error) {
        console.log(error)
    }
}


