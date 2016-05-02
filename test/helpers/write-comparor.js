import postscribe from '../../src/postscribe';
import iframe from './iframe';
import {Html, Js, Uri} from './write-thunks';
import * as transforms from './write-transforms';

const $ = require('jquery');

export function compare(def) {
  if (!$.isArray(def)) {
    def = [def];
  }

  return $.when(docWriteResults(...def), postscribeResults(...def)).then((d, p) => {
    const td = transform(d, transforms.nativeToPostscribe);
    const tp = transform(p, transforms.postscribeToNative);

    if (tp !== td) {
      console.warn(`Unmatched\n\npostscribe: ${JSON.stringify(tp)}\n\ndoc.write ${JSON.stringify(td)}`);
      try {console['trace']();} catch(e) {}
    }
    return tp === td;
  });
}

/**
 * Writes compared HTML to an iframe using document.write and provides the results.
 *
 * @param def Test definitions to write
 * @returns {Promise<string>} Promise to the innerHTML written by document.write w/ scripts and styles removed.
 */
function docWriteResults(...def) {
  const DONE_ID = 'done-marker';
  const win = iframe();
  const doc = win.document;
  const dfd = $.Deferred();

  doc.write('<body>');
  $.map(def, d => {
    if (d instanceof Uri) {
      doc.write(`<script src="${d.value}"><\/script>`);
    } else if (d instanceof Js) {
      doc.write(`<script>${d.value}<\/script>`);
    } else if (d instanceof Html) {
      doc[d.writeln ? 'writeln' : 'write'](...d.value);
    } else {
      doc.write(d);
    }
  });
  doc.write(`<script src="remote/write-done-marker.js"></script>`);


  const handle = setInterval(() => {
    const marker = doc.getElementById(DONE_ID);
    if (marker) {
      clearInterval(handle);
      marker.parentNode.removeChild(marker);
      dfd.resolve(removeHiddenElements(doc.body).innerHTML);
    }
  }, 1);
  doc.write('</body>');
  doc.close();
  return dfd.promise();
}

function postscribeResults(...def) {
  const HELPER_CLASS_NAME = 'ps-writer';
  const el = $('<div id="postscribe-write-target" />').get(0);

  $(document.body).append(el);

  return $.when(...$.map(def, (d) => {
    const dfd = $.Deferred();
    const opts = {
      error(err) {
        console.error(JSON.stringify(err));
      },

      done() {
        removeHiddenElements(el);
        dfd.resolve();
      }
    };

    if (d instanceof Uri) {
      postscribe(el, `<script src="${d.value}"></script>`, opts);
    } else if (d instanceof Js) {
      postscribe(el, `<script>${d.value}</script>`, opts);
    } else if (d instanceof Html) {
      postscribe(el, `<script class="${HELPER_CLASS_NAME}">document.write(${d.toArgs()});<\/script>`, opts);
    } else {
      postscribe(el, d, opts);
    }

    return dfd.promise();
  })).then(() => el.innerHTML);
}

function transform(result, fns) {
  let transformed = result;
  $.map(fns, f => {
    transformed = f(transformed)
  });

  return transformed;
}

function removeHiddenElements(node) {
  $('script', node).remove();
  $('style', node).remove();
  return node;
}
