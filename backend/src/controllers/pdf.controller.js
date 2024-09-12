import { generatePDF } from "../services/pdf.service.js";

export const generatePDFController = async (req, res) => {
    try {
        const [pdfBuffer, error] = await generatePDF();

        if (error) {
            return res.status(500).json({ message: error });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="reporte.pdf"`);
        res.send(pdfBuffer); 
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
