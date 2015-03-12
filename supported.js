
/**
 * Export `bool`
 */

module.exports = (function(){
  var el = document.createElement('canvas');
  return !! el.getContext;
})();
