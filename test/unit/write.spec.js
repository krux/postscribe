import _ from 'lodash';
import descriptions from '../fixtures/write-comparisons';
import * as wc from '../helpers/write-comparor';

describe('write', () => {
  _.forEach(descriptions, (specs, desc) => {
    describe(desc, function() {
      _.forEach(specs, (spec, name) => {
        const cb = done => {
          wc.compare(spec).then(r => {
            expect(r).to.be.ok();
          }).catch(done).finally(done);
        };

        if (name.indexOf('only:') === 0) {
          it.only(name.replace('only:', ''), cb);
        } else if (name.indexOf('skip:') === 0) {
          xit(name.replace('skip:', ''), cb);
        } else {
          it(name, cb);
        }
      });
    });
  });
});
