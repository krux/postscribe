const $ = require('jquery');

/**
 * Functions to pass the results of document.write through before comparing w/ postscribe.
 *
 * @type {Array<Function<String>>}
 */
export const nativeToPostscribe = [$.trim, s => s.replace('(\n|\r)', '')];

/**
 * Functions to pass the results of postscribe through before comparing w/ document.write.
 *
 * @type {Array<Function<String>>}
 */
export const postscribeToNative = [$.trim];
