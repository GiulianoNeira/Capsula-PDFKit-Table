import PDFDocument from 'pdfkit-table';
import { getUsersService } from './user.service.js';

export async function generatePDF() {
    try {
        const doc = new PDFDocument({ margin: 30, size: 'A4' });
        let usersData, error;
        [usersData, error] = await getUsersService();

        if (error) {
            return [null, error];
        }

        const pdfBuffer = await new Promise((resolve, reject) => {
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', reject);

            const table = {
                title: { label: 'Informe de Usuarios', color: 'blue' },
                headers: ['id', 'Nombre', 'Email', 'Rut', 'Rol'],
                rows: usersData.map(user => [user.id, user.nombreCompleto, user.email, user.rut, user.rol]),
            };

            doc.table(table, { startY: 50 });
            doc.end();
        });

        return [pdfBuffer, null];
    } catch (error) {
        return [null, error.message || 'Error al generar el PDF'];
    }
}
