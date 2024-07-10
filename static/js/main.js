document.getElementById('generator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    resetDots();
    startDotGeneration();
});

document.getElementById('checkbox').addEventListener('change', function() {
    if (this.checked) {
        startDotGeneration();
    } else {
        stopDotGeneration();
    }
});

let intervalId;
let dots = [];
const rectWidth = 800;
const rectHeight = 600;
const ellipseWidth = rectWidth / 5;
const ellipseHeight = rectHeight / 5;
let ellipseCenterX = rectWidth / 2;
let ellipseCenterY = rectHeight / 2;

function resetDots() {
    dots = [];
    if (intervalId) {
        clearInterval(intervalId);
    }
}

function startDotGeneration() {
    const numberInput = document.getElementById('number').value;
    if (!numberInput) return;

    // Initialize dots
    for (let i = 0; i < numberInput; i++) {
        let dot = generateDot(ellipseCenterX, ellipseCenterY);
        dots.push(dot);
    }

    intervalId = setInterval(() => {
        updateEllipseCenter();
        updateDots();
        drawDots(dots);
    }, 1000);
}

function stopDotGeneration() {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

function generateDot(centerX, centerY) {
    let x, y;
    do {
        x = Math.random() * ellipseWidth + centerX - ellipseWidth / 2;
        y = Math.random() * ellipseHeight + centerY - ellipseHeight / 2;
    } while (!isWithinEllipse(x, y, centerX, centerY));
    return { x, y };
}

function isWithinEllipse(x, y, centerX, centerY) {
    const dx = x - centerX;
    const dy = y - centerY;
    return (dx * dx) / ((ellipseWidth / 2) * (ellipseWidth / 2)) + (dy * dy) / ((ellipseHeight / 2) * (ellipseHeight / 2)) <= 1;
}

function updateEllipseCenter() {
    const maxDistance = rectWidth * 0.05; // 5% of the max x-axis length
    const deltaX = (Math.random() - 0.5) * 2 * maxDistance;
    const deltaY = (Math.random() - 0.5) * 2 * maxDistance;

    ellipseCenterX = Math.max(ellipseWidth / 2, Math.min(ellipseCenterX + deltaX, rectWidth - ellipseWidth / 2));
    ellipseCenterY = Math.max(ellipseHeight / 2, Math.min(ellipseCenterY + deltaY, rectHeight - ellipseHeight / 2));
}

function updateDots() {
    const maxDistance = rectWidth * 0.05; // 1% of the max x-axis length

    dots = dots.map(dot => {
        let newX, newY;
        do {
            const deltaX = (Math.random() - 0.5) * 2 * maxDistance;
            const deltaY = (Math.random() - 0.5) * 2 * maxDistance;
            newX = dot.x + deltaX;
            newY = dot.y + deltaY;
        } while (!isWithinEllipse(newX, newY, ellipseCenterX, ellipseCenterY));
        return { x: newX, y: newY };
    });
}

function drawDots(dots) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ellipse (invisible, but for debugging purposes, you can uncomment the drawing part)
    // ctx.beginPath();
    // ctx.ellipse(ellipseCenterX, ellipseCenterY, ellipseWidth / 2, ellipseHeight / 2, 0, 0, Math.PI * 2);
    // ctx.strokeStyle = 'red';
    // ctx.stroke();
    // ctx.closePath();

    // Draw the dots
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2, true);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.closePath();
    });
}
