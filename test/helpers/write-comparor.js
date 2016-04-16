import _ from 'lodash';
import Q from 'q';
import postscribe from '../../src/postscribe';
import iframe from './iframe';
import {Html, Js, Uri} from './write-thunks';
import * as transforms from './write-transforms';

const $ = require('jquery');

export function compare(def) {
  if (!_.isArray(def)) {
    def = [def];
  }

  return Q.all([docWriteResults(...def), postscribeResults(...def)]).then(results => {
    const [d, p] = results;
    const td = transform(d, transforms.nativeToPostscribe);
    const tp = transform(p, transforms.postscribeToNative);

    if (tp !== td) {
      console.warn(`Unmatched\n\npostscribe: ${JSON.stringify(tp)}\n\ndoc.write ${JSON.stringify(td)}`);
    }
    return tp === td;
  });
}

function docWriteResults(...def) {
  return iframe().then(win => {
    const doc = win.document;
    const dfd = Q.defer();
    _.forEach(def, d => {
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

    if (doc.body) {
      dfd.resolve(removeScripts(doc.body).innerHTML);
    } else {
      win.addEventListener('load', () => {
        dfd.resolve(removeScripts(win.document.body).innerHTML);
      });
    }

    doc.close();
    return dfd.promise;
  });
}

function postscribeResults(...def) {
  const HELPER_CLASS_NAME = 'ps-writer';
  const el = $('<div id="postscribe-write-target" />').get(0);

  $(document.body).append(el);

  return Q.all(_.map(def, (d) => {
    const dfd = Q.defer();
    const opts = {
      error(err) {
        console.error(err.msg);
      },

      done() {
        removeScripts(el);
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

    return dfd.promise;
  })).then(() => el.innerHTML);
}

function transform(result, fns) {
  return _.reduce(fns, (acc, f) => f(acc), result);
}

function removeScripts(node) {
  _.forEach(_.toArray(node.getElementsByTagName('script')), n => n.parentNode.removeChild(n));
  return node;
}
