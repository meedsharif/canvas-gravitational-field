import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: undefined,
  y: undefined
}

const colors = ['#1B3240', '#0F808C', '#38A67E', '#6AD97B', '#BCF26B'];

let distanceFromCenter = 300;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

class Text {
  constructor(x,y,text, font, color, align = 'left') {
  this.x = x;
  this.y = y;
  this.color = color;
  this.text = text;
  this.font = font;
  this.align = align;
  this.opacity = 0;
  this.increaseOpacity = 0.05;
  }

  draw() {
    c.beginPath();
    c.font = this.font;
    c.lineWidth = 1;
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = `black`;
    c.fillText(this.text, this.x, this.y);
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.strokeText(this.text, this.x, this.y);
    c.textAlign = this.align;
  c.closePath();
  }

  update() {
    let mouseDistanceFromCenter = utils.distance(mouse.x, mouse.y, canvas.width/2, canvas.height/2);
    if(mouseDistanceFromCenter < distanceFromCenter  && this.opacity < 1) {
      this.opacity += 0.05;
    } else if(this.opacity > 0) {
      this.opacity -= 0.05;
      this.opacity = Math.max(0, this.opacity);
    }

    this.draw();
  }
}

// Objects

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = this.color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.01;
    this.distanceFromCenter = distanceFromCenter;
    this.inc = 0.5;
    this.initialPos = {
      x,
      y
    };
    this.lastMousePos = {
      x,
      y
    }
  }
  
  draw(lastPoint) {
    c.beginPath()
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath()
  }
  
  update() {
    const lastPoint = {
      x: this.x,
      y: this.y
    }
    // Move points over time
    this.radians += this.velocity;
    
    if(this.distanceFromCenter > distanceFromCenter + 10 || this.distanceFromCenter < distanceFromCenter - 10){
      this.inc = -this.inc;
    }
    
    
    let range = utils.distance(mouse.x, mouse.y, canvas.width/2, canvas.height/2) < 300 ? this.inc : 0;
    
    this.distanceFromCenter += range;
    // circular motion
    this.x = (this.initialPos.x + utils.randomIntFromRange(-5, 5)) + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = (this.initialPos.y + utils.randomIntFromRange(-5, 5)) + Math.sin(this.radians) * this.distanceFromCenter;

    this.draw(lastPoint)
  }
}

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: dx,
      y: dy
    };
    this.mass = 1;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {


    let angle = Math.atan2(canvas.height/2 - this.y, canvas.width/2 - this.x) * 180 / Math.PI;

    if(utils.distance(mouse.x, mouse.y, canvas.width/2, canvas.height/2) + this.radius <= 300) {

      this.x += Math.abs(this.velocity.x) * Math.cos(angle);
      this.y += Math.abs(this.velocity.y) * Math.sin(angle);
    }else {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }

    let particleDisFromCenter = utils.distance(this.x, this.y, canvas.width/2, canvas.height/2) + this.radius;

    if(particleDisFromCenter < distanceFromCenter) {
      utils.resolveCollision(this);
    }

    if(this.x - this.radius < 0 || this.x + this.radius > canvas.width){
      this.velocity.x = -this.velocity.x;
    }

    if(this.y - this.radius < 0 || this.y + this.radius > canvas.height){
      this.velocity.y = -this.velocity.y;
    }


    this.draw();
  }
}

// Implementation
let mainText;
let circles;
let particles;
function init() {
  particles = [];
  circles = [];

  mainText = new Text(canvas.width/2, canvas.height/2 + 60, "Meedcodes", "120px Pacifico", 'black', 'center');

  for(let i = 0; i < 200; i++) {
    let x = utils.randomIntFromRange(0, canvas.width);
    let y = utils.randomIntFromRange(0, canvas.height);

    if(utils.distance(x, y, canvas.width/2, canvas.height/2) < 300) {
      x = utils.randomIntFromRange(0, canvas.width/2) - distanceFromCenter;
      y = utils.randomIntFromRange(0, canvas.height/2) - distanceFromCenter;
      i--;
    }

    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    let radius = utils.randomIntFromRange(3, 5);
    circles.push(new Circle(x, y, dx, dy, radius, utils.randomColor(colors)));
  }

  for (let i = 0; i < 100; i++) {
    let radius = (Math.random() * 2) + 1;
    particles.push(new Particle(canvas.width/2, canvas.height/2, radius, utils.randomColor(colors)))
  }

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height);


  mainText.update();

  circles.forEach(circle => {
    circle.update();
  })

  particles.forEach(particle => {
   particle.update();
  })
}

init()
animate()
