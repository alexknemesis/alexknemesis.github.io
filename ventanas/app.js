// Array para almacenar las ventanas calculadas
let ventanas = [];
let windowCounter = 0;

// Inicializar el formulario
document.getElementById('windowForm').addEventListener('submit', function(e) {
    e.preventDefault();
    agregarVentana();
});

// Función para agregar una ventana
function agregarVentana() {
    const ancho = parseFloat(document.getElementById('ancho').value);
    const alto = parseFloat(document.getElementById('alto').value);
    const hojas = parseInt(document.getElementById('hojas').value);

    if (isNaN(ancho) || isNaN(alto) || ancho <= 0 || alto <= 0) {
        alert('Por favor, ingrese valores válidos para el ancho y alto.');
        return;
    }

    // Calcular las piezas
    const calculos = calcularPiezas(ancho, alto, hojas);
    
    // Agregar al array
    windowCounter++;
    ventanas.push({
        id: windowCounter,
        ancho: ancho,
        alto: alto,
        hojas: hojas,
        ...calculos
    });

    // Actualizar la tabla
    actualizarTabla();

    // Limpiar el formulario
    document.getElementById('windowForm').reset();

    // Mostrar la sección de resultados
    document.getElementById('resultsSection').classList.remove('hidden');
}

// Función para calcular las piezas según las fórmulas
function calcularPiezas(ancho, alto, hojas) {
    // Jaba (J) = alto de la ventana
    const jaba = alto;

    // Pierna + Enganche (P+E) = alto de la ventana - 3.2
    const piernaEnganche = alto - 3.2;

    // Riel superior + Riel inferior (RS+RI) = ancho de la ventana - 1.6
    const rielSuperiorInferior = ancho - 1.6;

    // Zócalo + Cabezal (Z+C) depende del número de hojas
    let zocaloCabezal;
    switch(hojas) {
        case 2:
            zocaloCabezal = (rielSuperiorInferior + 2.4) / 2;
            break;
        case 3:
            zocaloCabezal = (rielSuperiorInferior + 5.7) / 3;
            break;
        case 4:
            zocaloCabezal = (rielSuperiorInferior + 5) / 4;
            break;
        default:
            zocaloCabezal = 0;
    }

    return {
        jaba: redondear(jaba),
        piernaEnganche: redondear(piernaEnganche),
        rielSuperiorInferior: redondear(rielSuperiorInferior),
        zocaloCabezal: redondear(zocaloCabezal)
    };
}

// Función para redondear a 2 decimales
function redondear(valor) {
    return Math.round(valor * 100) / 100;
}

// Función para actualizar la tabla de resultados
function actualizarTabla() {
    const tbody = document.getElementById('resultsTable');
    tbody.innerHTML = '';

    ventanas.forEach((ventana, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-3 font-semibold">${ventana.id}</td>
            <td class="border border-gray-300 px-4 py-3">${ventana.ancho.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-3">${ventana.alto.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-3 text-center">${ventana.hojas}</td>
            <td class="border border-gray-300 px-4 py-3 font-medium">${ventana.jaba.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-3 font-medium">${ventana.piernaEnganche.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-3 font-medium">${ventana.rielSuperiorInferior.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-3 font-medium">${ventana.zocaloCabezal.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-3 text-center">
                <button onclick="eliminarVentana(${ventana.id})" 
                        class="px-2 py-1 hover:opacity-70 transition duration-200 cursor-pointer">
                    ❌
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para eliminar una ventana
function eliminarVentana(id) {
    ventanas = ventanas.filter(v => v.id !== id);
    actualizarTabla();
    
    if (ventanas.length === 0) {
        document.getElementById('resultsSection').classList.add('hidden');
    }
}

// Función para limpiar todos los resultados
function clearResults() {
    if (confirm('¿Está seguro de que desea eliminar todos los resultados?')) {
        ventanas = [];
        windowCounter = 0;
        actualizarTabla();
        document.getElementById('resultsSection').classList.add('hidden');
    }
}

// Función para exportar a imagen
async function exportToImage() {
    const tableContainer = document.getElementById('tableContainer');
    
    try {
        const canvas = await html2canvas(tableContainer, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false
        });
        
        // Convertir canvas a blob y descargar
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const fecha = new Date().toISOString().split('T')[0];
            link.download = `cortes-ventanas-${fecha}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error('Error al generar la imagen:', error);
        alert('Error al generar la imagen. Por favor, intente nuevamente.');
    }
}

// Función para exportar a PDF
async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    
    try {
        // Crear un nuevo documento PDF
        const doc = new jsPDF('p', 'mm', 'letter'); // portrait, mm, letter
        
        // Título
        doc.setFontSize(18);
        doc.setTextColor(79, 70, 229); // Indigo
        doc.text('Calculadora de Cortes de Ventanas', 14, 20);
            
        // Fecha
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const fecha = new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        doc.text(`Fecha: ${fecha}`, 14, 28);
        
        // Preparar datos para la tabla
        const headers = [['#', 'Ancho (cm)', 'Alto (cm)', 'Hojas', 'Jaba (J) (cm)', 'P+E (cm)', 'RS+RI (cm)', 'Z+C (cm)']];
        const data = ventanas.map(v => [
            v.id,
            v.ancho.toFixed(2),
            v.alto.toFixed(2),
            v.hojas,
            v.jaba.toFixed(2),
            v.piernaEnganche.toFixed(2),
            v.rielSuperiorInferior.toFixed(2),
            v.zocaloCabezal.toFixed(2)
        ]);
        
        // Agregar tabla usando autoTable si está disponible
        if (typeof doc.autoTable === 'function') {
            doc.autoTable({
                head: headers,
                body: data,
                startY: 35,
                theme: 'grid',
                headStyles: {
                    fillColor: [79, 70, 229],
                    textColor: 255,
                    fontStyle: 'bold'
                },
                styles: {
                    fontSize: 10,
                    cellPadding: 3
                },
                alternateRowStyles: {
                    fillColor: [249, 250, 251]
                }
            });
        } else {
            // Fallback: crear tabla manualmente
            let y = 35;
            doc.setFontSize(10);
            
            // Headers
            doc.setFillColor(79, 70, 229);
            doc.rect(14, y, 267, 8, 'F');
            doc.setTextColor(255, 255, 255);
            let x = 16;
            headers[0].forEach((header, i) => {
                doc.text(header, x, y + 5);
                x += 33;
            });
            
            // Data rows
            y += 8;
            doc.setTextColor(0, 0, 0);
            data.forEach((row, rowIndex) => {
                if (rowIndex % 2 === 0) {
                    doc.setFillColor(249, 250, 251);
                    doc.rect(14, y, 267, 8, 'F');
                }
                x = 16;
                row.forEach((cell, cellIndex) => {
                    doc.text(String(cell), x, y + 5);
                    x += 33;
                });
                y += 8;
            });
        }
        
        // Guardar PDF
        const fechaArchivo = new Date().toISOString().split('T')[0];
        doc.save(`cortes-ventanas-${fechaArchivo}.pdf`);
        
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        alert('Error al generar el PDF. Por favor, intente nuevamente.');
    }
}

// Agregar soporte para autoTable de jsPDF
(function loadAutoTable() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js';
    script.async = true;
    document.head.appendChild(script);
})();
