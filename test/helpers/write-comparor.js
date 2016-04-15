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
      console.debug(JSON.stringify(td), JSON.stringify(tp));
    }
    return tp === td;
  });
}

export function docWriteResults(...def) {
  return iframe().then(doc => {
    doc.open();

    _.forEach(def, d => {
      if (d instanceof Uri) {
        doc.write(`<script src="${d.value}"></script>`);
      } else if (d instanceof Js) {
        doc.write(`<script>${d.value}</script>`);
      } else if (d instanceof Html) {
        doc[d.writeln ? 'writeln' : 'write'](...d.value);
      } else {
        doc.write(d);
      }
    });

    doc.close();
    if (doc === null) {
      console.error(`doc is null on ${JSON.stringify(def)}`);
    }
    if (doc.body === null) {
      console.error(`doc.body is null on ${JSON.stringify(def)}`);
    }
    if (doc.body.innerHTML === null) {
      console.error(`doc.body.innerHTML is null on ${JSON.stringify(def)}`);
    }

    return doc.body.innerHTML;
  });
}

export function postscribeResults(...def) {
  const HELPER_CLASS_NAME = 'ps-writer';
  const el = $('<div id="postscribe-write-target" />').get(0);

  $(document.body).append(el);

  return Q.all(_.map(def, (d) => {
    const dfd = Q.defer();
    const opts = {
      done() {
        dfd.resolve();
      }
    };

    if (d instanceof Uri) {
      postscribe(el, `<script src="${d.value}"></script>`, opts);
    } else if (d instanceof Js) {
      postscribe(el, `<script>${d.value}</script>`, opts);
    } else if (d instanceof Html) {
      const tmpls = templatize(d.value).join(', ');
      console.debug(`<script class="${HELPER_CLASS_NAME}">console.trace();document.write(${tmpls});<\/script>`);
      postscribe(el, `<script class="${HELPER_CLASS_NAME}">console.trace();document.write(${tmpls});<\/script>`, opts);
    } else {
      const tmpls = templatize([d]);
      console.debug(`<script class="${HELPER_CLASS_NAME}">console.trace();document.write(${tmpls});<\/script>`);
      postscribe(el, `<script class="${HELPER_CLASS_NAME}">console.trace();document.write(${tmpls});<\/script>`, opts);
    }

    return dfd.promise;
  })).then(() => {
    $(`.${HELPER_CLASS_NAME}`, el).remove();
    return el.innerHTML;
  });
}

export function transform(result, fns) {
  return _.reduce(fns, (acc, f) => f(acc), result);
}

export function templatize(vals) {
  return _.map(vals, (v) => {
    const vv = v.replace('</script>', '<\\/script>');

    // Wrap in a function that self removes to avoid quirky encoding in the template string.
    return `String(function(){/*!${vv}!*/}).replace(/^[^!]+!/, '').replace(/![^!]+$/, '')`;
  });
}
