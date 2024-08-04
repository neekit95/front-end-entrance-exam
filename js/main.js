document.getElementById('downloadBtn').addEventListener('click', async function () {
	const content = document.getElementById('content');
	
	// Проверка, что элемент существует
	if (!content) {
		console.error('Element with ID "content" not found.');
		return;
	}
	
	// Загружаем модули из jsPDF
	const { jsPDF } = window.jspdf;
	
	try {
		const canvas = await html2canvas(content);
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF('p', 'mm', 'a4');
		const imgWidth = 210;
		const pageHeight = 295;
		const imgHeight = canvas.height * imgWidth / canvas.width;
		let heightLeft = imgHeight;
		let position = 0;
		
		pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
		heightLeft -= pageHeight;
		
		while (heightLeft >= 0) {
			position = heightLeft - imgHeight;
			pdf.addPage();
			pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;
		}
		pdf.save('page.pdf');
	} catch (error) {
		console.error('Error generating PDF:', error);
	}
});