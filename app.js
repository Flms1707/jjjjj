const cube = document.getElementById('cube');
const gap = 62; // Tamanho do cubo (60) + 2px de espaçamento para as linhas ficarem nítidas

// 1. Gerar os 27 cubinhos
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            
            // Posiciona o cubinho na grade 3x3x3
            piece.style.transform = `translate3d(${x * gap}px, ${y * gap}px, ${z * gap}px)`;

            // Cria as 6 faces em branco translúcido para cada cubinho
            const facesClasses = ['front', 'back', 'right', 'left', 'top', 'bottom'];
            
            facesClasses.forEach(faceClass => {
                const face = document.createElement('div');
                face.classList.add('face', faceClass);
                piece.appendChild(face);
            });

            cube.appendChild(piece);
        }
    }
}

// 2. Lógica para rotacionar o cubo inteiro com o mouse
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let currentRotation = { x: -30, y: 45 }; 

document.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        currentRotation.y += deltaX * 0.5;
        currentRotation.x -= deltaY * 0.5;

        cube.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Suporte para Touch (Celular)
document.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        currentRotation.y += deltaX * 0.6;
        currentRotation.x -= deltaY * 0.6;

        cube.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
});

document.addEventListener('touchend', () => {
    isDragging = false;
});