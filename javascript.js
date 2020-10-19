/*
* File Name / no name
* Created Date / Oct 16, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

/*
  Common Tool.
*/

class Tool {
  // random number.
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // random color rgb.
  static randomColorRGB() {
    return (
      "rgb(" +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ")"
    );
  }
  // random color hsl.
  static randomColorHSL(saturation, lightness) {
    return (
      "hsl(" +
      this.randomNumber(0, 360) +
      ", " +
      saturation +
      "%, " +
      lightness +
      "%)"
    );
  }
  // gradient color.
  static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
    const col = cr + "," + cg + "," + cb;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(" + col + ", " + (ca * 1) + ")");
    g.addColorStop(0.5, "rgba(" + col + ", " + (ca * 0.5) + ")");
    g.addColorStop(1, "rgba(" + col + ", " + (ca * 0) + ")");
    return g;
  }
}

/*
  When want to use angle.
*/

class Angle {
  constructor(angle) {
    this.a = angle;
    this.rad = this.a * Math.PI / 180;
  }

  incDec(num) {
    this.a += num;
    this.rad = this.a * Math.PI / 180;
    return this.rad;
  }
}

/*
  When want to use controller.
*/

class Controller {
  constructor(id) {
    this.id = document.getElementById(id);
  }
  getVal() {
    return this.id.value;
  }
}

/*
  When want to use time.
*/

class Time {
  constructor(time) {
    this.startTime = time;
    this.lastTime;
    this.elapsedTime;
  }

  getElapsedTime() {
    this.lastTime = Date.now();
    this.elapsedTime = (this.startTime - this.lastTime) * -1;
    return this.elapsedTime;
  }
}

/*
  When want to use vector.
*/

class Vector2d {
  constructor(x, y) {
    this.vx = x;
    this.vy = y;
  }

  scale(scale) {
    this.vx *= scale;
    this.vy *= scale;
  }

  add(vec2) {
    this.vx += vec2.vx;
    this.vy += vec2.vy
  }

  sub(vec2) {
    this.vx -= vec2.vx;
    this.vy -= vec2.vy;
  }

  negate() {
    this.vx = -this.vx;
    this.vy = -this.vy;
  }

  length() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  lengthSquared() {
    return this.vx * this.vx + this.vy * this.vy;
  }

  normalize() {
    let len = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (len) {
      this.vx /= len;
      this.vy /= len;
    }
    return len;
  }

  rotate(angle) {
    let vx = this.vx;
    let vy = this.vy;
    let cosVal = Math.cos(angle);
    let sinVal = Math.sin(angle);
    this.vx = vx * cosVal - vy * sinVal;
    this.vy = vx * sinVal + vy * cosVal;
  }

  toString() {
    return '(' + this.vx.toFixed(3) + ',' + this.vy.toFixed(3) + ')';
  }
}

let canvas;

class Canvas {
  constructor(bool) {
    // create canvas.
    this.canvas = document.createElement("canvas");
    // if on screen.
    if (bool === true) {
      this.canvas.style.display = 'block';
      this.canvas.style.top = 0;
      this.canvas.style.left = 0;
      document.getElementsByTagName("body")[0].appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    // mouse infomation.
    this.mouseX = null;
    this.mouseY = null;
    this.mouseZ = null;
    // line
    this.shapeNum = 101;
    this.shapes = [];
  }
  
  // init, render, resize
  init() {
    for (let i = 1; i < this.shapeNum; i++) {
      const s = new Shape(this.ctx, this.width / 2, this.height / 2, i);
      this.shapes.push(s);
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].render();
    }
  }
  
  resize() {
    this.shapes = [];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.init();
  }
}

/*
  Shape class.
*/

class Shape {
  constructor(ctx, x, y, i) {
    this.ctx = ctx;
    this.init(x, y, i);
  }

  init(x, y, i) {
    this.num = 36;
    this.a = new Angle(i);
    this.rad = Math.PI * 2 / this.num;
    this.x = x;
    this.y = y;
    this.r = 3 * i;
    this.lw = 1;
    this.i = i;
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineWidth = this.lw;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'hsl(' + Math.sin(this.a.rad / 5) * 360 + ', 80%, 60%)';
    //ctx.strokeStyle = 'white';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a.rad / 2);
    ctx.scale(Math.sin(this.a.rad / 8), Math.cos(this.a.rad / 4));
    ctx.translate(-this.x, -this.y);
    for (let i = 0; i < this.num; i++) {
      let x = Math.cos(this.rad * i) * this.r + this.x;
      let y = Math.sin(this.rad * i) * this.r + this.y;
      let nx = Math.cos(this.rad * (i + 1)) * this.r + this.x;
      let ny = Math.sin(this.rad * (i + 1)) * this.r + this.y;
      if (i % 2 === 0) {
        if (Math.sin(this.a.rad / 4) > 0) {
          ctx.translate(nx, ny);
          ctx.rotate(-this.a.rad);
          ctx.translate(-nx, -ny);
        }
      } else {
        if (Math.sin(this.a.rad / 4) > 0) {
          ctx.translate(nx, ny);
          ctx.rotate(this.a.rad);
          ctx.translate(-nx, -ny);
        }
      }
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
    }
    ctx.restore();
  }

  render() {
    this.draw();
    this.a.incDec(3);
  }
}

(function () {
  "use strict";
  window.addEventListener("load", function () {
    canvas = new Canvas(true);
    canvas.init();
    
    function render() {
      window.requestAnimationFrame(function () {
        canvas.render();
        render();
      });
    }
    
    render();

    // event
    window.addEventListener("resize", function () {
      canvas.resize();
    }, false);

  });
})();
