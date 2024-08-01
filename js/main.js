document.addEventListener('DOMContentLoaded', () => {
	const downloadBtn = document.getElementById('download-btn');
	const editableElements = document.querySelectorAll('.editable');
	
	// Load saved data from LocalStorage
	editableElements.forEach((element, index) => {
		const savedData = localStorage.getItem(`editable-${index}`);
		if (savedData) {
			element.textContent = savedData;
		}
		
		// Save data to LocalStorage on input
		element.addEventListener('input', () => {
			localStorage.setItem(`editable-${index}`, element.textContent);
		});
	});
	
	downloadBtn.addEventListener('click', () => {
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF();
		const resume = document.querySelector('.resume-container');
		
		doc.html(resume, {
			callback: function (doc) {
				doc.save('resume.pdf');
			},
			x: 10,
			y: 10,
			width: 180 // target width in the PDF document
		});
	});
});

// Material Wave effect
document.querySelectorAll('.material-wave').forEach(item => {
	item.addEventListener('click', function (e) {
		const circle = document.createElement('div');
		this.appendChild(circle);
		const d = Math.max(this.clientWidth, this.clientHeight);
		circle.style.width = circle.style.height = `${d}px`;
		const rect = this.getBoundingClientRect();
		circle.style.left = `${e.clientX - rect.left - d / 2}px`;
		circle.style.top = `${e.clientY - rect.top - d / 2}px`;
		circle.classList.add('ripple');
		setTimeout(() => circle.remove(), 600);
	});
});