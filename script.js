const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

class Segment {
    constructor(x, y, length, angle) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.angle = angle;
        this.calculateEnd();
    }

    calculateEnd() {
        this.endX = this.x + this.length * Math.cos(this.angle);
        this.endY = this.y + this.length * Math.sin(this.angle);
    }

    follow(targetX, targetY) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        this.angle = Math.atan2(dy, dx);
        this.x = targetX - this.length * Math.cos(this.angle);
        this.y = targetY - this.length * Math.sin(this.angle);
        this.calculateEnd();
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
    }
}

const segments = [];
const segmentCount = 5;
const segmentLength = 50;

for (let i = 0; i < segmentCount; i++) {
    segments.push(new Segment(canvas.width / 2, canvas.height / 2, segmentLength, 0));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mouseX = canvas.width / 2;
    const mouseY = canvas.height / 2;

    segments[0].follow(mouseX, mouseY);

    for (let i = 1; i < segments.length; i++) {
        segments[i].follow(segments[i - 1].x, segments[i - 1].y);
    }

    for (let segment of segments) {
        segment.draw();
    }

    requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    segments[0].follow(mouseX, mouseY);
});

animate();
