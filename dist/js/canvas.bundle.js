/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: undefined,
  y: undefined
};
var colors = ['#1B3240', '#0F808C', '#38A67E', '#6AD97B', '#BCF26B'];
var distanceFromCenter = 300; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

var Text =
/*#__PURE__*/
function () {
  function Text(x, y, text, font, color) {
    var align = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'left';

    _classCallCheck(this, Text);

    this.x = x;
    this.y = y;
    this.color = color;
    this.text = text;
    this.font = font;
    this.align = align;
    this.opacity = 0;
    this.increaseOpacity = 0.05;
  }

  _createClass(Text, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.font = this.font;
      c.lineWidth = 1;
      c.save();
      c.globalAlpha = this.opacity;
      c.fillStyle = "black";
      c.fillText(this.text, this.x, this.y);
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.strokeText(this.text, this.x, this.y);
      c.textAlign = this.align;
      c.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      var mouseDistanceFromCenter = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(mouse.x, mouse.y, canvas.width / 2, canvas.height / 2);

      if (mouseDistanceFromCenter < distanceFromCenter && this.opacity < 1) {
        this.opacity += 0.05;
      } else if (this.opacity > 0) {
        this.opacity -= 0.05;
        this.opacity = Math.max(0, this.opacity);
      }

      this.draw();
    }
  }]);

  return Text;
}(); // Objects


var Particle =
/*#__PURE__*/
function () {
  function Particle(x, y, radius, color) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = this.color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.01;
    this.distanceFromCenter = distanceFromCenter;
    this.inc = 0.5;
    this.initialPos = {
      x: x,
      y: y
    };
    this.lastMousePos = {
      x: x,
      y: y
    };
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw(lastPoint) {
      c.beginPath();
      c.strokeStyle = this.color;
      c.lineWidth = this.radius;
      c.moveTo(lastPoint.x, lastPoint.y);
      c.lineTo(this.x, this.y);
      c.stroke();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      var lastPoint = {
        x: this.x,
        y: this.y
      }; // Move points over time

      this.radians += this.velocity;

      if (this.distanceFromCenter > distanceFromCenter + 10 || this.distanceFromCenter < distanceFromCenter - 10) {
        this.inc = -this.inc;
      }

      var range = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(mouse.x, mouse.y, canvas.width / 2, canvas.height / 2) < 300 ? this.inc : 0;
      this.distanceFromCenter += range; // circular motion

      this.x = this.initialPos.x + _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-5, 5) + Math.cos(this.radians) * this.distanceFromCenter;
      this.y = this.initialPos.y + _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-5, 5) + Math.sin(this.radians) * this.distanceFromCenter;
      this.draw(lastPoint);
    }
  }]);

  return Particle;
}();

var Circle =
/*#__PURE__*/
function () {
  function Circle(x, y, dx, dy, radius, color) {
    _classCallCheck(this, Circle);

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

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      var angle = Math.atan2(canvas.height / 2 - this.y, canvas.width / 2 - this.x) * 180 / Math.PI;

      if (_utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(mouse.x, mouse.y, canvas.width / 2, canvas.height / 2) + this.radius <= 300) {
        this.x += Math.abs(this.velocity.x) * Math.cos(angle);
        this.y += Math.abs(this.velocity.y) * Math.sin(angle);
      } else {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }

      var particleDisFromCenter = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(this.x, this.y, canvas.width / 2, canvas.height / 2) + this.radius;

      if (particleDisFromCenter < distanceFromCenter) {
        _utils__WEBPACK_IMPORTED_MODULE_0___default.a.resolveCollision(this);
      }

      if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
        this.velocity.x = -this.velocity.x;
      }

      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
        this.velocity.y = -this.velocity.y;
      }

      this.draw();
    }
  }]);

  return Circle;
}(); // Implementation


var mainText;
var circles;
var particles;

function init() {
  particles = [];
  circles = [];
  mainText = new Text(canvas.width / 2, canvas.height / 2 + 60, "Meedcodes", "120px Pacifico", 'black', 'center');

  for (var i = 0; i < 200; i++) {
    var x = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.width);
    var y = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.height);

    if (_utils__WEBPACK_IMPORTED_MODULE_0___default.a.distance(x, y, canvas.width / 2, canvas.height / 2) < 300) {
      x = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.width / 2) - distanceFromCenter;
      y = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.height / 2) - distanceFromCenter;
      i--;
    }

    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    var radius = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(3, 5);
    circles.push(new Circle(x, y, dx, dy, radius, _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomColor(colors)));
  }

  for (var _i = 0; _i < 100; _i++) {
    var _radius = Math.random() * 2 + 1;

    particles.push(new Particle(canvas.width / 2, canvas.height / 2, _radius, _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomColor(colors)));
  }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  mainText.update();
  circles.forEach(function (circle) {
    circle.update();
  });
  particles.forEach(function (particle) {
    particle.update();
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */


function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
}
/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */


function resolveCollision(particle) {
  var canvas = document.querySelector('canvas');
  var xVelocityDiff = particle.velocity.x - 0;
  var yVelocityDiff = particle.velocity.y - 0;
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var xDist = centerX - particle.x;
  var yDist = centerY - particle.y; // Prevent accidental overlap of particles

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    var angle = -Math.atan2(centerY - particle.y, centerX - particle.x); // Store mass in var for better readability in collision equation

    var m1 = particle.mass;
    var m2 = 100; // Velocity before equation

    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate({
      x: 0,
      y: 0
    }, angle); // Velocity after 1d collision equation

    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    }; // Final velocity after rotating axis back to original location

    var vFinal1 = rotate(v1, -angle); // Swap particle velocities for realistic bounce effect

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
  }
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance,
  rotate: rotate,
  resolveCollision: resolveCollision
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map