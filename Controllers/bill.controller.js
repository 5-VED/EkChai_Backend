const { v4: uuidv4 } = require('uuid');
const { toPdf } = require('../Config/pdfConverter');
const Bill = require('../Models/bill.model');


exports.generatePdf = async (req, res) => {
    try {
        const uuid = uuidv4();
        const result = await new Bill({
            name: req.body.name,
            uuid,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            paymentMethod: req.body.paymentMethod,
            total: req.body.total,
            productDetails: req.body.productDetails,
        });

        await result.save()

        const pdfBuffer = await toPdf(result);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${uuid}.pdf"`);
        
       return res.send(pdfBuffer)

    } catch (error) {
        console.log(error)
    }
}