import _ from 'lodash';
import Q from 'q';

import postscribe from '../../src/postscribe';

import {iframe} from './utils';
import {Html, Js, Uri} from './write-thunks';
import {nativeToPostscribe, postscribeToNative} from './write-transforms';

const $ = require('jquery');

export default class WriteComparor {
  compare(def) {
    if (!_.isArray(def)) {
      def = [def];
    }
    return Q.all([this.docWriteResults(...def), this.postscribeResults(...def)]).then(results => {
      const [d, p] = results;
      const td = this.transform(d, nativeToPostscribe);
      const tp = this.transform(p, postscribeToNative);

      if (tp !== td) {
        console.groupCollapsed(def);
        console.error(tp, '\n\n\n', td);
        console.trace();
        console.groupEnd();
      } else {
        console.debug('Contents equal', tp, td);
      }

      return tp === td;
    });
  }

  docWriteResults(...def) {
    return iframe().then(doc => {
      doc.open();
      _.forEach(def, d => {
        if (d instanceof Html) {
          doc[d.writeln ? 'writeln' : 'write'](d.value);
        } else if (d instanceof Uri) {
          doc.write(`<script src="${d.value}"></script>`);
        } else if (d instanceof Js) {
          doc.write(`<script>${d.value}</script>`);
        }
      });
      doc.close();
      return doc.body.innerHTML;
    });
  }

  postscribeResults(...def) {
    const el = $('<div id="postscribe-write-target" />').get(0);
    $(document.body).append(el);
    return Q.all(_.map(def, (d) => {
      const dfd = Q.defer();
      const opts = {
        done: () => {
          dfd.resolve();
        }
      };
      if (d instanceof Html) {
        postscribe(el, d.value, opts);
      } else if (d instanceof Uri) {
        postscribe(el, `<script src="${d.value}"></script>`, opts);
      } else if (d instanceof Js) {
        postscribe(el, `<script>${d.value}</script>`, opts);
      }
      return dfd.promise;
    })).then(() => el.innerHTML);
  }

  transform(result, fns) {
    return _.reduce(fns, (acc, f) => f(acc), result)
  }
}
