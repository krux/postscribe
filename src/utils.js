const UNDEFINED = void 0;

export function existy(thing) {
  return thing !== UNDEFINED && thing !== null;
}
// Is this a function?
export function isFunction(x) {
  return 'function' === typeof x;
}

// Loop over each item in an array-like value.
export function each(arr, fn, _this) {
  let i;
  const len = (arr && arr.length) || 0;
  for (i = 0; i < len; i++) {
    fn.call(_this, arr[i], i);
  }
}

// Loop over each key/value pair in a hash.
export function eachKey(obj, fn, _this) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(_this, key, obj[key]);
    }
  }
}

// Set properties on an object.
export function set(obj, props) {
  eachKey(props, function(key, value) {
    obj[key] = value;
  });
  return obj;
}

// Set default options where some option was not specified.
export function defaults(options, _defaults) {
  options = options || {};
  eachKey(_defaults, function(key, val) {
    if (!existy(options[key])) {
      options[key] = val;
    }
  });
  return options;
}

// Convert value (e.g., a NodeList) to an array.
export function toArray(obj) {
  try {
    return Array.prototype.slice.call(obj);
  } catch (e) {
    const ret = [];
    each(obj, function(val) {
      ret.push(val);
    });
    return ret;
  }
}

export function last(array) {
  return array[array.length - 1];
}

// Test if token is a script tag.
export function isScript(tok) {
  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('script');
}

export function isStyle(tok) {
  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('style');
}
