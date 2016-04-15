import _ from 'lodash';

/**
 * Functions to pass the results of document.write through before comparing w/ postscribe.
 *
 * @type {Array<Function<String>>}
 */
export const nativeToPostscribe = [_.trim, s => s.replace('\n', '')];

/**
 * Functions to pass the results of postscribe through before comparing w/ document.write.
 *
 * @type {Array<Function<String>>}
 */
export const postscribeToNative = [_.trim];
