
/**
 * Module dependencies.
 */

var autoscale = require('autoscale-canvas');
var raf = require('raf');

/**
 * Expose `Spinner`.
 */

module.exports = Spinner;

/**
 * Initialize a new `Spinner`.
 */

function Spinner() {
  var self = this;
  this.percent = 0;
  this.el = document.createElement('canvas');
  this.ctx = this.el.getContext('2d');
  this.size(50);
  this.fontSize(11);
  this.speed(60);
  this.font('helvetica, arial, sans-serif');
  this.stopped = false;

  (function animate() {
    if (self.stopped) return;
    raf(animate);
    self.percent = (self.percent + self._speed / 36) % 100;
    self.draw(self.ctx);
  })();
}

/**
 * Stop the animation.
 *
 * @api public
 */

Spinner.prototype.stop = function(){
  this.stopped = true;
};

/**
 * Set spinner size to `n`.
 *
 * @param {Number} n
 * @return {Spinner}
 * @api public
 */

Spinner.prototype.size = function(n){
  this.el.width = n;
  this.el.height = n;
  autoscale(this.el);
  return this;
};

/**
 * Set text to `str`.
 *
 * @param {String} str
 * @return {Spinner}
 * @api public
 */

Spinner.prototype.text = function(str){
  this._text = str;
  return this;
};

/**
 * Set font size to `n`.
 *
 * @param {Number} n
 * @return {Spinner}
 * @api public
 */

Spinner.prototype.fontSize = function(n){
  this._fontSize = n;
  return this;
};

/**
 * Set font `family`.
 *
 * @param {String} family
 * @return {Spinner}
 * @api public
 */

Spinner.prototype.font = function(family){
  this._font = family;
  return this;
};

/**
 * Set speed to `n` rpm.
 *
 * @param {Number} n
 * @return {Spinner}
 * @api public
 */

Spinner.prototype.speed = function(n) {
  this._speed = n;
  return this;
};

/**
 * Make the spinner light colored.
 *
 * @return {Spinner}
 * @api public
 */

Spinner.prototype.light = function(){
  this._light = true;
  return this;
};

/**
 * Draw on `ctx`.
 *
 * @param {CanvasRenderingContext2d} ctx
 * @return {Spinner}
 * @api private
 */

Spinner.prototype.draw = function(ctx){
  var percent = Math.min(this.percent, 100)
    , ratio = window.devicePixelRatio || 1
    , size = this.el.width / ratio
    , half = size / 2
    , x = half
    , y = half
    , rad = half - 1
    , fontSize = this._fontSize
    , light = this._light;

  ctx.font = fontSize + 'px ' + this._font;

  var angle = Math.PI * 2 * (percent / 100);
  ctx.clearRect(0, 0, size, size);

  // outer circle
  var grad = ctx.createLinearGradient(
    half + Math.sin(Math.PI * 1.5 - angle) * half,
    half + Math.cos(Math.PI * 1.5 - angle) * half,
    half + Math.sin(Math.PI * 0.5 - angle) * half,
    half + Math.cos(Math.PI * 0.5 - angle) * half
  );

  // color
  if (light) {
    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 1)');
  } else {
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
  }

  ctx.strokeStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, rad, angle - Math.PI, angle, false);
  ctx.stroke();

  // inner circle
  ctx.strokeStyle = light ? 'rgba(255, 255, 255, .4)' : '#eee';
  ctx.beginPath();
  ctx.arc(x, y, rad - 1, 0, Math.PI * 2, true);
  ctx.stroke();

  // text
  var text = this._text || ''
    , w = ctx.measureText(text).width;

  if (light) ctx.fillStyle = 'rgba(255, 255, 255, .9)';
  ctx.fillText(
      text
    , x - w / 2 + 1
    , y + fontSize / 2 - 1);

  return this;
};

