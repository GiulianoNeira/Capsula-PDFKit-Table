import { generatePDF } from "../services/pdf.service.js";

export const generatePDFController = async (req, res) => {
    try {
        // Llama al servicio que genera el PDF sin pasar la ID
        const [pdfBuffer, error] = await generatePDF();

        if (error) {
            return res.status(500).json({ message: error });
        }

        // Si está bien, se envía el PDF generado
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="reporte.pdf"`);
        res.send(pdfBuffer); // pdfBuffer contiene el PDF generado como un Buffer
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
