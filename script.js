const subject = document.getElementById('subject');
const target = document.getElementById('target');
let selectedSubject = null;

// Add event listeners for click-and-drop
subject.addEventListener('click', () => {
    selectedSubject = subject.cloneNode(true);
    selectedSubject.removeAttribute('id');
    selectedSubject.classList.remove('subject');
    selectedSubject.classList.add('selected');
    target.appendChild(selectedSubject);
});

target.addEventListener('click', () => {
    if (selectedSubject) {
        target.removeChild(selectedSubject);
        selectedSubject = null;
    }
});
