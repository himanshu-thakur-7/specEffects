const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;
// ctx.fillStyle = "white";
// ctx.fillRect(10, 20, 150, 50);
const particleArray = [];
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(10, 20, 150, 50);
});

const mouse = {
  y: null,
  x: null,
};

// # creating circle on click

canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 20; i++) {
    particleArray.push(new particle());
    console.log("created");
  }

  //   drawCircle(mouse.x, mouse.y);
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) {
    particleArray.push(new particle());
    console.log("created");
  }
  // drawCircle(mouse.x,mouse.y);
});

// code for drawing circle
function drawCircle(x, y, size, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);

  ctx.fill();
}

class particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;

    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 5 - 2.5;
    this.speedY = Math.random() * 5 - 2.5;
    this.colour = "hsl(" + hue + ",100%,50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    drawCircle(this.x, this.y, this.size, this.colour);
  }
}

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particleArray.push(new particle());
//   }
// }
// init();

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();

    for (let j = i; j < particleArray.length; j++) {
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;

      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].colour;
        ctx.lineWidth = particleArray[i].size / 10;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0,0.02)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // drawCircle(mouse.x,mouse.y)
  handleParticles();
  hue += 2;
  requestAnimationFrame(animate);
}
animate();
