import _ from 'lodash';

/**
 * Definitions to swap on the native result. Key is the new string and Value is the pattern to replace
 *
 * @type {Object.<string, RegExp>}
 */
export const nativeToPostscribe = [_.trim];

/**
 * Definitions to replace on the postscribe result. Key is the new string and Value is the pattern to replace.
 *
 * @type {Object.<string|RegExp, string>}
 */
export const postscribeToNative = [_.trim];
