const UNDEFINED = void 0;

/**
 * Determine if the thing is not undefined and not null.
 *
 * @param {*} thing The thing to test
 * @returns {boolean} True if the thing is not undefined and not null.
 */
export function existy(thing) {
  return thing !== UNDEFINED && thing !== null;
}

/**
 * Is this a function?
 *
 * @param {*} x The variable to test
 * @returns {boolean} True if the variable is a function
 */
export function isFunction(x) {
  return 'function' === typeof x;
}

/**
 * Loop over each item in an array-like value.
 *
 * @param {Array<*>} arr The array to loop over
 * @param {Function} fn The function to call
 * @param {?Object} _this The object to bind to the function
 */
export function each(arr, fn, _this) {
  let i;
  const len = (arr && arr.length) || 0;
  for (i = 0; i < len; i++) {
    fn.call(_this, arr[i], i);
  }
}

/**
 * Loop over each key/value pair in a hash.
 *
 * @param {Object} obj The object
 * @param {Function} fn The function to call
 * @param {?Object} _this The object to bind to the function
 */
export function eachKey(obj, fn, _this) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(_this, key, obj[key]);
    }
  }
}

/**
 * Set default options where some option was not specified.
 *
 * @param {Object} options The destination
 * @param {Object} _defaults The defaults
 * @returns {Object}
 */
export function defaults(options, _defaults) {
  options = options || {};
  eachKey(_defaults, function(key, val) {
    if (!existy(options[key])) {
      options[key] = val;
    }
  });
  return options;
}

/**
 * Convert value (e.g., a NodeList) to an array.
 *
 * @param {Object} obj The object
 * @returns {Array<*>}
 */
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

/**
 * Get the last item in an array
 *
 * @param {Array<*>} array The array
 * @returns {*} The last item in the array
 */
export function last(array) {
  return array[array.length - 1];
}

/**
 * Test if token is a script tag.
 *
 * @param {Object} tok The token
 * @returns {boolean} True if the token is a script tag
 */
export function isScript(tok) {
  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('script');
}

/**
 * Test if token is a style tag.
 *
 * @param {Object} tok The token
 * @returns {boolean} True if the token is a style tag
 */
export function isStyle(tok) {
  return !tok || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf('style');
}
