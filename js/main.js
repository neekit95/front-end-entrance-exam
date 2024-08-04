document.addEventListener('DOMContentLoaded', () => {
	// Инициализация
	initializeLocalStorage();
	initializeRippleEffect();
});

// Функция для загрузки данных из localStorage
function loadFromLocalStorage() {
	const editableElements = document.querySelectorAll('.editable');
	editableElements.forEach(el => {
		const id = el.id;
		if (id) {
			const savedContent = localStorage.getItem(id);
			if (savedContent) {
				el.innerHTML = savedContent;
			}
		}
	});
}

// Функция для сохранения данных в localStorage
function saveToLocalStorage() {
	const editableElements = document.querySelectorAll('.editable');
	editableElements.forEach(el => {
		const id = el.id;
		if (id) {
			localStorage.setItem(id, el.innerHTML);
		}
	});
}

// Инициализация сохранения и загрузки данных
function initializeLocalStorage() {
	loadFromLocalStorage();
	document.querySelectorAll('.editable').forEach(el => {
		el.addEventListener('input', saveToLocalStorage);
	});
}

// Функция для добавления эффекта ripple
function addRippleEffect(event) {
	const target = event.currentTarget;
	const ripple = document.createElement('span');
	
	const rect = target.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);
	const x = event.clientX - rect.left - size / 2;
	const y = event.clientY - rect.top - size / 2;
	
	ripple.classList.add('ripple');
	ripple.style.width = ripple.style.height = `${size}px`;
	ripple.style.left = `${x}px`;
	ripple.style.top = `${y}px`;
	
	target.appendChild(ripple);
	
	// Удаляем элемент после завершения анимации
	ripple.addEventListener('animationend', () => ripple.remove());
}

// Инициализация эффекта ripple
function initializeRippleEffect() {
	document.querySelectorAll('.editable').forEach(element => {
		element.classList.add('ripple-container');
		element.addEventListener('click', addRippleEffect);
	});
}

// Обработчик для скачивания PDF
document.getElementById('downloadBtn').addEventListener('click', async () => {
	const content = document.getElementById('content');
	
	if (!content) {
		console.error('Element with ID "content" not found.');
		return;
	}
	
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
