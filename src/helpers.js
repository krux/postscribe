// Is this a function?
function isFunction(x) {
  return typeof x === 'function';
}

// Loop over each item in an array-like value.
function each(arr, fn, _this) {
  var i, len = (arr && arr.length) || 0;
  for(i = 0; i < len; i++) {
    fn.call(_this, arr[i], i);
  }
}

// Loop over each key/value pair in a hash.
function eachKey(obj, fn, _this) {
  var key;
  for(key in obj) {
    if(obj.hasOwnProperty(key)) {
      fn.call(_this, key, obj[key]);
    }
  }
}

function existy(thing) {
  return thing !== void 0 && thing !== null;
}

// Set default options where some option was not specified.
function defaults(options, _defaults) {
  options = options || {};
  eachKey(_defaults, function(key, val) {
    if(!existy(options[key])) {
      options[key] = val;
    }
  });
  return options;
}

// Convert value (e.g., a NodeList) to an array.
function toArray(obj) {
  try {
    return Array.prototype.slice.call(obj);
  } catch(e) {
    var ret = [];
    each(obj, function(val) {
      ret.push(val);
    });
    return ret;
  }
}

function last(array) {
  return array[array.length - 1];
}

// Test if token is a script tag.
function isScript(tok) {
  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('script');
}

function isStyle(tok) {
  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('style');
}

module.exports = {
  isFunction: isFunction,
  each: each,
  eachKey: eachKey,
  existy: existy,
  defaults: defaults,
  toArray: toArray,
  last: last,
  isScript: isScript,
  isStyle: isStyle
};
