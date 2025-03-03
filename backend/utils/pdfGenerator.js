// utils/pdfGenerator.js (PDF Rechnungs-Erstellung)
import PDFDocument from 'pdfkit';
import fs from 'fs';

const generateInvoice = (payment, user, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${payment._id}.pdf`);
    doc.pipe(res);
    doc.fontSize(20).text('Rechnung', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Benutzer: ${user.name}`);
    doc.text(`Buchungs-ID: ${payment.booking}`);
    doc.text(`Betrag: ${payment.amount} EUR`);
    doc.text(`Status: ${payment.status}`);
    doc.end();
};

export default generateInvoice;

