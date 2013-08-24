module.exports = (function(callback) {
  return global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame ||
  function(callback) {
    global.setTimeout(callback, 1000 / 60);
  };
})()
